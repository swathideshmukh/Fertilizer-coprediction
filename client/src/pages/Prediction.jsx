import { useState } from "react";
import axios from "axios";
import AppShell from "../components/AppShell";
import { FaCircleCheck } from "react-icons/fa6";

const ML_API_URL =
  import.meta.env.VITE_ML_API_URL ||
  "https://fertilizer-coprediction-1.onrender.com";

const SOIL_TYPES = ["Sandy", "Loamy", "Black", "Red", "Clayey"];
const CROP_TYPES = ["Wheat", "Rice", "Maize", "Sugarcane", "Cotton"];

const NUMERIC_FIELDS = [
  { name: "temperature", label: "Temperature (°C)" },
  { name: "humidity", label: "Humidity (%)" },
  { name: "moisture", label: "Moisture (%)" },
  { name: "nitrogen", label: "Nitrogen" },
  { name: "potassium", label: "Potassium" },
  { name: "phosphorous", label: "Phosphorous" },
];

function Prediction() {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    soilType: "Sandy",
    cropType: "Wheat",
    nitrogen: "",
    potassium: "",
    phosphorous: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        moisture: Number(formData.moisture),
        nitrogen: Number(formData.nitrogen),
        potassium: Number(formData.potassium),
        phosphorous: Number(formData.phosphorous),
      };

      const response = await axios.post(`${ML_API_URL}/predict`, payload);

      if (response.data?.error) {
        setError(response.data.error);
        setResult(null);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      setError("Prediction failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      title="AI Fertilizer Prediction"
      subtitle="Predict optimal nitrogen dosage using AI models"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORM */}
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-7 shadow-[var(--shadow-card)] h-fit">
          <form onSubmit={handlePredict} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {NUMERIC_FIELDS.map((f) => (
                <div key={f.name}>
                  <label className="label-eyebrow block mb-1.5">{f.label}</label>
                  <input
                    type="number"
                    step="any"
                    name={f.name}
                    required
                    onChange={handleChange}
                    className="w-full border border-[var(--line)] px-3 py-2.5 rounded-md text-sm outline-none focus:border-[var(--moss-700)] transition-colors"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-eyebrow block mb-1.5">Soil type</label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  className="w-full border border-[var(--line)] px-3 py-2.5 rounded-md text-sm outline-none focus:border-[var(--moss-700)] transition-colors"
                >
                  {SOIL_TYPES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-eyebrow block mb-1.5">Crop type</label>
                <select
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleChange}
                  className="w-full border border-[var(--line)] px-3 py-2.5 rounded-md text-sm outline-none focus:border-[var(--moss-700)] transition-colors"
                >
                  {CROP_TYPES.map((c) => (
                    <option key={c}>{c}</option>
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
              {loading ? "Predicting…" : "Predict nitrogen dosage"}
            </button>
          </form>
        </div>

        {/* RESULT */}
        <div className="space-y-5">
          {!result && !loading && (
            <div className="bg-[var(--paper)] border border-dashed border-[var(--line-strong)] rounded-lg p-10 text-center text-[var(--ink-soft)] text-sm">
              Fill in the soil readings and run a prediction to see results
              here.
            </div>
          )}

          {result && (
            <>
              <div className="bg-[var(--moss-900)] text-white p-7 rounded-lg relative overflow-hidden">
                <span className="absolute top-0 left-0 right-0 h-1 bg-[var(--wheat)]" />
                <p className="label-eyebrow text-[var(--wheat)] mb-3">
                  Recommended Nitrogen Dosage
                </p>
                <p className="readout text-5xl font-medium">
                  {result.recommended_nitrogen_dose}
                  <span className="text-xl ml-2 opacity-70">kg/ha</span>
                </p>
              </div>

              <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 shadow-[var(--shadow-card)]">
                <p className="label-eyebrow mb-4">Model Comparison</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-[var(--ink)]">SVR Prediction</span>
                    <span className="readout font-medium">{result.svr_prediction}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-[var(--ink)]">Neural Network Prediction</span>
                    <span className="readout font-medium">{result.nn_prediction}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 shadow-[var(--shadow-card)]">
                <p className="label-eyebrow mb-4">AI Recommendations</p>
                <div className="space-y-2.5">
                  {(result.recommendations || []).map((rec, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <FaCircleCheck size={13} className="text-[var(--moss-700)] mt-0.5 shrink-0" />
                      <p className="text-sm text-[var(--ink)] leading-6">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default Prediction;
