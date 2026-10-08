"use server";

import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { readFailure, UNREACHABLE } from "@/lib/api-errors";
import { createSession, deleteSession } from "@/lib/session";

export async function login(_prevState, formData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password.", email };

  let data;
  try {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role: "Customer" }),
    });
    if (res.status === 401) return { error: "Incorrect email or password.", email };
    if (res.status === 403) return { error: "This account doesn't have access to the customer portal.", email };
    if (res.status === 400) return { error: "Enter a valid email address and password.", email };
    if (!res.ok) return { error: "Something went wrong. Please try again.", email };
    data = await res.json();
  } catch {
    return { error: UNREACHABLE.message, email };
  }

  await createSession(data.accessToken);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

/** Always reports success so the form can't be used to find out which emails have accounts. */
export async function forgotPassword(_prevState, formData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Enter your email address.", email };
  try {
    const res = await apiFetch("/customer-auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    if (res.status === 400) return { error: "Enter a valid email address.", email };
    if (!res.ok) return { error: "Something went wrong. Please try again.", email };
  } catch {
    return { error: UNREACHABLE.message, email };
  }
  return { sent: true, email };
}

export async function setPassword(token, _prevState, formData) {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "The two passwords don't match." };

  let email;
  try {
    const res = await apiFetch("/customer-auth/set-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
    if (!res.ok) return { error: (await readFailure(res)).message };
    email = (await res.json()).email;
  } catch {
    return { error: UNREACHABLE.message };
  }
  redirect(`/login?ready=1&email=${encodeURIComponent(email)}`);
}
