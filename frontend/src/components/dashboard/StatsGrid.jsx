import { CheckCircle2, Activity, Flame, Target } from "lucide-react";
import StatCard from "./StatsCard";

function StatsGrid({ user }) {
  const { solved, contest, streak, acceptanceRate } = user;

  const stats = [
    {
      title: "Problems solved",
      value: solved.total,
      note: `${solved.easy} easy · ${solved.medium} medium · ${solved.hard} hard`,
      icon: CheckCircle2,
      iconClass: "bg-primary/15 text-primary",
    },
    {
      title: "Contest rating",
      value: contest ? contest.rating.toLocaleString() : "—",
      note: contest
        ? `Over ${contest.attendedCount} contests`
        : "No contests yet",
      icon: Activity,
      iconClass: "bg-secondary/15 text-secondary",
    },
    {
      title: "Current streak",
      value: streak ?? "—",
      unit: streak != null ? "days" : undefined,
      note: "Show up, solve, repeat.",
      icon: Flame,
      iconClass: "bg-gold/15 text-gold",
    },
    {
      title: "Acceptance rate",
      value: acceptanceRate != null ? `${acceptanceRate}%` : "—",
      note: "Accepted ÷ all submissions",
      icon: Target,
      iconClass: "bg-coral/15 text-coral",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
}

export default StatsGrid;