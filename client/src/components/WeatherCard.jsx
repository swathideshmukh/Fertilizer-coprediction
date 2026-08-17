import { useEffect, useState } from "react";
import axios from "axios";
import { FaCloudSun, FaDroplet } from "react-icons/fa6";

const SERVER_API_URL =
  import.meta.env.VITE_SERVER_API_URL ||
  "https://fertilizer-coprediction-3.onrender.com";

function WeatherCard({ location = "Mysore" }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `${SERVER_API_URL}/api/weather/${location}`
      );
      setWeather(response.data);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-3">
        <p className="label-eyebrow">{location}</p>
        <FaCloudSun size={14} className="text-[var(--wheat)]" />
      </div>

      {error && (
        <p className="text-[var(--ink-soft)] text-xs">
          Weather data unavailable.
        </p>
      )}

      {weather && (
        <div className="flex items-end justify-between">
          <p className="readout text-3xl font-medium text-[var(--ink)]">
            {Math.round(weather.main.temp)}°
          </p>
          <div className="text-right">
            <p className="text-xs text-[var(--ink-soft)]">
              {weather.weather[0].main}
            </p>
            <p className="flex items-center justify-end gap-1.5 readout text-xs text-[var(--slate)] mt-1">
              <FaDroplet size={9} />
              {weather.main.humidity}%
            </p>
          </div>
        </div>
      )}

      {!weather && !error && (
        <p className="text-[var(--ink-soft)] text-xs">Loading…</p>
      )}
    </div>
  );
}

export default WeatherCard;
