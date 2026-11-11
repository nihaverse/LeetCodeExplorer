import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Code2,
  GitCompareArrows,
  Lightbulb,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  {
    icon: Activity,
    title: "Progress Tracking",
    description:
      "Track your problem-solving journey and understand how consistently you're improving.",
    color: "text-[#7aab9b]",
    iconBg: "bg-[#7aab9b]/10",
  },
  {
    icon: Trophy,
    title: "Contest Insights",
    description:
      "Explore your contest performance, rating history, and competitive programming growth.",
    color: "text-[#e6b84a]",
    iconBg: "bg-[#e6b84a]/10",
  },
  {
    icon: BrainCircuit,
    title: "Smart Analysis",
    description:
      "Turn your coding activity into meaningful insights that help you identify improvement areas.",
    color: "text-[#e07b4c]",
    iconBg: "bg-[#e07b4c]/10",
  },
  {
    icon: GitCompareArrows,
    title: "Compare Profiles",
    description:
      "Compare coding profiles and discover differences in problem-solving progress.",
    color: "text-[#b99be8]",
    iconBg: "bg-[#b99be8]/10",
  },
  {
    icon: LineChart,
    title: "Visual Analytics",
    description:
      "Understand your journey through clear charts, trends, and performance breakdowns.",
    color: "text-[#e58b70]",
    iconBg: "bg-[#e58b70]/10",
  },
  {
    icon: Target,
    title: "Personalized Direction",
    description:
      "Recognize patterns in your performance and find areas that deserve more attention.",
    color: "text-[#7aab9b]",
    iconBg: "bg-[#7aab9b]/10",
  },
];

const steps = [
  {
    number: "01",
    icon: Code2,
    title: "Enter your username",
    description:
      "Start with your LeetCode username and bring your coding activity into one place.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Explore your analytics",
    description:
      "View your solved problems, submission trends, contest performance, and progress.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Grow strategically",
    description:
      "Use your insights to understand your strengths and make your next move count.",
  },
];

