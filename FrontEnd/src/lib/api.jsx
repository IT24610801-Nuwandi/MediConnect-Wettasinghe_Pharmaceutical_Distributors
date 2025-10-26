// src/lib/api.jsx
const BASE_URL = "http://localhost:8083";

export async function postJSON(path, payload) {
  const res = await fetch(BASE_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.text()) || "Request failed");
  return res.json().catch(() => ({}));
}

export async function getJSON(path) {
  const res = await fetch(BASE_URL + path, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error((await res.text()) || "Request failed");
  return res.json().catch(() => ({}));
}

// Add more API functions as needed
export async function postForm(path, formData) {
  const res = await fetch(BASE_URL + path, { method: "POST", body: formData });
  if (!res.ok) throw new Error((await res.text()) || "Upload failed");
  return res.json().catch(() => ({}));
}

// --- add below BASE_URL + existing exports ---
export function getToken() {
  return localStorage.getItem("auth_token") || "";
}

export function isAuthed() {
  return !!getToken();
}

export function authHeaders(extra = {}) {
  const t = getToken();
  return {
    "Content-Type": "application/json",
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
    ...extra,
  };
}

export async function authGet(path) {
  const res = await fetch(BASE_URL + path, { headers: authHeaders() });
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export async function authPut(path, payload) {
  const res = await fetch(BASE_URL + path, { method: "PUT", headers: authHeaders(), body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_role");
}
