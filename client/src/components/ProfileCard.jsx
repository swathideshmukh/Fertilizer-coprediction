function ProfileCard() {
  const farmer = JSON.parse(localStorage.getItem("farmer") || "null");

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-7 shadow-[var(--shadow-card)]">
      <p className="label-eyebrow mb-5">Farmer Record</p>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-md bg-[var(--moss-900)] flex items-center justify-center text-[var(--wheat)] font-display text-xl">
          {farmer?.name?.charAt(0) || "F"}
        </div>

        <div>
          <h1 className="font-display text-xl text-[var(--ink)] leading-tight">
            {farmer?.name || "Unnamed Farmer"}
          </h1>
          <p className="text-[var(--ink-soft)] text-sm mt-0.5">
            {farmer?.district || "—"}, {farmer?.state || "—"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="bg-[var(--moss-100)] p-4 rounded-md">
          <p className="label-eyebrow mb-2">Farm Size</p>
          <p className="readout text-lg text-[var(--moss-900)]">
            {farmer?.farmSize || "—"} <span className="text-sm">acres</span>
          </p>
        </div>

        <div className="bg-[var(--moss-100)] p-4 rounded-md">
          <p className="label-eyebrow mb-2">Crop Type</p>
          <p className="readout text-lg text-[var(--moss-900)]">
            {farmer?.cropType || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
