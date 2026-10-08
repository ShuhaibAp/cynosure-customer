"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";
import { readFailure, UNREACHABLE } from "@/lib/api-errors";
import { verifySession } from "@/lib/dal";
import { getSessionToken } from "@/lib/session";

/** "I have an order ready for pickup" - BD is notified and takes it from there. */
export async function requestOrder(_prevState, formData) {
  await verifySession();
  const note = String(formData.get("note") ?? "").trim();
  if (note.length > 1000) return { error: "Please keep the note under 1000 characters." };

  try {
    const res = await apiFetch("/customer/order-requests", {
      method: "POST",
      token: await getSessionToken(),
      body: JSON.stringify({ note }),
    });
    if (!res.ok) return { error: (await readFailure(res)).message };
  } catch {
    return { error: UNREACHABLE.message };
  }
  revalidatePath("/");
  return { sent: true };
}
