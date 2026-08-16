import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { subject: "Nitrogen", value: 72 },
  { subject: "Phosphorous", value: 45 },
  { subject: "Potassium", value: 38 },
  { subject: "Moisture", value: 68 },
  { subject: "Yield", value: 80 },
];

function SoilRadarChart() {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-7 shadow-[var(--shadow-card)]">
      <h1 className="font-display text-xl text-[var(--moss-900)] mb-6">
        Soil Health Analysis
      </h1>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="var(--line)" />
          <PolarAngleAxis
            dataKey="subject"
            stroke="var(--ink-soft)"
            fontSize={12}
            fontFamily="IBM Plex Mono"
          />
          <PolarRadiusAxis stroke="var(--line)" fontSize={10} />
          <Radar
            dataKey="value"
            stroke="var(--moss-700)"
            fill="var(--wheat)"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SoilRadarChart;
