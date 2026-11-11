
import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import LandingSections from "../components/landing/LandingSections";

function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-text">
      <LandingNavbar />

      <main className="pt-20">
        <HeroSection />
        <LandingSections />
      </main>
    </div>
  );
}

export default LandingPage;
