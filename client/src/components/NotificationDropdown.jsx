import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaDroplet,
  FaCloudRain,
  FaLeaf,
  FaCircleCheck,
} from "react-icons/fa6";

const SERVER_API_URL =
  import.meta.env.VITE_SERVER_API_URL ||
  "https://fertilizer-coprediction-3.onrender.com";

function NotificationDropdown({ open, setOpen }) {
  const [notifications, setNotifications] = useState([]);
  const farmer = JSON.parse(localStorage.getItem("farmer") || "null");

  useEffect(() => {
    if (farmer?._id) fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${SERVER_API_URL}/api/notifications/${farmer._id}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIcon = (title = "") => {
    if (title.includes("Moisture")) return FaDroplet;
    if (title.includes("Rain")) return FaCloudRain;
    if (title.includes("Nitrogen")) return FaLeaf;
    return FaCircleCheck;
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 rounded-md bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center text-[var(--moss-700)] hover:border-[var(--line-strong)] transition-colors"
      >
        <FaBell size={13} />

        {notifications.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-[var(--wheat)] text-[var(--moss-900)] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {notifications.length}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-[340px] bg-[var(--paper)] border border-[var(--line)] rounded-lg shadow-[var(--shadow-card)] overflow-hidden z-50"
          >
            <div className="p-5 border-b border-[var(--line)]">
              <p className="label-eyebrow mb-1.5">Notifications</p>
              <h2 className="font-display text-lg text-[var(--moss-900)]">
                Field Alerts
              </h2>
            </div>

            <div className="max-h-[360px] overflow-y-auto">
              {notifications.length === 0 && (
                <p className="p-6 text-center text-[var(--ink-soft)] text-sm">
                  No notifications available
                </p>
              )}

              {notifications.map((item, index) => {
                const Icon = getIcon(item.title);

                return (
                  <div
                    key={index}
                    className="flex gap-3 p-4 border-b border-[var(--line)] last:border-0 hover:bg-[var(--canvas)] transition-colors cursor-pointer"
                  >
                    <span className="w-9 h-9 rounded-md bg-[var(--moss-100)] text-[var(--moss-700)] flex items-center justify-center shrink-0">
                      <Icon size={13} />
                    </span>

                    <div className="min-w-0">
                      <p className="font-medium text-sm text-[var(--ink)]">
                        {item.title}
                      </p>
                      <p className="text-[var(--ink-soft)] text-xs mt-0.5 leading-5">
                        {item.message}
                      </p>
                      <p className="readout text-[var(--ink-soft)] text-[0.7rem] mt-1.5">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationDropdown;
