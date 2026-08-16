import { NextRequest, NextResponse } from "next/server";
import { getVisitorId } from "@/lib/visitor";
import { kvGet, kvSet, kvIncrBy, kvGetNumber } from "@/lib/kv";
import { CHARACTERS } from "@/lib/data/characters";

type Pick = "dies" | "survives";
type PickMap = Record<string, Pick>;

async function getVotesFor(characterId: string) {
  const [dies, survives] = await Promise.all([
    kvGetNumber(`deathpool:votes:${characterId}:dies`),
    kvGetNumber(`deathpool:votes:${characterId}:survives`),
  ]);
  return { dies, survives };
}

export async function GET() {
  const visitorId = getVisitorId();
  const picks = (await kvGet<PickMap>(`deathpool:picks:${visitorId}`)) ?? {};

  const votes: Record<string, { dies: number; survives: number }> = {};
  await Promise.all(
    CHARACTERS.map(async (c) => {
      votes[c.id] = await getVotesFor(c.id);
    })
  );

  return NextResponse.json({ picks, votes });
}

export async function POST(req: NextRequest) {
  const visitorId = getVisitorId();
  const body = await req.json();
  const newPicks: PickMap = body?.picks ?? {};

  const validIds = new Set(CHARACTERS.map((c) => c.id));
  for (const [id, pick] of Object.entries(newPicks)) {
    if (!validIds.has(id) || (pick !== "dies" && pick !== "survives")) {
      return NextResponse.json({ error: `invalid pick for ${id}` }, { status: 400 });
    }
  }

  const previousPicks = (await kvGet<PickMap>(`deathpool:picks:${visitorId}`)) ?? {};

  // Reconcile shared vote counts: only touch characters whose pick actually changed.
  const changes: Promise<unknown>[] = [];
  for (const [characterId, pick] of Object.entries(newPicks)) {
    const prev = previousPicks[characterId];
    if (prev === pick) continue;

    if (prev) {
      changes.push(kvIncrBy(`deathpool:votes:${characterId}:${prev}`, -1));
    }
    changes.push(kvIncrBy(`deathpool:votes:${characterId}:${pick}`, 1));
  }
  await Promise.all(changes);

  await kvSet(`deathpool:picks:${visitorId}`, newPicks);

  const votes: Record<string, { dies: number; survives: number }> = {};
  await Promise.all(
    CHARACTERS.map(async (c) => {
      votes[c.id] = await getVotesFor(c.id);
    })
  );

  return NextResponse.json({ ok: true, votes });
}
