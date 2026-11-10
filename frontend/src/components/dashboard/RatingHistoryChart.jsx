import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatContestDate(unixSeconds) {
  return new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });
}

function RatingHistoryChart({ history, currentRating }) {
  const data = history.map((h) => ({
    label: formatContestDate(h.startTime),
    title: h.title,
    rating: h.rating,
  }));

  return (
    <div className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            RATING ARC
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold">
            Contest rating history
          </h2>
        </div>
        {currentRating != null && (
          <span className="rounded-full bg-secondary/20 px-3 py-1 font-semibold text-secondary">
            {currentRating.toLocaleString()}
          </span>
        )}
      </div>

      {data.length === 0 ? (
        <p className="mt-8 text-muted">No contest history yet.</p>
      ) : (
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "var(--muted)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, "auto"]}
                tick={{ fill: "var(--muted)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  background: "var(--surface-light)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  color: "var(--text)",
                }}
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload?.title ?? label
                }
              />
              <Bar
                dataKey="rating"
                fill="var(--secondary)"
                radius={[6, 6, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default RatingHistoryChart;