import { useEffect, useState } from "react";
import axios from "axios";
import { FaDroplet, FaWind } from "react-icons/fa6";

// TODO: confirm which deployed server URL is current — earlier logs in this
// project referenced both fertilizer-coprediction-2 and -3.onrender.com.
// Point this at whichever one is actually live for the Node/Express server.
const SERVER_API_URL =
  import.meta.env.VITE_SERVER_API_URL ||
  "https://fertilizer-coprediction-3.onrender.com";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `${SERVER_API_URL}/api/weather/Mysore`
      );
      setWeather(response.data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="bg-[var(--slate)] text-white rounded-lg p-7 relative overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-1 bg-[var(--wheat)]" />

      <p className="label-eyebrow text-white/60 mb-5">Weather Forecast</p>

      {error && (
        <p className="text-white/70 text-sm leading-6">
          Weather data unavailable right now.
        </p>
      )}

      {weather && (
        <>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="readout text-5xl font-medium leading-none">
                {Math.round(weather.main.temp)}°
              </h2>
              <p className="text-white/70 mt-2 text-sm">
                {weather.weather[0].main}
              </p>
            </div>

            <div className="text-right space-y-2">
              <p className="flex items-center justify-end gap-2 text-sm text-white/80">
                <FaDroplet size={12} />
                <span className="readout">{weather.main.humidity}%</span>
              </p>
              <p className="flex items-center justify-end gap-2 text-sm text-white/80">
                <FaWind size={12} />
                <span className="readout">{weather.wind.speed} km/h</span>
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white/10 p-4 rounded-md">
            <p className="label-eyebrow text-white/60 mb-2">
              Smart Farming Advice
            </p>
            <p className="text-sm leading-6 text-white/85">
              {weather.main.temp > 35
                ? "High temperature detected. Increase irrigation frequency."
                : weather.main.humidity > 80
                ? "High humidity detected. Monitor crops for fungal diseases."
                : weather.weather[0].main === "Rain"
                ? "Rainfall expected. Reduce irrigation to avoid waterlogging."
                : "Current weather conditions are favorable for crop growth."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
