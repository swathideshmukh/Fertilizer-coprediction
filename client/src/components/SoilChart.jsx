import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Week 1", nitrogen: 40, moisture: 60 },
  { name: "Week 2", nitrogen: 45, moisture: 58 },
  { name: "Week 3", nitrogen: 50, moisture: 63 },
  { name: "Week 4", nitrogen: 55, moisture: 66 },
];

function SoilChart() {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-7 shadow-[var(--shadow-card)]">
      <p className="label-eyebrow mb-1.5">Weekly Trend</p>
      <h1 className="font-display text-xl text-[var(--moss-900)] mb-6">
        Soil Analytics
      </h1>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="var(--ink-soft)"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontFamily="IBM Plex Mono"
          />
          <YAxis
            stroke="var(--ink-soft)"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontFamily="IBM Plex Mono"
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid var(--line)",
              fontFamily: "IBM Plex Mono",
              fontSize: 13,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, fontFamily: "Inter" }} />
          <Line
            type="monotone"
            dataKey="nitrogen"
            name="Nitrogen"
            stroke="var(--moss-700)"
            strokeWidth={2.5}
            dot={{ fill: "var(--moss-700)", r: 4, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="moisture"
            name="Moisture"
            stroke="var(--slate)"
            strokeWidth={2.5}
            dot={{ fill: "var(--slate)", r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SoilChart;
