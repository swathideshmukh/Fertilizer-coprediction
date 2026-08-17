import { useEffect, useState } from "react";
import axios from "axios";
import AppShell from "../components/AppShell";
import { FaUsers, FaFileLines, FaBrain } from "react-icons/fa6";

const SERVER_API_URL =
  import.meta.env.VITE_SERVER_API_URL ||
  "https://fertilizer-coprediction-3.onrender.com";

function AdminDashboard() {
  const [farmers, setFarmers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [farmersResponse, reportsResponse] = await Promise.all([
        axios.get(`${SERVER_API_URL}/api/auth/farmers`),
        axios.get(`${SERVER_API_URL}/api/reports`),
      ]);

      setFarmers(farmersResponse.data);
      setReports(reportsResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      title="Admin Dashboard"
      subtitle="Monitor farmers, reports, and AI analytics"
    >
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 pl-7 overflow-hidden shadow-[var(--shadow-card)]">
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--moss-700)]" />
          <div className="flex items-start justify-between">
            <p className="label-eyebrow">Total Farmers</p>
            <FaUsers className="text-[var(--moss-700)] opacity-80" size={15} />
          </div>
          <p className="readout text-3xl font-medium text-[var(--ink)] mt-3">
            {farmers.length}
          </p>
        </div>

        <div className="relative bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 pl-7 overflow-hidden shadow-[var(--shadow-card)]">
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--slate)]" />
          <div className="flex items-start justify-between">
            <p className="label-eyebrow">Uploaded Reports</p>
            <FaFileLines className="text-[var(--slate)] opacity-80" size={15} />
          </div>
          <p className="readout text-3xl font-medium text-[var(--ink)] mt-3">
            {reports.length}
          </p>
        </div>

        <div className="relative bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 pl-7 overflow-hidden shadow-[var(--shadow-card)]">
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--wheat)]" />
          <div className="flex items-start justify-between">
            <p className="label-eyebrow">AI Predictions</p>
            <FaBrain className="text-[var(--wheat)] opacity-80" size={15} />
          </div>
          <p className="readout text-3xl font-medium text-[var(--ink)] mt-3">
            {reports.length}
          </p>
        </div>
      </div>

      {/* FARMERS TABLE */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 shadow-[var(--shadow-card)] mb-6">
        <p className="label-eyebrow mb-4">Farmers</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th className="text-left py-2.5 label-eyebrow font-normal">Name</th>
                <th className="text-left py-2.5 label-eyebrow font-normal">District</th>
                <th className="text-left py-2.5 label-eyebrow font-normal">Crop Type</th>
                <th className="text-left py-2.5 label-eyebrow font-normal">Farm Size</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer._id} className="border-b border-[var(--line)] last:border-0">
                  <td className="py-3 text-[var(--ink)]">{farmer.name}</td>
                  <td className="py-3 text-[var(--ink-soft)]">{farmer.district}</td>
                  <td className="py-3 text-[var(--ink-soft)]">{farmer.cropType}</td>
                  <td className="readout py-3 text-[var(--ink)]">{farmer.farmSize} ac</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && farmers.length === 0 && (
            <p className="text-center text-[var(--ink-soft)] text-sm py-8">
              No farmers registered yet.
            </p>
          )}
        </div>
      </div>

      {/* REPORTS */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 shadow-[var(--shadow-card)]">
        <p className="label-eyebrow mb-4">AI Report Monitoring</p>

        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report._id}
              className="border border-[var(--line)] p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <h2 className="font-medium text-[var(--ink)] text-sm">
                  {report.reportName}
                </h2>
                <p className="text-[var(--ink-soft)] text-xs mt-1">
                  Recommended dose:{" "}
                  <span className="readout">{report.recommendedNitrogenDose}</span>
                </p>
              </div>

              <div className="bg-[var(--moss-100)] text-[var(--moss-700)] px-3 py-1.5 rounded text-xs font-medium">
                AI Processed
              </div>
            </div>
          ))}

          {!loading && reports.length === 0 && (
            <p className="text-center text-[var(--ink-soft)] text-sm py-8">
              No reports uploaded yet.
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default AdminDashboard;
