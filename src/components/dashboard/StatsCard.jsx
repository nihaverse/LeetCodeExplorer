function StatCard({ title, value, color }) {
  return (
    <div className="bg-[#19120A] border border-white/10 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition duration-300">
      <p className="text-sm text-gray-400">
        {title}
      </p>
      <h2
        className="text-4xl font-bold mt-4"
        style={{ color }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatCard;