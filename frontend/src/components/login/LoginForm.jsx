
import { useState } from "react";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authClient";

function LoginForm({ onSwitchToSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const form = new FormData(event.currentTarget);
    setError("");
    setLoading(true);

    try {
      await login({
        email: form.get("email"),
        password: form.get("password"),
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="relative z-10 flex w-full items-center justify-center px-5 py-6 sm:px-8 lg:py-1">
      <div className="w-full max-w-[460px] rounded-3xl border border-white/10 bg-[#1d1714]/80 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-8 lg:p-6">

        {/* Heading */}
        <div className="mb-5 lg:mb-4">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#e07b4c]/25 bg-[#e07b4c]/10">
            <LockKeyhole className="h-5 w-5 text-[#e98f63]" />
          </div>

          <h1 className="font-['Space_Grotesk'] text-2xl font-bold leading-tight text-[#f4e8dc]">
            Login to LeetCode Explorer
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#a89888]">
            Continue your coding journey with powerful insights and analytics.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-3">

          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-medium text-[#e8d8c9]"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#a89888]" />

              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11 w-full rounded-xl border border-white/10 bg-[#100c0a]/70 pl-12 pr-4 text-sm text-[#f4e8dc] outline-none transition placeholder:text-[#75675c] focus:border-[#e07b4c]/70 focus:ring-2 focus:ring-[#e07b4c]/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-sm font-medium text-[#e8d8c9]"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#a89888]" />

              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="h-11 w-full rounded-xl border border-white/10 bg-[#100c0a]/70 pl-12 pr-12 text-sm text-[#f4e8dc] outline-none transition placeholder:text-[#75675c] focus:border-[#e07b4c]/70 focus:ring-2 focus:ring-[#e07b4c]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a89888] transition hover:text-[#e98f63]"
              >
                {showPassword ? (
                  <EyeOff className="h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me / Forgot Password */}
          <div className="flex items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#a89888]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 accent-[#e07b4c]"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-sm font-medium text-[#e98f63] transition hover:text-[#f4b08c]"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-[#d9604f]/40 bg-[#d9604f]/10 px-4 py-3 text-sm text-[#f0a094]"
            >
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d96c3d] to-[#ed966b] font-semibold text-[#1a100c] shadow-lg shadow-[#e07b4c]/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#e07b4c]/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && (
              <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#75675c]">
            or
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-[#e8d8c9] transition hover:border-white/20 hover:bg-white/[0.07]"
        >
          <Globe className="h-[18px] w-[18px] text-[#e98f63]" />
          Continue with Google
        </button>

        {/* Sign Up */}
        <p className="mt-4 text-center text-sm text-[#a89888]">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-[#e98f63] transition hover:text-[#f4b08c]"
            >
            Sign Up
          </button>
        </p>
      </div>
    </section>
  );
}

export default LoginForm;
