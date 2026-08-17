import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLeaf, FaSeedling, FaCloudSun } from "react-icons/fa";
import { motion } from "framer-motion";

const SERVER_API_URL =
  import.meta.env.VITE_SERVER_API_URL ||
  "https://fertilizer-coprediction-3.onrender.com";

const CROP_TYPES = ["Rice", "Paddy", "Wheat", "Sugarcane", "Cotton"];

const FIELDS = [
  { name: "name", type: "text", label: "Full name", placeholder: "e.g. Ramesh Gowda" },
  { name: "email", type: "email", label: "Email", placeholder: "you@example.com" },
  { name: "password", type: "password", label: "Password", placeholder: "••••••••", span: 2 },
  { name: "village", type: "text", label: "Village", placeholder: "Village name" },
  { name: "district", type: "text", label: "District", placeholder: "District name" },
  { name: "state", type: "text", label: "State", placeholder: "State name" },
  { name: "farmSize", type: "number", label: "Farm size (acres)", placeholder: "e.g. 5" },
];

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    village: "",
    district: "",
    state: "",
    farmSize: "",
    cropType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.cropType) {
      setError("Please select a crop type.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${SERVER_API_URL}/api/auth/register`, formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. That email may already be in use."
      );
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
            Start your
            <br />
            smart farming journey.
          </h2>

          <p className="text-[var(--moss-100)]/75 text-lg leading-8 max-w-md">
            Join the AI-powered agriculture platform that helps farmers
            optimize fertilizer, improve yield, and monitor soil health.
          </p>
        </div>

        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <FaSeedling size={17} />
            </div>
            <div>
              <h3 className="font-medium">Smart soil analysis</h3>
              <p className="text-[var(--moss-100)]/60 text-sm">
                AI-powered fertilizer optimization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <FaCloudSun size={17} />
            </div>
            <div>
              <h3 className="font-medium">Weather intelligence</h3>
              <p className="text-[var(--moss-100)]/60 text-sm">
                Real-time farming insights
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — FORM */}
      <div className="flex-1 flex items-center justify-center p-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl bg-[var(--paper)] border border-[var(--line)] rounded-lg p-9 shadow-[var(--shadow-card)]"
        >
          <div className="mb-7">
            <p className="label-eyebrow mb-2">Create account</p>
            <h2 className="font-display text-3xl text-[var(--moss-900)]">
              Register your farm
            </h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIELDS.map((f) => (
                <div key={f.name} className={f.span === 2 ? "md:col-span-2" : ""}>
                  <label className="label-eyebrow block mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    required
                    placeholder={f.placeholder}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 rounded-md border border-[var(--line)] bg-[var(--paper)] outline-none focus:border-[var(--moss-700)] transition-colors text-[var(--ink)] text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="label-eyebrow block mb-1.5">Crop type</label>
                <select
                  name="cropType"
                  required
                  value={formData.cropType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 rounded-md border border-[var(--line)] bg-[var(--paper)] outline-none focus:border-[var(--moss-700)] transition-colors text-[var(--ink)] text-sm"
                >
                  <option value="">Select crop type</option>
                  {CROP_TYPES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--moss-900)] text-white py-3.5 rounded-md font-medium hover:bg-[var(--moss-700)] transition-colors disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-center text-[var(--ink-soft)] text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--moss-700)] font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
