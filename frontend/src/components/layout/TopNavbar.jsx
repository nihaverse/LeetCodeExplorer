import { Bell, LogOut } from "lucide-react";
import SearchBar from "../dashboard/SearchBar";
import { getCurrentUser, logout } from "../../api/authClient";

function TopNavbar({ onSearch, loading }) {
  const user = getCurrentUser();
  const initial = user?.name?.[0]?.toUpperCase() ?? "?";

  // logout() clears the session; ProtectedRoute notices and sends you to /login.
  const handleLogout = () => logout();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-20 border-b border-border bg-background/85 backdrop-blur-xl lg:left-72">
      <div className="flex h-full items-center justify-between gap-4 px-4 lg:px-8">
        <SearchBar onSearch={onSearch} loading={loading} />

        <div className="flex items-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/5 transition-colors hover:bg-white/10">
            <Bell size={18} />
          </button>

          <div
            title={user?.email}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display font-bold text-background"
          >
            {initial}
          </div>

          <button
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/5 transition-colors hover:bg-white/10 hover:text-coral"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;