import { FaSeedling, FaDroplet, FaWheatAwn, FaTriangleExclamation } from "react-icons/fa6";

const INSIGHTS = [
  { icon: FaSeedling, text: "Nitrogen utilization efficiency improved by 12%." },
  { icon: FaDroplet, text: "Soil moisture levels are optimal for crop growth." },
  { icon: FaWheatAwn, text: "Yield forecast predicts an 18% increase this season." },
  { icon: FaTriangleExclamation, text: "Potassium levels are slightly below ideal range.", warn: true },
];

function InsightsCard() {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-7 shadow-[var(--shadow-card)]">
      <p className="label-eyebrow mb-5">AI Insights</p>

      <div className="space-y-4">
        {INSIGHTS.map(({ icon: Icon, text, warn }, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              className={`mt-0.5 shrink-0 ${
                warn ? "text-[var(--wheat)]" : "text-[var(--moss-700)]"
              }`}
            >
              <Icon size={14} />
            </span>
            <p className="text-[var(--ink)] text-sm leading-6">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsightsCard;
