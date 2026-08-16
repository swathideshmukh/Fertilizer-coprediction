import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", nitrogen: 35 },
  { month: "Feb", nitrogen: 42 },
  { month: "Mar", nitrogen: 50 },
  { month: "Apr", nitrogen: 48 },
  { month: "May", nitrogen: 62 },
  { month: "Jun", nitrogen: 58 },
];

function NitrogenChart() {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-7 mt-6 shadow-[var(--shadow-card)]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-display text-xl text-[var(--moss-900)]">
            Nitrogen Trend Analysis
          </h1>
          <p className="text-[var(--ink-soft)] text-sm mt-1">
            Monthly nitrogen usage monitoring
          </p>
        </div>

        <span className="readout text-xs bg-[var(--moss-100)] text-[var(--moss-700)] px-3 py-1.5 rounded-full">
          +12% improvement
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
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
            dataKey="nitrogen"
            stroke="var(--slate)"
            strokeWidth={2.5}
            dot={{ fill: "var(--slate)", r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NitrogenChart;
