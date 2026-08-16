import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const VISITOR_COOKIE = "doom_visitor_id";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const existing = req.cookies.get(VISITOR_COOKIE)?.value;

  if (!existing) {
    const id = uuidv4();
    res.cookies.set(VISITOR_COOKIE, id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 5, // 5 years — this visitor id is permanent
    });
  }

  return res;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
