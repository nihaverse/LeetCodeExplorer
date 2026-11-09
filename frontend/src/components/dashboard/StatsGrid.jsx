import StatCard from "./StatsCard";

function StatsGrid() {
  const stats = [
    {
      title: "Total Solved",
      value: 427,
      color: "#FFA116",
    },
    {
      title: "Easy",
      value: 185,
      color: "#00C853",
    },
    {
      title: "Medium",
      value: 170,
      color: "#FFD54F",
    },
    {
      title: "Hard",
      value: 72,
      color: "#FF5252",
      },
     {
      title: "Acceptance Rate",
      value: "98.4%",
      color: "blue",
      }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {stats.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          color={item.color}
        />
      ))}
    </div>
  );
}

export default StatsGrid;