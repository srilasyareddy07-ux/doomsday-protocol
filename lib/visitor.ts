import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export const VISITOR_COOKIE = "doom_visitor_id";

/**
 * Reads the anonymous visitor id from the cookie set by middleware.
 * Middleware guarantees this cookie exists on every request that hits
 * a page or API route, so this should never actually need to mint one —
 * but we fall back to a fresh id just in case (e.g. local testing of an
 * API route in isolation).
 */
export function getVisitorId(): string {
  const store = cookies();
  const existing = store.get(VISITOR_COOKIE)?.value;
  if (existing) return existing;
  return uuidv4();
}
