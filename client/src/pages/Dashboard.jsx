import AppShell from "../components/AppShell";
import StatsCard from "../components/StatsCard";
import YieldChart from "../components/YieldChart";
import RecommendationCard from "../components/RecommendationCard";
import ProfileCard from "../components/ProfileCard";
import NitrogenChart from "../components/NitrogenChart";
import SoilChart from "../components/SoilChart";
import SoilRadarChart from "../components/SoilRadarChart";
import YieldForecastChart from "../components/YieldForecastChart";
import InsightsCard from "../components/InsightsCard";
import WeatherWidget from "../components/WeatherWidget";
import WeatherCard from "../components/WeatherCard";
import AIFarmSummary from "../components/AIFarmSummary";
import FarmMap from "../components/FarmMap";
import LiveActivityFeed from "../components/LiveActivityFeed";

import { FaSeedling, FaMapLocationDot, FaDroplet } from "react-icons/fa6";

function Dashboard() {
  const farmer = JSON.parse(localStorage.getItem("farmer") || "null");

  return (
    <AppShell title="Field Console">
      <AIFarmSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Crop Type"
              value={farmer?.cropType || "—"}
              accent="moss"
              icon={<FaSeedling />}
            />
            <StatsCard
              title="Farm Size"
              value={`${farmer?.farmSize || "—"} ac`}
              accent="slate"
              icon={<FaMapLocationDot />}
            />
            <StatsCard
              title="Water Level"
              value="78%"
              accent="wheat"
              icon={<FaDroplet />}
            />
          </div>

          <YieldChart />
          <RecommendationCard />

          <div className="mt-5">
            <FarmMap />
          </div>

          <div className="mt-5">
            <NitrogenChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <SoilRadarChart />
            <SoilChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <YieldForecastChart />
            <InsightsCard />
          </div>

          <div className="mt-5">
            <WeatherWidget />
          </div>

          <div className="mt-5">
            <LiveActivityFeed />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          <ProfileCard />
          <WeatherCard location="Mysore" />
        </div>
      </div>
    </AppShell>
  );
}

export default Dashboard;
