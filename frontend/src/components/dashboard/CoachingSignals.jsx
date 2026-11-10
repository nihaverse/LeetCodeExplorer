import { ThumbsUp, Target, TrendingUp } from "lucide-react";

function pct(part, total) {
  return total ? Math.round((part / total) * 100) : 0;
}

function buildSignals(user) {
  const { solved, weeklyActivity = [] } = user;
  const total = solved.total || 0;

  // 1. Consistency
  const activeWeeks = weeklyActivity.filter((w) => w.submissions > 0).length;
  const weekCount = weeklyActivity.length;
  let consistencyTitle = "Rebuild your rhythm";
  if (activeWeeks >= 9) consistencyTitle = "Reliable consistency";
  else if (activeWeeks >= 5) consistencyTitle = "Steady rhythm";

  // 2. Core difficulty
  const levels = [
    { label: "Easy", count: solved.easy },
    { label: "Medium", count: solved.medium },
    { label: "Hard", count: solved.hard },
  ];
  const core = levels.reduce((a, b) => (b.count > a.count ? b : a));

  // 3. Hard depth
  const hardPct = pct(solved.hard, total);

  return [
    {
      icon: ThumbsUp,
      iconClass: "bg-secondary/20 text-secondary",
      title: consistencyTitle,
      note: `Active in ${activeWeeks} of the last ${weekCount} weeks.`,
    },
    {
      icon: Target,
      iconClass: "bg-primary/20 text-primary",
      title: `${core.label} is your core`,
      note: `${pct(core.count, total)}% of your solves.`,
    },
    {
      icon: TrendingUp,
      iconClass: "bg-coral/20 text-coral",
      title: hardPct < 15 ? "Build Hard depth" : "Strong Hard depth",
      note: `Hard is ${hardPct}% of your solves.`,
    },
  ];
}

function CoachingSignals({ user }) {
  const signals = buildSignals(user);

  return (
    <div className="h-full rounded-3xl border border-border bg-surface p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-primary">
        COACHING SIGNALS
      </p>

      <div className="mt-6 space-y-6">
        {signals.map(({ icon: Icon, iconClass, title, note }) => (
          <div key={title} className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
            >
              <Icon size={20} />
            </div>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-sm text-muted">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoachingSignals;