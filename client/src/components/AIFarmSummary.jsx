import { motion } from "framer-motion";
import {
  FaDroplet,
  FaCloudRain,
  FaSeedling,
  FaTriangleExclamation,
} from "react-icons/fa6";

const STATS = [
  { label: "Soil Health", value: "84", accent: "moss" },
  { label: "Moisture", value: "61%", accent: "slate" },
  { label: "Rain Risk", value: "68%", accent: "wheat" },
  { label: "Yield Growth", value: "+12%", accent: "moss" },
];

const ALERTS = [
  {
    icon: FaCloudRain,
    title: "Rain expected tomorrow",
    text: "Avoid fertilizer application during rainfall.",
  },
  {
    icon: FaDroplet,
    title: "Irrigation stable",
    text: "Soil moisture is healthy for crop growth.",
  },
  {
    icon: FaSeedling,
    title: "Nitrogen monitoring",
    text: "Nitrogen slightly high. Reduce urea this week.",
  },
];

function AIFarmSummary() {
  const farmer = JSON.parse(localStorage.getItem("farmer") || "null");

  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--moss-900)] text-white rounded-lg p-7 relative overflow-hidden"
    >
      <span className="absolute top-0 left-0 right-0 h-1 bg-[var(--wheat)]" />

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="label-eyebrow text-[var(--wheat)] mb-2">
            {greeting}, {farmer?.name || "Farmer"}
          </p>
          <h1 className="font-display text-2xl leading-snug mb-3">
            AI Daily Farm Summary
          </h1>
          <p className="text-[var(--moss-100)]/75 text-sm leading-6 max-w-2xl">
            Soil moisture is currently optimal at{" "}
            <span className="readout text-white">61%</span>. Nitrogen levels
            are slightly high and should be monitored. Rain probability is{" "}
            <span className="readout text-white">68%</span> tomorrow.
            Expected yield improvement:{" "}
            <span className="readout text-white">+12%</span>.
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-md p-5 min-w-[160px] shrink-0">
          <p className="label-eyebrow text-[var(--moss-100)]/60">
            AI Confidence
          </p>
          <p className="readout text-4xl font-medium mt-2">92%</p>
          <p className="text-[var(--moss-100)]/60 text-xs mt-2">
            Smart prediction accuracy
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white/[0.06] border border-white/10 p-4 rounded-md"
          >
            <p className="label-eyebrow text-[var(--moss-100)]/60 mb-2">
              {s.label}
            </p>
            <p className="readout text-2xl font-medium">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ALERTS */}
      <div className="mt-7">
        <div className="flex items-center justify-between mb-4">
          <p className="label-eyebrow text-[var(--moss-100)]/60">
            Smart AI Alerts
          </p>
          <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded text-xs">
            <FaTriangleExclamation className="text-[var(--wheat)]" size={10} />
            {ALERTS.length} active
          </span>
        </div>

        <div className="space-y-2.5">
          {ALERTS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-3 bg-white/[0.05] border border-white/10 p-3.5 rounded-md"
            >
              <span className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center shrink-0 text-[var(--wheat)]">
                <Icon size={13} />
              </span>
              <div>
                <p className="font-medium text-sm">{title}</p>
                <p className="text-[var(--moss-100)]/65 text-xs mt-0.5 leading-5">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default AIFarmSummary;
