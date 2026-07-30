function ComparisonSection() {
  const users = [
    {
      username: "niharika",
      solved: 427,
      rating: 1682,
      acceptance: "82%",
    },
    {
      username: "john_doe",
      solved: 512,
      rating: 1814,
      acceptance: "85%",
    },
  ];

  return (
    <div className="mt-8 rounded-2xl bg-[(--surface)] border border-[(--border)] p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Compare Users
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[(--border)]">
              <th className="py-3">Username</th>
              <th className="py-3">Solved</th>
              <th className="py-3">Contest Rating</th>
              <th className="py-3">Acceptance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.username}
                className="border-b border-[(--border)] hover:bg-white/5 transition"
              >
                <td className="py-4 font-medium">
                  {user.username}
                </td>
                <td>{user.solved}</td>
                <td>{user.rating}</td>
                <td>{user.acceptance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComparisonSection;