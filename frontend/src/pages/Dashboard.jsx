import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import ProfileCard from "../components/dashboard/ProfileCard";
import StatsGrid from "../components/dashboard/StatsGrid";
import DifficultyChart from "../components/dashboard/DifficultyChart";
import ComparisonSection from "../components/dashboard/ComparisonSection";
import useLeetCodeUser from "../hooks/useLeetCodeUser";
import MomentumChart from "../components/dashboard/MomentumChart";
import RatingHistoryChart from "../components/dashboard/RatingHistoryChart";

function Dashboard() {
  const [username, setUsername] = useState("");
  const { user, loading, error } = useLeetCodeUser(username);

  return (
    <div className="min-h-screen bg-background text-text">
      <Sidebar />
      <div className="ml-72">
        <TopNavbar onSearch={setUsername} loading={loading} />

        <main className="px-8 pb-12 pt-28">
          {/* Hero */}
          <section className="rounded-3xl border border-border bg-surface p-10">
            <h1 className="font-display text-5xl font-bold leading-tight">
              Your competitive
              <br />
              programming cockpit
            </h1>
            <p className="mt-5 max-w-2xl text-muted">
              Turn your submission history into a strategy: spot momentum,
              sharpen your edge, and know exactly what to solve next.
            </p>
          </section>

          {/* Status */}
          {loading && (
            <p className="mt-8 text-muted">Loading profile...</p>
          )}
          {error && (
            <p className="mt-8 rounded-xl border border-coral/40 bg-coral/10 px-5 py-4 text-coral">
              {error}
            </p>
          )}

          {user && (
            <div className="mt-8">
              <ProfileCard user={user} />
            </div>
          )}
          {user && (
            <div className="mt-8">
              <StatsGrid user={user} />
            </div>
          )}
          {user && (
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <MomentumChart weeks={user.weeklyActivity} />
              </div>
              <DifficultyChart solved={user.solved} />
            </div>
          )}
          {user && (
            <div className="mt-8">
              <RatingHistoryChart
                history={user.contestHistory}
                currentRating={user.contest?.rating}
              />
            </div>
          )}
          <ComparisonSection />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;