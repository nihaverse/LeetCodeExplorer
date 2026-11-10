import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatWeek(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

function MomentumChart({ weeks }) {
  const data = weeks.map((w) => ({
    label: formatWeek(w.weekStart),
    submissions: w.submissions,
  }));

  return (
    <div className="h-full rounded-3xl border border-border bg-surface p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-primary">
        MOMENTUM MAP
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold">
        Weekly submissions
      </h2>
      <p className="mt-1 text-muted">Your last 12 weeks of activity.</p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20 }}>
            <defs>
              <linearGradient id="momentumFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--surface-light)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                color: "var(--text)",
              }}
              labelStyle={{ color: "var(--muted)" }}
            />
            <Area
              type="monotone"
              dataKey="submissions"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#momentumFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MomentumChart;