import {
  Code2,
  LayoutDashboard,
  Users,
  BarChart3,
  Bookmark,
} from "lucide-react";

const menu = [
  { title: "Profile dashboard", icon: LayoutDashboard, active: true },
  { title: "Compare users", icon: Users, active: false },
  { title: "Visual insights", icon: BarChart3, active: false },
  { title: "Saved profiles", icon: Bookmark, active: false },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-border bg-surface">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-7">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-background">
          <Code2 size={22} />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-secondary" />
        </div>
        <div>
          <h1 className="font-display text-lg font-semibold leading-tight">
            Progress Explorer
          </h1>
          <p className="text-xs text-muted">LeetCode analytics</p>
        </div>
      </div>

      {/* Navigation */}
      <p className="px-6 pb-3 pt-4 text-xs font-semibold tracking-[0.2em] text-muted">
        COMMAND CENTER
      </p>

      <nav className="space-y-2 px-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-200 ${
                item.active
                  ? "bg-primary font-semibold text-background"
                  : "text-muted hover:bg-white/5 hover:text-text"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;