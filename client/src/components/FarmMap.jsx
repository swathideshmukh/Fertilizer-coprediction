import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  FaLocationDot,
  FaTemperatureHigh,
  FaDroplet,
  FaCloudRain,
} from "react-icons/fa6";

import "leaflet/dist/leaflet.css";

const WEATHER = [
  { icon: FaTemperatureHigh, label: "Temperature", value: "29°C" },
  { icon: FaDroplet, label: "Humidity", value: "68%" },
  { icon: FaCloudRain, label: "Rainfall", value: "42%" },
];

function FarmMap() {
  const position = [12.2958, 76.6394];

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg overflow-hidden shadow-[var(--shadow-card)]">
      <div className="grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="bg-[var(--moss-900)] p-8 text-white relative flex flex-col justify-center">
          <span className="absolute top-0 left-0 right-0 h-1 bg-[var(--wheat)]" />

          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-11 h-11 rounded-md bg-white/10 flex items-center justify-center">
              <FaLocationDot size={17} />
            </div>
            <div>
              <h1 className="font-display text-2xl leading-tight">
                Smart Farm Map
              </h1>
              <p className="label-eyebrow text-[var(--moss-100)]/60 mt-1">
                Live field tracking
              </p>
            </div>
          </div>

          <p className="text-[var(--moss-100)]/75 text-sm leading-6 max-w-md">
            AI-powered field monitoring with weather intelligence, climate
            analysis, and precision agriculture insights.
          </p>

          <div className="grid grid-cols-3 gap-3 mt-7">
            {WEATHER.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white/[0.06] border border-white/10 p-3.5 rounded-md"
              >
                <Icon size={15} className="mb-2.5 opacity-80" />
                <p className="label-eyebrow text-[var(--moss-100)]/60">
                  {label}
                </p>
                <p className="readout text-lg mt-1.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MAP */}
        <div className="h-[420px] relative">
          <MapContainer
            center={position}
            zoom={12}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Smart Agriculture Farm
                <br />
                Mysore, Karnataka
              </Popup>
            </Marker>
          </MapContainer>

          <div className="absolute bottom-4 left-4 bg-[var(--paper)]/95 backdrop-blur p-4 rounded-md shadow-[var(--shadow-card)] border border-[var(--line)]">
            <h2 className="font-display text-lg text-[var(--moss-900)]">
              Mysore Smart Farm
            </h2>
            <p className="text-[var(--ink-soft)] text-xs mt-1">
              Karnataka, India
            </p>
            <div className="flex gap-2 mt-3">
              <span className="bg-[var(--moss-100)] text-[var(--moss-700)] px-2.5 py-1 rounded text-xs font-medium">
                AI Active
              </span>
              <span className="bg-[var(--slate-100)] text-[var(--slate)] px-2.5 py-1 rounded text-xs font-medium">
                Live Tracking
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmMap;
