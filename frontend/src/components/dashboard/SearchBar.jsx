import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch, loading = false }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const username = value.trim();
    if (username) onSearch?.(username);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-border bg-surface-light py-2 pl-4 pr-2 transition-colors focus-within:border-primary"
    >
      <Search size={18} className="shrink-0 text-primary" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter LeetCode username..."
        className="min-w-0 flex-1 bg-transparent text-text outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
}

export default SearchBar;