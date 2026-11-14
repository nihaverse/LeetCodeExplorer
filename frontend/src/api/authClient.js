// Same-origin by default: Vite proxy in dev, Vercel rewrite in production.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

/* ---------- in-memory session (never written to storage) ---------- */

let accessToken = null;
let currentUser = null;
const listeners = new Set();

export const getAccessToken = () => accessToken;
export const getCurrentUser = () => currentUser;

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener(currentUser));
}

function setSession(token, user) {
  accessToken = token;
  if (user !== undefined) currentUser = user;
  notify();
}

function clearSession() {
  accessToken = null;
  currentUser = null;
  notify();
}

/* ---------- helpers ---------- */

// Backend errors come as {error}, {detail} or {field: [messages]}
function messageFrom(data, fallback) {
  if (!data || typeof data !== "object") return fallback;
  if (typeof data.error === "string") return data.error;
  if (typeof data.detail === "string") return data.detail;
  const first = Object.values(data)[0];
  if (Array.isArray(first) && first.length) return String(first[0]);
  return fallback;
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "same-origin", // sends the httpOnly refresh cookie
    });
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // no JSON body (e.g. 204)
  }

  if (!response.ok) {
    const error = new Error(messageFrom(data, "Something went wrong."));
    error.status = response.status;
    throw error;
  }
  return data;
}

// Refresh and logout need the CSRF token because the browser attaches the cookie by itself.
async function csrfHeaders() {
  const { csrfToken } = await request("/auth/csrf/");
  return { "X-CSRFToken": csrfToken };
}

/* ---------- auth actions ---------- */

export async function signup({ name, email, password }) {
  const data = await request("/auth/signup/", {
    method: "POST",
    body: { name, email, password },
  });
  setSession(data.access, data.user);
  return data.user;
}

export async function login({ email, password }) {
  const data = await request("/auth/login/", {
    method: "POST",
    body: { email, password },
  });
  setSession(data.access, data.user);
  return data.user;
}

export async function logout() {
  try {
    await request("/auth/logout/", {
      method: "POST",
      headers: await csrfHeaders(),
    });
  } catch {
    // even if the server call fails, the user is logged out locally
  } finally {
    clearSession();
  }
}

/* ---------- refresh (rotation-safe) ---------- */

// Each refresh token works only once (rotation + blacklist). Within a tab, callers share
// one request; across tabs, a Web Lock makes refreshes run one after another, so the
// second tab sends the already-rotated cookie instead of the blacklisted one.
let refreshing = null;

async function doRefresh() {
  try {
    const data = await request("/auth/token/refresh/", {
      method: "POST",
      headers: await csrfHeaders(),
    });
    setSession(data.access);
    return true;
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      clearSession();
    }
    return false; // network problems keep the session; the next call retries
  }
}

export function refreshSession() {
  if (refreshing) return refreshing;

  const run = navigator.locks
    ? navigator.locks.request("lc-refresh", doRefresh)
    : doRefresh();

  refreshing = run.finally(() => {
    refreshing = null;
  });
  return refreshing;
}

// Called by the route guard: after a page reload memory is empty, so ask the cookie for a session.
export async function restoreSession() {
  if (accessToken && currentUser) return true;

  if (!accessToken && !(await refreshSession())) return false;

  if (!currentUser) {
    try {
      const user = await request("/auth/me/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSession(accessToken, user);
    } catch {
      return false;
    }
  }
  return true;
}

/* ---------- authenticated requests ---------- */

export async function authFetch(url, options = {}) {
  if (!accessToken) await refreshSession();

  const send = () =>
    fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

  let response = await send();

  if (response.status === 401 && (await refreshSession())) {
    response = await send();
  }
  if (response.status === 401) clearSession();

  return response;
}
