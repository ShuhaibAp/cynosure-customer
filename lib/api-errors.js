import "server-only";
import { redirect } from "next/navigation";

export const UNREACHABLE = { message: "Cannot reach the server. Please try again shortly." };

/** Turns a failed backend response into a plain object the UI can render. Sends expired sessions to /login. */
export async function readFailure(res) {
  if (res.status === 401) redirect("/login");
  if (res.status === 403) return { message: "You don't have permission to do that." };
  const data = await res.json().catch(() => null);
  if (data?.errors) return { message: Object.values(data.errors)[0], errors: data.errors };
  const message = Array.isArray(data?.message) ? data.message.join(" ") : data?.message;
  return { message: message || "Something went wrong. Please try again." };
}
