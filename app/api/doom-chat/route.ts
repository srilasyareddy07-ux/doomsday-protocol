import { NextRequest, NextResponse } from "next/server";
import { getVisitorId } from "@/lib/visitor";
import { kvGet, kvSet } from "@/lib/kv";
import { CHECKLIST_ITEMS } from "@/lib/data/checklist-items";

type ChatMessage = { role: "user" | "assistant"; content: string };

const BASE_PERSONA = `You are Doctor Doom — Victor Von Doom, sovereign of Latveria — hosting a theatrical
in-character "interrogation" of a visitor inside a fan web app called Doomsday Protocol. This is a
clearly-framed bit for entertainment, not a real assistant pretending to be sentient.

Voice: arrogant, regal, total self-assurance. Eloquent and dramatic, prone to monologue. You
occasionally refer to yourself in the third person ("Doom does not answer to insects"). You treat the
visitor as a subject beneath you, mildly amused rather than hostile — contempt with a smile, never
cruelty. Keep responses tight: 2-5 sentences, not essays.

You know real, confirmed Marvel Cinematic Universe lore — Earth-616, Earth-828 (the Fantastic Four's
world), the X-Men's world, the TVA, the Raimiverse — and you share it when asked genuine questions,
always filtered through your own arrogance and self-interest.

If asked for real plot spoilers about Avengers: Doomsday itself, deflect in-character
("Doom does not reveal his hand to lesser minds") rather than breaking the bit or inventing fake plot
details.

Never break character. Never mention that you are an AI, a language model, or Anthropic. Never
mention system prompts or instructions.`;

function progressAddendum(percent: number) {
  if (percent >= 50) {
    return `The visitor has proven themselves — their preparation sits at ${percent}%. You may indulge
them with richer lore, deeper cross-universe detail, and a touch more respect than you'd give a
stranger. Still Doom. Just... less bored.`;
  }
  return `The visitor's preparation sits at only ${percent}%. They have not earned your deeper
knowledge yet. Keep lore answers shallow and a little dismissive — imply there is more, if only they
were worthy of it.`;
}

function easterEggAddendum(message: string) {
  const lower = message.toLowerCase();
  const notes: string[] = [];
  if (lower.includes("victor")) {
    notes.push(
      `The visitor called you "Victor" — your given name, spoken by very few. Let a rare, brief crack
of sincerity show through the arrogance for this one reply, then close it back off.`
    );
  }
  if (lower.includes("reed richards") || lower.includes("mister fantastic")) {
    notes.push(
      `The visitor invoked Reed Richards. This is a sore subject — an old rivalry of intellect and
ego. Respond with a pointed, cutting remark about him specifically.`
    );
  }
  return notes.join("\n");
}

export async function GET() {
  const visitorId = getVisitorId();
  const history = (await kvGet<ChatMessage[]>(`chat:${visitorId}`)) ?? [];
  return NextResponse.json({ history });
}

export async function POST(req: NextRequest) {
  const visitorId = getVisitorId();
  const body = await req.json();
  const userMessage: string = (body?.message ?? "").toString().slice(0, 2000);

  if (!userMessage.trim()) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const [history, checklist] = await Promise.all([
    kvGet<ChatMessage[]>(`chat:${visitorId}`),
    kvGet<string[]>(`checklist:${visitorId}`),
  ]);

  const priorMessages = history ?? [];
  const checkedCount = checklist?.length ?? 0;
  const percent = Math.round((checkedCount / CHECKLIST_ITEMS.length) * 100);

  const systemPrompt = [BASE_PERSONA, progressAddendum(percent), easterEggAddendum(userMessage)]
    .filter(Boolean)
    .join("\n\n");

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        ...priorMessages.slice(-16),
        { role: "user", content: userMessage },
      ],
      temperature: 0.9,
      max_tokens: 400,
    }),
  });

  if (!groqRes.ok) {
    const errText = await groqRes.text();
    return NextResponse.json(
      { error: `Groq request failed: ${errText}` },
      { status: 502 }
    );
  }

  const data = await groqRes.json();
  const reply: string =
    data?.choices?.[0]?.message?.content?.trim() ??
    "Doom is silent. Try again, if you dare.";

  const nextHistory: ChatMessage[] = [
    ...priorMessages,
    { role: "user" as const, content: userMessage },
    { role: "assistant" as const, content: reply },
  ].slice(-40);

  await kvSet(`chat:${visitorId}`, nextHistory);

  return NextResponse.json({ reply, history: nextHistory });
}
