
import laptopImage from "../../assets/login-laptop.png";

function LoginVisual() {
  return (
    <section className="relative flex h-full min-h-0 flex-col items-center justify-center overflow-hidden px-4 py-6 lg:px-6 lg:py-3">
      {/* Ambient glow behind the illustration */}
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e07b4c]/15 blur-[100px]" />

      {/* Orbital rings */}
      <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-full border border-[#e98f63]/15" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rotate-[22deg] rounded-full border border-purple-400/10" />

      {/* Laptop illustration */}
      <div className="relative z-10 w-full max-w-[560px]">
        <img
          src={laptopImage}
          alt="LeetCode Explorer analytics dashboard displayed on a laptop"
          className="h-auto w-full object-contain drop-shadow-[0_20px_60px_rgba(224,123,76,0.2)]"
        />
      </div>

      {/* Tagline */}
      <div className="relative z-10 mt-5 text-center">
        <h2 className="font-['Space_Grotesk'] text-2xl font-semibold tracking-wide text-[#f4e8dc]">
          Track. Analyze. Improve.
        </h2>
        <p className="mt-2 text-sm tracking-wide text-[#a89888]">
          Turn every coding session into measurable progress.
        </p>
      </div>
    </section>
  );
}

export default LoginVisual;
