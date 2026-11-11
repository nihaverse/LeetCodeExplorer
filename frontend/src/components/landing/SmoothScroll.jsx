
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      autoRaf: false,
    });

    // Keep GSAP ScrollTrigger synchronized with Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    // Let GSAP's ticker drive Lenis.
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return children;
}

export default SmoothScroll;
