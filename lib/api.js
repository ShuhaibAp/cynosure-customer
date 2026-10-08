import "server-only";

export const API_URL = process.env.API_URL ?? "http://localhost:4100";

export async function apiFetch(path, { token, ...init } = {}) {
  const isForm = typeof FormData !== "undefined" && init.body instanceof FormData;
  return fetch(`${API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      // For FormData the runtime must set the multipart boundary itself.
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
}
