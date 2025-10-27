const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE)
    ? import.meta.env.VITE_API_BASE
    : '/api'; // uses the Vite proxy

export async function http(path, opts = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}
