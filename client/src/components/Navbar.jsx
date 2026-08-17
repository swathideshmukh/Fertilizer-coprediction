import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";

function Navbar({ title = "Field Console", subtitle }) {
  const farmer = JSON.parse(localStorage.getItem("farmer") || "null");
  const [notifOpen, setNotifOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-between items-end mb-7 pb-5 border-b border-[var(--line)]">
      <div>
        <p className="label-eyebrow mb-1.5">{today}</p>
        <h1 className="font-display text-[1.85rem] leading-none text-[var(--moss-900)]">
          {title}
        </h1>
        <p className="text-[var(--ink-soft)] mt-1.5 text-[0.9rem]">
          {subtitle || `Welcome back, ${farmer?.name || "Farmer"}`}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <NotificationDropdown open={notifOpen} setOpen={setNotifOpen} />

        <div className="px-3.5 py-2 rounded-md bg-[var(--moss-900)] text-white text-xs flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--wheat)]" />
          AI Systems Active
        </div>
      </div>
    </div>
  );
}

export default Navbar;
