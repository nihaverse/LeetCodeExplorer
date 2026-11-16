const BACKEND = "https://leetcode-explorer-backend.onrender.com";

// Experiment: forwards GET requests only. req.url keeps the trailing slash Django needs.
export default async function handler(req, res) {
  try {
    const upstream = await fetch(BACKEND + req.url, {
      headers: { accept: "application/json" },
      redirect: "manual",
    });

    const body = await upstream.text();
    res.status(upstream.status);
    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") || "application/json"
    );
    res.send(body);
  } catch {
    res.status(502).json({ error: "Proxy could not reach the backend." });
  }
}
