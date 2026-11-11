
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Flame,
  GitBranch,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import heroImage from "../../assets/hero.png";

function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-background"
    >
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[550px] w-[550px] rounded-full bg-purple-500/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold/5 blur-[110px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-4 lg:py-12">

        {/* LEFT: Hero Content */}
        <div className="relative z-10 max-w-2xl">

          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-semibold tracking-wider text-primary-hover">
              YOUR PERSONAL CODING COMPANION
            </span>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl font-bold leading-[1.12] tracking-tight text-text sm:text-6xl lg:text-[4.4rem]">
            Your LeetCode
            <br />
            journey,{" "}
            <span className="relative inline-block text-primary">
              decoded.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 250 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8C65 1 160 1 247 7"
                  stroke="#E07B4C"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Stop solving blindly. Understand your progress, discover
            your patterns, and turn every submission into a smarter
            step towards becoming a better problem solver.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="group flex items-center gap-3 rounded-xl bg-primary px-7 py-4 font-semibold text-background shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-primary/30"
            >
              Explore Dashboard
              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#features"
              className="group flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-7 py-4 font-semibold text-text transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
            >
              Discover Features
              <ArrowUpRight
                size={17}
                className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Quick highlights */}
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-border pt-7">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10">
                <Code2 size={18} className="text-secondary" />
              </div>
              <span className="text-sm text-muted">
                Progress Tracking
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10">
                <Trophy size={18} className="text-gold" />
              </div>
              <span className="text-sm text-muted">
                Contest Insights
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Zap size={18} className="text-primary" />
              </div>
              <span className="text-sm text-muted">
                Smart Analysis
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Illustration area */}
        <div className="relative mx-auto flex w-full max-w-[600px] items-center justify-center lg:min-h-[590px]">

          {/* Decorative rings */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/10" />

          {/* Ambient glow behind illustration */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[90px]" />

          {/* PNG PLACEHOLDER */}
          <div className="relative z-10 flex aspect-square w-full max-w-[480px] items-center justify-center">

            {/* 
              PNG PLACEHOLDER:
              Later replace this block with your transparent girl PNG.

              Example:
              <img
                src="/src/assets/hero-girl.png"
                alt="Girl exploring LeetCode"
                className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
              />
            */}

            <div className="relative flex h-[90%] w-[90%] items-center justify-center overflow-hidden rounded-[3rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-surface/30 to-purple-500/10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(224,123,76,0.13),transparent_70%)]" />

              <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
                <img
                  src={heroImage}
                  alt="Girl coding at her laptop"
                  className="relative z-10 mx-auto h-auto w-full max-w-[420px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Floating card: solved problems */}
          <div className="absolute left-0 top-[16%] z-20 animate-[float_5s_ease-in-out_infinite] rounded-2xl border border-border bg-surface/90 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:left-[-2%]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15">
                <Code2 size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-[11px] text-muted">Problems solved</p>
                <p className="font-display text-xl font-bold text-text">
                  699
                  <span className="ml-2 text-xs font-medium text-secondary">
                    +12
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Floating card: streak */}
          <div className="absolute right-0 top-[12%] z-20 animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-border bg-surface/90 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:right-[-1%]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                <Flame size={21} className="text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-muted">Daily streak</p>
                <p className="font-display text-xl font-bold text-text">
                  12 days
                </p>
              </div>
            </div>
          </div>

          {/* Floating card: rating */}
          <div className="absolute bottom-[15%] left-[1%] z-20 animate-[float_5.5s_ease-in-out_infinite] rounded-2xl border border-border bg-surface/90 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15">
                <Trophy size={20} className="text-gold" />
              </div>
              <div>
                <p className="text-[11px] text-muted">Contest rating</p>
                <p className="font-display text-xl font-bold text-text">
                  1854
                </p>
              </div>
            </div>
          </div>

          {/* Floating decorative code badge */}
          <div className="absolute bottom-[13%] right-[3%] z-20 flex h-14 w-14 animate-[float_4.5s_ease-in-out_infinite] items-center justify-center rounded-2xl border border-purple-400/20 bg-surface/90 text-purple-300 shadow-xl backdrop-blur-xl">
            <GitBranch size={24} />
          </div>

          {/* Tiny decorative sparkles */}
          <Sparkles className="absolute left-[12%] top-[5%] h-6 w-6 animate-pulse text-gold/70" />
          <Sparkles className="absolute bottom-[5%] right-[22%] h-5 w-5 text-primary/70" />
          <span className="absolute right-[12%] top-[35%] h-2 w-2 rounded-full bg-secondary shadow-[0_0_15px_4px_rgba(122,171,155,0.35)]" />
          <span className="absolute bottom-[30%] left-[15%] h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_15px_4px_rgba(224,123,76,0.3)]" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

      {/* Local floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
