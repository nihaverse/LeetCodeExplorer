import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
const data = [
  {
    difficulty: "Easy",
    solved: 185,
    color: "var(--success)",
  },
  {
    difficulty: "Medium",
    solved: 170,
    color: "var(--warning)",
  },
  {
    difficulty: "Hard",
    solved: 72,
    color: "var(--danger)",
  },
];
function DifficultyChart() {
  return (
    <div className="mt-8 rounded-2xl bg-[(--surface)] border border-[(--border)] p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">
        Difficulty Distribution
      </h2>
      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="solved"
              nameKey="difficulty"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.difficulty}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default DifficultyChart;