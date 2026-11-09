import {
  LayoutDashboard,
  Code2,
  Trophy,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: false,
  },
  {
    title: "Problems",
    icon: Code2,
    active: true,
  },
  {
    title: "Contests",
    icon: Trophy,
    active: false,
  },
  {
    title: "Ranking",
    icon: BarChart3,
    active: false,
  },
  {
    title: "Settings",
    icon: Settings,
    active: false,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-[(--surface)] backdrop-blur-xl shadow-2xl flex flex-col">

      <div className="px-6 py-8">

        <h1 className="font-mono text-xl tracking-[0.25em] text-[(--primary)] font-bold">
          LC Explorer
        </h1>
        <p className="text-xs text-[(--muted)] mt-1">
          Elite Tier
        </p>

      </div>

      <nav className="flex-1 px-3 space-y-2">

              {menu.map((item) => {
                  const Icon = item.icon;
                  return (
                      <button
                          key={item.title}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${
                item.active
                  ? "bg-orange-500/10 border-r-4 border-orange-500 text-orange-400 font-semibold"
                  : "text-gray-400 hover:bg-white/5 hover:text-orange-400"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </button>
          );
        })}
          </nav>
          <div className="border-t border-white/10 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-black">
            N
          </div>
          <div>
            <p className="font-semibold">
              Niharika
            </p>
            <p className="text-xs text-gray-500">
              Frontend Developer
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;