import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import { isTokenExpired } from "@/lib/jwt";

// Returns the verified customer, or null. Never redirects, so public pages can use it.
export const getUser = cache(async () => {
  const token = await getSessionToken();
  if (!token || isTokenExpired(token)) return null;

  try {
    const res = await apiFetch("/auth/me", { token });
    if (!res.ok) return null;
    const user = await res.json();
    if (user.role !== "Customer") return null;
    return { id: user.userId, name: user.name, email: user.email };
  } catch {
    return null;
  }
});

// For protected pages/actions: redirects to /login when there is no valid session.
export async function verifySession() {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}
