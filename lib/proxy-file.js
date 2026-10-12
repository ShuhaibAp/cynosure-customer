import "server-only";
import { apiFetch } from "@/lib/api";
import { getUser } from "@/lib/dal";
import { getSessionToken } from "@/lib/session";

/**
 * Streams a document from the backend to the browser. The session cookie is httpOnly, so the
 * browser can't fetch it directly and it has to pass through here.
 */
export async function proxyBackendFile(path) {
  const user = await getUser();
  if (!user) return new Response(null, { status: 401 });

  const res = await apiFetch(path, { token: await getSessionToken() });
  if (!res.ok) return new Response(null, { status: [401, 403, 404].includes(res.status) ? res.status : 502 });

  return new Response(res.body, {
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/octet-stream",
      "Content-Disposition": res.headers.get("content-disposition") ?? "inline",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
