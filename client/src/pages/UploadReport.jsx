import { useState } from "react";
import axios from "axios";
import AppShell from "../components/AppShell";
import { FaUpload, FaFilePdf, FaCircleCheck, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";

const SERVER_API_URL =
  import.meta.env.VITE_SERVER_API_URL ||
  "https://fertilizer-coprediction-3.onrender.com";

const FEATURES = [
  "AI-based soil analysis",
  "OCR nutrient extraction",
  "Automatic fertilizer recommendations",
];

function UploadReport() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const uploadReport = async () => {
    setError("");
    setSuccess(false);

    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    const farmer = JSON.parse(localStorage.getItem("farmer") || "null");

    if (!farmer?._id) {
      setError("Your session looks invalid — please sign in again.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("farmerId", farmer._id);

      await axios.post(`${SERVER_API_URL}/api/reports/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setFile(null);
    } catch (err) {
      setError("Upload failed. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Upload Soil Report" subtitle="AI-powered OCR extraction and analysis">
      <div className="max-w-3xl">
        <div className="grid md:grid-cols-2 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-lg overflow-hidden shadow-[var(--shadow-card)]">
          {/* LEFT */}
          <div className="bg-[var(--moss-900)] p-8 text-white relative">
            <span className="absolute top-0 left-0 right-0 h-1 bg-[var(--wheat)]" />

            <p className="label-eyebrow text-[var(--wheat)] mb-3">
              How it works
            </p>
            <h2 className="font-display text-2xl leading-snug mb-4">
              From PDF to fertilizer plan in seconds
            </h2>
            <p className="text-[var(--moss-100)]/75 text-sm leading-6 mb-7">
              Upload a soil test report and the AI extracts nutrient levels
              automatically, then runs a full fertilizer analysis.
            </p>

            <div className="space-y-2.5">
              {FEATURES.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 bg-white/10 px-3.5 py-2.5 rounded-md text-sm"
                >
                  <FaCircleCheck className="text-[var(--wheat)] shrink-0" size={13} />
                  <p>{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-8 flex flex-col justify-center">
            <label className="border-2 border-dashed border-[var(--line-strong)] rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--moss-700)] hover:bg-[var(--moss-100)]/40 transition-colors">
              {file ? (
                <FaFilePdf size={34} className="text-[var(--slate)] mb-3" />
              ) : (
                <FaUpload size={34} className="text-[var(--ink-soft)] mb-3" />
              )}

              <p className="font-medium text-[var(--ink)] text-sm mb-1 text-center break-all px-2">
                {file ? file.name : "Choose PDF file"}
              </p>
              <p className="text-xs text-[var(--ink-soft)]">
                Drag and drop or click to browse
              </p>

              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  setSuccess(false);
                  setError("");
                  setFile(e.target.files[0]);
                }}
              />
            </label>

            {error && (
              <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-4 py-2.5 flex items-center gap-2">
                <FaXmark size={12} className="shrink-0" />
                {error}
              </p>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={uploadReport}
              disabled={loading}
              className="mt-5 bg-[var(--moss-900)] text-white py-3.5 rounded-md font-medium hover:bg-[var(--moss-700)] transition-colors disabled:opacity-60"
            >
              {loading ? "Analyzing soil report…" : "Upload & analyze"}
            </motion.button>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-[var(--moss-100)] text-[var(--moss-900)] p-3.5 rounded-md text-center text-sm font-medium flex items-center justify-center gap-2"
              >
                <FaCircleCheck size={13} />
                Soil report uploaded successfully
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default UploadReport;
