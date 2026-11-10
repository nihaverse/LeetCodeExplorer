import { useState } from "react";
import { Plus } from "lucide-react";
import useLeetCodeUser from "../../hooks/useLeetCodeUser";

function diff(a, b) {
  if (a == null || b == null) return null;
  return a - b;
}

function Delta({ label, value, suffix = "" }) {
  let text = "—";
  let color = "text-muted";

  if (value != null) {
    text = `${value > 0 ? "+" : ""}${value}${suffix}`;
    if (value > 0) color = "text-secondary";
    if (value < 0) color = "text-coral";
  }

  return (
    <div className="rounded-xl border border-border px-4 py-3 text-center">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 font-semibold ${color}`}>{text}</p>
    </div>
  );
}

function ComparisonSection({ user }) {
  const [input, setInput] = useState("");
  const [peerName, setPeerName] = useState("");
  const { user: peer, loading, error } = useLeetCodeUser(peerName);

  function handleSubmit(e) {
    e.preventDefault();
    const name = input.trim();
    if (name) setPeerName(name);
  }

  const showPeer = peer && !error;

  return (
    <div className="h-full rounded-3xl border border-border bg-surface p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-primary">
        PEER CHECK
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold">
        Quick comparison
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a username..."
          className="flex-1 rounded-xl border border-border bg-surface-light px-4 py-3 outline-none placeholder:text-muted focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading}
          aria-label="Compare"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-background transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          <Plus size={20} />
        </button>
      </form>

      {loading && <p className="mt-5 text-muted">Loading...</p>}
      {error && <p className="mt-5 text-coral">{error}</p>}

      {showPeer && !loading && (
        <>
          <div className="mt-5 flex items-center gap-4 rounded-2xl bg-white/5 p-4">
            {peer.avatar && (
              <img
                src={peer.avatar}
                alt={peer.username}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold">{peer.username}</p>
              <p className="text-sm text-muted">
                Rating {peer.contest ? peer.contest.rating.toLocaleString() : "—"}
                {" · "}
                {peer.solved.total} solved
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <Delta label="Solved" value={diff(user.solved.total, peer.solved.total)} />
            <Delta
              label="Rating"
              value={diff(user.contest?.rating, peer.contest?.rating)}
            />
            <Delta
              label="Streak"
              value={diff(user.streak, peer.streak)}
              suffix="d"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ComparisonSection;