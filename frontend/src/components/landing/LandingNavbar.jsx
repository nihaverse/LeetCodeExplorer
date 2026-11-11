
import { useState } from "react";
import { Link } from "react-router-dom";
import { Code2, Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-background">
            <Code2 size={23} strokeWidth={2.5} />
          </div>

          <div>
            <h1 className="font-display text-lg font-bold leading-tight text-text">
              LeetCode Explorer
            </h1>
            <p className="text-[10px] tracking-wider text-muted">
              YOUR CODING JOURNEY
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/dashboard"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-white/5"
          >
            Sign In
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-background transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
          >
            Explore Dashboard
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-border bg-surface px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-background"
            >
              Explore Dashboard
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default LandingNavbar;
