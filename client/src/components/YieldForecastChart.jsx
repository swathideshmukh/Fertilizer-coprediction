import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", yield: 30 },
  { month: "Feb", yield: 45 },
  { month: "Mar", yield: 52 },
  { month: "Apr", yield: 65 },
  { month: "May", yield: 80 },
  { month: "Jun", yield: 92 },
];

function YieldForecastChart() {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-7 shadow-[var(--shadow-card)]">
      <h1 className="font-display text-xl text-[var(--moss-900)] mb-6">
        Yield Forecast Analysis
      </h1>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <defs>
            <linearGradient id="yieldFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--wheat)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--wheat)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="yield"
            stroke="var(--wheat)"
            strokeWidth={2.5}
            fill="url(#yieldFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default YieldForecastChart;
