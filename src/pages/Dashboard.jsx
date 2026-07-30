import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import SearchBar from "../components/dashboard/SearchBar";
import ProfileCard from "../components/dashboard/ProfileCard";
import StatsGrid from "../components/dashboard/StatsGrid";
import DifficultyChart from "../components/dashboard/DifficultyChart";
import ComparisonSection from "../components/dashboard/ComparisonSection";

function Dashboard(){
return(
<div className="min-h-screen bg-[(--background)]">
<Sidebar/>
<div className="ml-72">
<TopNavbar/>
<div className="pt-24 px-8">
<div>
  <h1 className="text-4xl font-bold">
    Welcome Back 👋
  </h1>
  <p className="text-gray-400 mt-3 max-w-2xl">
    Analyze your LeetCode progress, compare profiles,
    and discover where you stand among other programmers.
  </p>
    <SearchBar />
    <ProfileCard />
    <StatsGrid />
    <DifficultyChart />
    <ComparisonSection />
</div>
</div>
</div>
</div>
)
};
export default Dashboard;