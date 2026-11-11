
import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import LandingSections from "../components/landing/LandingSections";
import SmoothScroll from "../components/landing/SmoothScroll";

function LandingPage() {
  return (
    <SmoothScroll>
    <div className="min-h-screen overflow-hidden bg-background text-text">
      <LandingNavbar />

      <main className="pt-20">
        <HeroSection />
        <LandingSections />
      </main>
      </div>
      </SmoothScroll>
  );
}

export default LandingPage;
