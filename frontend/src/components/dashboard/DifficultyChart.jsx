import { Layers } from "lucide-react";

function DifficultyChart({ solved }) {
  const rows = [
    { label: "Easy", count: solved.easy, barClass: "bg-secondary" },
    { label: "Medium", count: solved.medium, barClass: "bg-primary" },
    { label: "Hard", count: solved.hard, barClass: "bg-coral" },
  ];

  const total = solved.total || 0;

  return (
    <div className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-secondary">
            SKILL STACK
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold">
            Difficulty mix
          </h2>
        </div>
        <Layers size={22} className="text-primary" />
      </div>

      <div className="mt-8 space-y-6">
        {rows.map(({ label, count, barClass }) => {
          const percent = total ? Math.round((count / total) * 100) : 0;

          return (
            <div key={label}>
              <div className="flex items-center justify-between">
                <span className="font-medium">{label}</span>
                <span className="text-muted">
                  {count} · {percent}%
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/5">
                <div
                  className={`h-2 rounded-full ${barClass}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DifficultyChart;