import { kv } from "@vercel/kv";

/**
 * Thin wrapper around @vercel/kv. In local dev without KV env vars set,
 * @vercel/kv throws on first use — we catch that here and fall back to an
 * in-memory Map so the app still runs before you've connected real KV.
 */

const memoryStore = new Map<string, unknown>();
const memoryVotes = new Map<string, number>();

function hasRealKv() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function kvGet<T>(key: string): Promise<T | null> {
  if (!hasRealKv()) {
    return (memoryStore.get(key) as T) ?? null;
  }
  return (await kv.get<T>(key)) ?? null;
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  if (!hasRealKv()) {
    memoryStore.set(key, value);
    return;
  }
  await kv.set(key, value);
}

export async function kvIncr(key: string): Promise<number> {
  return kvIncrBy(key, 1);
}

export async function kvIncrBy(key: string, amount: number): Promise<number> {
  if (!hasRealKv()) {
    const next = (memoryVotes.get(key) ?? 0) + amount;
    memoryVotes.set(key, next);
    return next;
  }
  return await kv.incrby(key, amount);
}

export async function kvGetNumber(key: string): Promise<number> {
  if (!hasRealKv()) {
    return memoryVotes.get(key) ?? 0;
  }
  const val = await kv.get<number>(key);
  return val ?? 0;
}
