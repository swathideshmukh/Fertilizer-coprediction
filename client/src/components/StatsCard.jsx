function StatsCard({ title, value, icon, accent = "moss" }) {
  const accents = {
    moss: { bar: "bg-[var(--moss-700)]", icon: "text-[var(--moss-700)]" },
    wheat: { bar: "bg-[var(--wheat)]", icon: "text-[var(--wheat)]" },
    slate: { bar: "bg-[var(--slate)]", icon: "text-[var(--slate)]" },
  };

  const a = accents[accent] || accents.moss;

  return (
    <div className="relative bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 pl-7 overflow-hidden shadow-[var(--shadow-card)]">
      <span className={`absolute left-0 top-0 bottom-0 w-1 ${a.bar}`} />

      <div className="flex items-start justify-between">
        <p className="label-eyebrow">{title}</p>
        <span className={`text-base ${a.icon} opacity-80`}>{icon}</span>
      </div>

      <p className="readout text-[1.75rem] font-medium text-[var(--ink)] mt-3">
        {value}
      </p>
    </div>
  );
}

export default StatsCard;
