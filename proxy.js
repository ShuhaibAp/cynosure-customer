import { NextResponse } from "next/server";
import { isTokenExpired } from "@/lib/jwt";

const SESSION_COOKIE = "cyn_customer_session";
const PUBLIC_PATHS = ["/login", "/set-password", "/forgot-password"];

// Optimistic check only: no valid-looking session cookie -> /login.
// Real verification happens in lib/dal.js against the backend.
export function proxy(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  if (!token || isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\.(?:png|svg|jpg|jpeg|ico|webp)$).*)",
  ],
};
