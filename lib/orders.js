import "server-only";
import { notFound, redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getSessionToken } from "@/lib/session";

async function get(path) {
  const token = await getSessionToken();
  const res = await apiFetch(path, { token });
  if (res.status === 401) redirect("/login");
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

/** `{ stages, items: [{ id, poNumber, serviceType, status, createdAt, updatedAt }] }` */
export const listOrders = () => get("/customer/orders");

export const getOrder = (id) => get(`/customer/orders/${encodeURIComponent(id)}`);

/** The customer's order requests, newest first. */
export const listRequests = () => get("/customer/order-requests");
