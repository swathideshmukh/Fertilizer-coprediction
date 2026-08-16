import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", yield: 40 },
  { month: "Feb", yield: 55 },
  { month: "Mar", yield: 70 },
  { month: "Apr", yield: 65 },
  { month: "May", yield: 90 },
];

function YieldChart() {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-7 mt-6 shadow-[var(--shadow-card)]">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-xl text-[var(--moss-900)]">
          Crop Yield Analysis
        </h2>
        <p className="label-eyebrow">Last 5 months</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="month"
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
          <Line
            type="monotone"
            dataKey="yield"
            stroke="var(--moss-700)"
            strokeWidth={2.5}
            dot={{ fill: "var(--wheat)", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default YieldChart;
