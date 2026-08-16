import { FaBell } from "react-icons/fa";

function Navbar() {
  const farmer = JSON.parse(localStorage.getItem("farmer") || "null");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-between items-end mb-9 pb-6 border-b border-[var(--line)]">
      <div>
        <p className="label-eyebrow mb-2">{today}</p>
        <h1 className="font-display text-[2.1rem] leading-none text-[var(--moss-900)]">
          Field Console
        </h1>
        <p className="text-[var(--ink-soft)] mt-2 text-[0.95rem]">
          Welcome back, {farmer?.name || "Farmer"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-11 h-11 rounded-md bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center text-[var(--moss-700)] hover:border-[var(--line-strong)] transition-colors">
          <FaBell size={15} />
        </button>

        <div className="px-4 py-2.5 rounded-md bg-[var(--moss-900)] text-white text-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--wheat)]" />
          AI Systems Active
        </div>
      </div>
    </div>
  );
}

export default Navbar;
