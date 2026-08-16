import {
  FaHome,
  FaUser,
  FaHistory,
  FaFileUpload,
  FaRobot,
  FaLeaf,
  FaBrain,
  FaTools,
  FaSignOutAlt,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: FaHome },
  { label: "Farmer Profile", path: null, icon: FaUser },
  { label: "Upload Soil Report", path: "/upload", icon: FaFileUpload },
  { label: "Prediction History", path: "/history", icon: FaHistory },
  { label: "AI Prediction", path: "/prediction", icon: FaBrain },
  { label: "AI Assistant", path: "/chatbot", icon: FaRobot },
  { label: "Admin Panel", path: "/admin", icon: FaTools },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("farmer");
    window.location.href = "/login";
  };

  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-[264px] h-screen fixed flex flex-col bg-[var(--moss-900)] text-[var(--moss-100)] border-r border-black/10"
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 px-7 pt-8 pb-7 border-b border-white/10">
        <div className="w-10 h-10 rounded-md bg-[var(--wheat)] flex items-center justify-center text-[var(--moss-900)]">
          <FaLeaf size={17} />
        </div>

        <div>
          <h1 className="font-display text-[1.15rem] leading-none text-white">
            Smart Agro
          </h1>
          <p className="label-eyebrow mt-1.5 text-[var(--moss-100)]/60">
            Field Console
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto px-4 pt-6">
        <p className="label-eyebrow px-3 mb-3 text-[var(--moss-100)]/45">
          Navigate
        </p>

        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
            const active = location.pathname === path;

            return (
              <li key={path}>
                <button
                  onClick={() => path && navigate(path)}
                  className={`relative w-full flex items-center gap-3.5 pl-4 pr-3 py-3 rounded-md text-[0.925rem] transition-colors duration-150 ${
                    active
                      ? "bg-white/[0.08] text-white"
                      : "text-[var(--moss-100)]/70 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-[var(--wheat)]" />
                  )}
                  <Icon size={15} className="shrink-0 opacity-90" />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ADVISORY */}
      <div className="mx-4 mb-4 p-4 rounded-md bg-white/[0.06] border border-white/10">
        <p className="label-eyebrow text-[var(--wheat)] mb-2">
          Field Advisory
        </p>
        <p className="text-[0.8rem] leading-5 text-[var(--moss-100)]/75">
          Soil nitrogen reads slightly low across recent samples.
          Balanced fertilization is recommended this cycle.
        </p>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mx-4 mb-6 flex items-center gap-3.5 pl-4 pr-3 py-3 rounded-md text-[0.925rem] text-[var(--moss-100)]/60 hover:bg-red-950/40 hover:text-red-200 transition-colors duration-150"
      >
        <FaSignOutAlt size={15} />
        Logout
      </button>
    </motion.aside>
  );
}

export default Sidebar;
