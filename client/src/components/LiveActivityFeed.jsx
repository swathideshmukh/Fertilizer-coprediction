import { motion } from "framer-motion";
import {
  FaFileLines,
  FaFlask,
  FaCloudRain,
  FaRobot,
  FaDroplet,
} from "react-icons/fa6";

const ACTIVITIES = [
  {
    title: "OCR analysis completed",
    description: "Soil report processed successfully.",
    time: "2 min ago",
    icon: FaFileLines,
    accent: "moss",
  },
  {
    title: "Nitrogen increased",
    description: "Nitrogen level increased by 4%.",
    time: "10 min ago",
    icon: FaFlask,
    accent: "wheat",
  },
  {
    title: "Rain detected near farm",
    description: "Heavy rainfall expected tomorrow.",
    time: "18 min ago",
    icon: FaCloudRain,
    accent: "slate",
  },
  {
    title: "AI recommendation updated",
    description: "Irrigation requirement changed.",
    time: "30 min ago",
    icon: FaRobot,
    accent: "moss",
  },
  {
    title: "Moisture stabilized",
    description: "Soil moisture reached optimal level.",
    time: "45 min ago",
    icon: FaDroplet,
    accent: "slate",
  },
];

const ACCENTS = {
  moss: "bg-[var(--moss-100)] text-[var(--moss-700)]",
  wheat: "bg-[var(--wheat-100)] text-[var(--wheat)]",
  slate: "bg-[var(--slate-100)] text-[var(--slate)]",
};

function LiveActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between mb-5">
        <p className="label-eyebrow">Live Activity Feed</p>

        <div className="flex items-center gap-2 bg-[var(--moss-100)] px-2.5 py-1 rounded text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--moss-700)] animate-pulse" />
          <span className="font-medium text-[var(--moss-700)]">LIVE</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        {ACTIVITIES.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className="flex items-start gap-3 p-3.5 rounded-md border border-transparent hover:border-[var(--line)] hover:bg-[var(--canvas)] transition-colors"
          >
            <span
              className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${ACCENTS[item.accent]}`}
            >
              <item.icon size={13} />
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <p className="font-medium text-sm text-[var(--ink)]">
                    {item.title}
                  </p>
                  <p className="text-[var(--ink-soft)] text-xs mt-0.5 leading-5">
                    {item.description}
                  </p>
                </div>
                <span className="readout text-xs text-[var(--ink-soft)] whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default LiveActivityFeed;
