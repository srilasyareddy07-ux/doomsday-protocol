import { NextRequest, NextResponse } from "next/server";
import { getVisitorId } from "@/lib/visitor";
import { kvGet, kvSet } from "@/lib/kv";

export async function GET() {
  const visitorId = getVisitorId();
  const checked = (await kvGet<string[]>(`checklist:${visitorId}`)) ?? [];
  return NextResponse.json({ checked });
}

export async function POST(req: NextRequest) {
  const visitorId = getVisitorId();
  const body = await req.json();

  if (!Array.isArray(body?.checked)) {
    return NextResponse.json({ error: "checked must be an array of ids" }, { status: 400 });
  }

  await kvSet(`checklist:${visitorId}`, body.checked);
  return NextResponse.json({ ok: true });
}