function SectionHeading({ eyebrow, title, description, headingAttribute}) {
  return (
    <div
        data-features-heading
        {...(headingAttribute ? { [headingAttribute]: "" } : {})}
        className="mx-auto mb-14 max-w-2xl text-center"
        >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        <Sparkles size={14} />
        {eyebrow}
      </div>

      <h2 className="font-display text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}


function FeaturesSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      // Safety check
      if (!section) return;

      const heading = section.querySelector("[data-features-heading]");
      const grid = section.querySelector("[data-feature-grid]");
          const cards = section.querySelectorAll("[data-feature-card]");
          
        // Respect the user's reduced-motion preference.
        const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

      // Heading reveal animation
      gsap.from(heading, {
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Feature cards reveal animation
      gsap.from(cards, {
        y: 55,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Store event-listener cleanup functions
      const cleanupFunctions = [];

      
// Interactive 3D card animations
cards.forEach((card) => {
  const icon = card.querySelector("[data-feature-icon]");

  const handlePointerMove = (event) => {
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    // Update the cursor spotlight position.
    card.style.setProperty("--spotlight-x", `${x * 100}%`);
    card.style.setProperty("--spotlight-y", `${y * 100}%`);  

    // Convert cursor position into rotation values.
    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 14;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const hoverIn = () => {
    gsap.to(card, {
      y: -5,
      z: 15,
      scale: 1.015,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 900,
    });

    if (icon) {
      gsap.to(icon, {
        y: -3,
        z: 12,
        rotate: 5,
        scale: 1.08,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const hoverOut = () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      y: 0,
      z: 0,
      scale: 1,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });

    if (icon) {
      gsap.to(icon, {
        y: 0,
        z: 0,
        rotate: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  card.addEventListener("mouseenter", hoverIn);
  card.addEventListener("mousemove", handlePointerMove);
  card.addEventListener("mouseleave", hoverOut);

  // Preserve the existing event-listener cleanup.
  cleanupFunctions.push(() => {
    card.removeEventListener("mouseenter", hoverIn);
    card.removeEventListener("mousemove", handlePointerMove);
    card.removeEventListener("mouseleave", hoverOut);
  });
});


      // Clean up all event listeners when the effect is reverted
      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-purple-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Everything in one place"
          title={
            <>
              More than numbers.
              <br />
              <span className="text-primary">A clearer direction.</span>
            </>
          }
          description="Your LeetCode activity tells a story. Explore the tools that help you understand it, one insight at a time."
        />

        <div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [perspective:1000px]"
        data-feature-grid
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                data-feature-card
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-7 [transform-style:preserve-3d] transition-colors duration-300 hover:border-primary/40 hover:bg-surface-light"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/0 blur-3xl transition-all duration-300 group-hover:bg-primary/10" />
                
                {/* Cursor-following spotlight */}
                <div
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background:
                    "radial-gradient(350px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(224, 123, 76, 0.16), transparent 70%)",
                }}
                />    

                <div
                  className={`relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}
                  data-feature-icon
                >
                  <Icon size={23} className={feature.color} />
                </div>

                <h3 className="relative mb-3 font-display text-lg font-semibold text-text">
                  {feature.title}
                </h3>

                <p className="relative text-sm leading-7 text-muted">
                  {feature.description}
                </p>

                <div className="relative mt-7 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore insight
                  <ArrowUpRight size={14} />
                </div>

                <span className="absolute right-6 top-6 font-display text-xs text-muted/30">
                  0{index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



function HowItWorksSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      const heading = section.querySelector("[data-how-heading]");
      const cards = section.querySelectorAll("[data-how-card]");
      const icons = section.querySelectorAll("[data-how-icon]");

      gsap.from(heading, {
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(cards, {
        y: 65,
        opacity: 0,
        scale: 0.95,
        duration: 0.85,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector("[data-how-grid]"),
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(icons, {
        scale: 0.5,
        rotation: -20,
        duration: 0.7,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section.querySelector("[data-how-grid]"),
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (

      <section
      ref={sectionRef}
      id="how-it-works"
      className="relative scroll-mt-24 border-y border-border bg-surface/60 px-6 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(224,123,76,0.08),transparent_65%)]" />

      <div
        className="relative mx-auto max-w-7xl"
        >
        <SectionHeading
        eyebrow="Simple by design"
        headingAttribute="data-how-heading"
        title={
            <>
              Three steps.
              <br />
              <span className="text-primary">A smarter journey.</span>
            </>
          }
          description="Getting a better understanding of your coding progress shouldn't be complicated."
        />

        <div
        className="relative grid gap-8 md:grid-cols-3"
        data-how-grid
        >
          <div className="pointer-events-none absolute left-[17%] right-[17%] top-12 hidden border-t border-dashed border-primary/30 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative text-center"
                data-how-card
                >
                    <div
                        data-how-icon
                        className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl border border-primary/25 bg-card shadow-[0_0_45px_rgba(224,123,76,0.08)]">
                  <div className="absolute inset-2 rounded-2xl border border-border" />
                  <Icon size={30} className="relative text-primary" />

                  <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-background font-display text-xs font-bold text-primary">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-3 font-display text-xl font-semibold text-text">
                  {step.title}
                </h3>

                <p className="mx-auto max-w-xs text-sm leading-7 text-muted">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function AboutSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      
      const leftContent = section.querySelector("[data-about-content]");
      const analyticsCard = section.querySelector("[data-about-card]");
      const progressBars = section.querySelectorAll("[data-about-progress]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          defaults: {
            ease: "power3.out",
          },
        });

        tl.from(leftContent, {
          x: -65,
          opacity: 0,
          duration: 0.9,
        })
          .from(
            analyticsCard,
            {
              x: 65,
              opacity: 0,
              scale: 0.95,
              duration: 1,
            },
            "-=0.65"
          )
          .from(
            progressBars,
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.9,
              stagger: 0.15,
              ease: "power2.out",
            },
            "-=0.4"
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (

    <section
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-about-content>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Lightbulb size={14} />
            Why we built this
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
            Don't just solve problems.
            <br />
            <span className="text-primary">Understand your growth.</span>
          </h2>

          <p className="mt-6 text-sm leading-8 text-muted sm:text-base">
            Every submission, every contest, and every practice session
            contributes to your coding journey. But raw numbers don't always
            show the bigger picture.
          </p>

          <p className="mt-4 text-sm leading-8 text-muted sm:text-base">
            LeetCode Explorer brings your progress together through meaningful
            analytics and visual insights, helping you move beyond simply
            counting solved problems.
          </p>

          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-[#1a1310] shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            Explore your dashboard
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-8 rounded-full bg-primary/15 blur-[80px]" />

            <div
                data-about-card
                className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-2xl shadow-black/20 sm:p-9">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted">
                  YOUR JOURNEY
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-text">
                  Growth is a process.
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TrendingUp size={22} />
              </div>
            </div>

            <div className="space-y-5">
              {[
                { label: "Consistency", value: "Build the habit", width: "88%" },
                { label: "Problem solving", value: "Strengthen concepts", width: "72%" },
                { label: "Competitive growth", value: "Challenge yourself", width: "61%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-text">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted">{item.value}</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-surface-light">
                    <div
                      data-about-progress
                      className="h-full rounded-full bg-gradient-to-r from-primary to-[#e6b84a]"
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-surface p-4">
                <CheckCircle2 size={19} className="mb-3 text-[#7aab9b]" />
                <p className="text-sm font-semibold text-text">
                  Every step counts
                </p>
                <p className="mt-1 text-xs text-muted">Track your progress</p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <Zap size={19} className="mb-3 text-[#e6b84a]" />
                <p className="text-sm font-semibold text-text">
                  Keep improving
                </p>
                <p className="mt-1 text-xs text-muted">Learn from your data</p>
              </div>
            </div>

            <div className="absolute -right-3 top-28 h-6 w-6 rounded-full border-4 border-background bg-primary" />
            <div className="absolute -left-2 bottom-28 h-4 w-4 rounded-full bg-[#7aab9b]" />
          </div>

          <div className="absolute -bottom-5 -right-4 -z-10 h-32 w-32 rounded-full border border-primary/20" />
          <Sparkles className="absolute -left-7 top-8 text-[#e6b84a]" size={22} />
        </div>
      </div>
    </section>
  );
}


function FinalCTASection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const content = section.querySelector("[data-cta-content]");
      const icon = section.querySelector("[data-cta-icon]");
      const heading = section.querySelector("[data-cta-heading]");
      const description = section.querySelector("[data-cta-description]");
      const button = section.querySelector("[data-cta-button]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out" },
        });

        tl.from(content, { y: 35, opacity: 0, duration: 0.8 })
          .from(icon, {
            scale: 0.5,
            rotation: -25,
            duration: 0.65,
            ease: "back.out(1.7)",
          }, "-=0.45")
          .from(
            [heading, description, button],
            {
              y: 25,
              opacity: 0,
              duration: 0.7,
              stagger: 0.15,
            },
            "-=0.3"
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="px-6 pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#382016] via-[#2b1b17] to-[#241823] px-7 py-16 text-center sm:px-12 lg:py-20">
        <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-purple-500/15 blur-[100px]" />

        <Sparkles className="absolute left-[12%] top-12 text-[#e6b84a]/70" size={22} />
        <Sparkles className="absolute bottom-12 right-[14%] text-primary/70" size={18} />

        <div data-cta-content className="relative mx-auto max-w-2xl">
          <div
            data-cta-icon
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary"
          >
            <Code2 size={28} />
          </div>

          <h2
            data-cta-heading
            className="font-display text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl"
          >
            Ready to decode
            <br />
            <span className="text-primary">your progress?</span>
          </h2>

          <p
            data-cta-description
            className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted sm:text-base"
          >
            Your next breakthrough starts with understanding where you are
            today. Let's make every coding session count.
          </p>

          <Link
            data-cta-button
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-[#1a1310] shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-primary-hover"
          >
            Explore Dashboard
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}


function LandingFooter() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      const items = footer.querySelectorAll("[data-footer-item]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(items, {
          y: 25,
          opacity: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="border-t border-border bg-[#17110e] px-6 py-9"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <Link
          to="/"
          data-footer-item
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-[#1a1310]">
            <Code2 size={21} />
          </div>

          <div>
            <p className="font-display text-sm font-bold text-text">
              LeetCode Explorer
            </p>
            <p className="text-[10px] tracking-[0.15em] text-muted">
              YOUR CODING JOURNEY
            </p>
          </div>
        </Link>

        <p
          data-footer-item
          className="text-center text-xs text-muted"
        >
          Built for curious minds. Keep learning, keep growing.
        </p>

        <Link
          data-footer-item
          to="/dashboard"
          className="text-xs font-semibold text-primary transition-colors hover:text-text"
        >
          Go to Dashboard <ArrowUpRight className="ml-1 inline" size={13} />
        </Link>
      </div>
    </footer>
  );
}


export default function LandingSections() {
  return (
    <>
      <FeaturesSection />
      <HowItWorksSection />
      <AboutSection />
      <FinalCTASection />
      <LandingFooter />
    </>
  );
}
