import "server-only";
import { cookies } from "next/headers";
import { getTokenExpiry } from "@/lib/jwt";

export const SESSION_COOKIE = "cyn_customer_session";

export async function createSession(token) {
  const expires = getTokenExpiry(token);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...(expires ? { expires: new Date(expires) } : {}),
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}
