const BACKEND = "https://leetcode-explorer-backend.onrender.com";

const SKIP_REQ = new Set([
  "connection", "keep-alive", "transfer-encoding", "upgrade",
  "host", "content-length", "accept-encoding",
]);

export default async function handler(req, res) {
  try {
    const method = req.method || "GET";
    const target = BACKEND + req.url;

    const headers = {};
    for (const [k, v] of Object.entries(req.headers)) {
      if (v == null || SKIP_REQ.has(k.toLowerCase())) continue;
      headers[k] = Array.isArray(v) ? v.join(", ") : v;
    }

    let body;
    if (method !== "GET" && method !== "HEAD" && req.body != null) {
      body = typeof req.body === "string" || Buffer.isBuffer(req.body)
        ? req.body
        : JSON.stringify(req.body);
    }

    const upstream = await fetch(target, { method, headers, body, redirect: "manual" });

    res.status(upstream.status);
    const setCookies = upstream.headers.getSetCookie?.() ?? [];
    if (setCookies.length) res.setHeader("Set-Cookie", setCookies);
    upstream.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      if (["set-cookie", "transfer-encoding", "connection", "content-encoding", "content-length"].includes(k)) return;
      res.setHeader(key, value);
    });

    res.send(Buffer.from(await upstream.arrayBuffer()));
  } catch {
    res.status(502).json({ error: "Proxy could not reach the backend." });
  }
}
