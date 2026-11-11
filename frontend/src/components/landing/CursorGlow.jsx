
import { useEffect, useRef } from "react";

function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;

    if (!glow) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!finePointer || reducedMotion) return;

    const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;

    // Keep the center of the glow exactly at the cursor.
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = "1";
    };

    const handlePointerLeave = () => {
      glow.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
  <div
    ref={glowRef}
    aria-hidden="true"
    className="pointer-events-none fixed left-0 top-0 z-[5] h-[420px] w-[420px] rounded-full opacity-0 mix-blend-screen"
    style={{
      transform: "translate(-50%, -50%)",
      background:
        "radial-gradient(circle, rgba(224,123,76,0.09) 0%, rgba(224,123,76,0.045) 35%, transparent 70%)",
      transition:
        "left 120ms ease-out, top 120ms ease-out, opacity 300ms ease",
      willChange: "left, top, opacity",
    }}
  />
);
}

export default CursorGlow;
