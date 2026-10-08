// Reads the `exp` claim without verifying the signature. Only for optimistic
// checks (cookie lifetime, proxy redirects) — the backend is the source of truth.
export function getTokenExpiry(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(payload));
    return typeof json.exp === "number" ? json.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const exp = getTokenExpiry(token);
  return exp === null || exp <= Date.now();
}
