import { Sparkles } from "lucide-react";

function buildSignal(user) {
  const streak = user.streak ?? 0;

  if (streak >= 7) {
    return {
      title: "You are in a flow state.",
      text: `You have been active ${streak} days in a row. Keep the streak going.`,
    };
  }
  if (streak >= 1) {
    return {
      title: "Momentum is building.",
      text: `${streak}-day streak so far. Show up again tomorrow to extend it.`,
    };
  }
  return {
    title: "Time to restart.",
    text: "No active streak right now. One problem today starts a new one.",
  };
}

function TodaySignal({ user }) {
  const { title, text } = buildSignal(user);

  const recent = (user.weeklyActivity || [])
    .slice(-4)
    .reduce((sum, w) => sum + w.submissions, 0);

  return (
    <div className="flex h-full flex-col rounded-3xl bg-primary p-6 text-background">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold tracking-[0.2em]">
          TODAY'S SIGNAL
        </p>
        <Sparkles size={26} />
      </div>

      <h2 className="mt-4 font-display text-2xl font-bold">{title}</h2>
      <p className="mt-3 flex-1">{text}</p>

      <div className="mt-6 flex items-center gap-3">
        <span className="rounded-full bg-background px-4 py-2 text-sm font-semibold text-text">
          {recent} submissions
        </span>
        <span className="text-sm font-medium">Last 4 weeks</span>
      </div>
    </div>
  );
}

export default TodaySignal;