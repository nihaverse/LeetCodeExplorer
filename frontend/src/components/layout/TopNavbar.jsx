import { Bell, CircleUserRound } from "lucide-react";
import SearchBar from "../dashboard/SearchBar";

function TopNavbar({ onSearch, loading }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-20 border-b border-border bg-background/85 backdrop-blur-xl lg:left-72">
      <div className="flex h-full items-center justify-between gap-4 px-4 lg:px-8">
        <SearchBar onSearch={onSearch} loading={loading} />

        <div className="flex items-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/5 transition-colors hover:bg-white/10">
            <Bell size={18} />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-background">
            <CircleUserRound size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;