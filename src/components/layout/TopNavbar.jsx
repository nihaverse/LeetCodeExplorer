import {
  Bell,
  TerminalSquare,
  CircleUserRound,
} from "lucide-react";

const tabs = [
  "DASHBOARD",
  "COMPARE",
];

function TopNavbar() {
  return (
    <header className="fixed top-0 left-72 right-0 z-40 h-20 backdrop-blur-xl bg-[rgba(13,13,13,0.85)] border-b border-white/10">
      <div className="h-full flex items-center justify-between px-8">
        {/* Left */}
        <div className="flex items-center gap-10">
          <div>
            <h2 className="font-mono text-lg tracking-[0.25em] text-[#4BDCC6]">
              LeetCode Analytics
            </h2>
            <p className="text-xs text-gray-500">
              Track • Compare • Improve
            </p>
          </div>
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                className="text-sm tracking-widest text-gray-400 hover:text-[#FFA116] transition"
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        {/* Right */}
        <div className="flex items-center gap-5">
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
            <Bell size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
            <TerminalSquare size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#FFA116] text-black flex items-center justify-center">
            <CircleUserRound size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;