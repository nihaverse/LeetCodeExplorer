
import { useState } from "react";

import LoginBackground from "../components/login/LoginBackground";
import LoginVisual from "../components/login/LoginVisual";
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm";

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#100A08] lg:h-screen lg:min-h-0">

      {/* Shared cosmic background */}
      <LoginBackground />

      {/* Main split-screen layout */}
      <div className="relative z-10 grid min-h-screen grid-cols-1 items-center gap-4 px-4 py-8 lg:h-full lg:min-h-0 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-3">

        {/* Left: Laptop illustration */}
        <div className="relative flex min-h-[500px] min-w-0 items-center justify-center lg:min-h-0">
          <LoginVisual />
        </div>

        {/* Right: Switchable authentication form */}
        <div className="flex min-w-0 items-center justify-center">
          <div
            key={isSignup ? "signup" : "login"}
            className="w-full animate-[authFade_0.35s_ease-out]"
          >
            {isSignup ? (
              <SignupForm
                onSwitchToLogin={() => setIsSignup(false)}
              />
            ) : (
              <LoginForm
                onSwitchToSignup={() => setIsSignup(true)}
              />
            )}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes authFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

export default LoginPage;
