import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLeaf, FaRobot, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const SERVER_API_URL =
  import.meta.env.VITE_SERVER_API_URL ||
  "https://fertilizer-coprediction-3.onrender.com";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${SERVER_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("farmer", JSON.stringify(res.data.farmer));

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--canvas)]">
      {/* LEFT — EDITORIAL PANEL */}
      <div className="hidden lg:flex w-1/2 bg-[var(--moss-900)] p-16 text-white flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--wheat)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-md bg-[var(--wheat)] flex items-center justify-center text-[var(--moss-900)]">
              <FaLeaf size={17} />
            </div>
            <div>
              <h1 className="font-display text-xl leading-none">Smart Agro</h1>
              <p className="label-eyebrow text-[var(--moss-100)]/60 mt-1">
                Field Console
              </p>
            </div>
          </div>

          <h2 className="font-display text-5xl leading-[1.1] mb-7">
            Precision farming,
            <br />
            read like a report.
          </h2>

          <p className="text-[var(--moss-100)]/75 text-lg leading-8 max-w-md">
            Track soil health, optimize fertilizer dosage, and forecast
            yield — with every reading logged like a field instrument.
          </p>
        </div>

        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <FaRobot size={17} />
            </div>
            <div>
              <h3 className="font-medium">AI Farming Assistant</h3>
              <p className="text-[var(--moss-100)]/60 text-sm">
                Smart recommendations for farmers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <FaChartLine size={17} />
            </div>
            <div>
              <h3 className="font-medium">Yield Prediction</h3>
              <p className="text-[var(--moss-100)]/60 text-sm">
                ML-powered fertilizer optimization
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — FORM */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-[var(--paper)] border border-[var(--line)] rounded-lg p-10 shadow-[var(--shadow-card)]"
        >
          <div className="mb-9">
            <p className="label-eyebrow mb-2">Sign in</p>
            <h2 className="font-display text-3xl text-[var(--moss-900)]">
              Welcome back
            </h2>
            <p className="text-[var(--ink-soft)] mt-2 text-sm">
              Continue your smart farming journey
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label-eyebrow block mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-md border border-[var(--line)] bg-[var(--paper)] outline-none focus:border-[var(--moss-700)] transition-colors text-[var(--ink)]"
              />
            </div>

            <div>
              <label className="label-eyebrow block mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-md border border-[var(--line)] bg-[var(--paper)] outline-none focus:border-[var(--moss-700)] transition-colors text-[var(--ink)]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--moss-900)] text-white py-3.5 rounded-md font-medium hover:bg-[var(--moss-700)] transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-[var(--ink-soft)] text-sm mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-[var(--moss-700)] font-medium">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
