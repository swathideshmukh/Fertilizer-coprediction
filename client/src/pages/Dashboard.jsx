import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import YieldChart from "../components/YieldChart";
import RecommendationCard from "../components/RecommendationCard";
import ProfileCard from "../components/ProfileCard";
import NitrogenChart from "../components/NitrogenChart";
import SoilRadarChart from "../components/SoilRadarChart";
import YieldForecastChart from "../components/YieldForecastChart";
import InsightsCard from "../components/InsightsCard";
import WeatherWidget from "../components/WeatherWidget";

import { FaSeedling, FaMapLocationDot, FaDroplet } from "react-icons/fa6";

function Dashboard() {
  const farmer = JSON.parse(localStorage.getItem("farmer") || "null");

  return (
    <div className="bg-[var(--canvas)] min-h-screen">
      <Sidebar />

      <div className="ml-[264px] p-10 max-w-[1400px]">
        <Navbar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
            <div className="mt-6">
              <NitrogenChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <SoilRadarChart />
              <YieldForecastChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <InsightsCard />
              <WeatherWidget />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <ProfileCard />

            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-7 shadow-[var(--shadow-card)]">
              <p className="label-eyebrow mb-5">Weather Analysis</p>

              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-[var(--ink-soft)]">Temperature</span>
                  <span className="readout font-medium">29°C</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-[var(--ink-soft)]">Humidity</span>
                  <span className="readout font-medium">68%</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-[var(--ink-soft)]">Rainfall</span>
                  <span className="readout font-medium">120 mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
