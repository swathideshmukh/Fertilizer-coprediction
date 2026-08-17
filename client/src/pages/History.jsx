import { useEffect, useState } from "react";
import axios from "axios";
import AppShell from "../components/AppShell";
import { FaFilePdf, FaDownload, FaEye, FaCircleCheck } from "react-icons/fa6";

const SERVER_API_URL =
  import.meta.env.VITE_SERVER_API_URL ||
  "https://fertilizer-coprediction-3.onrender.com";

function History() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const farmer = JSON.parse(localStorage.getItem("farmer") || "null");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/api/reports`);

      const filteredReports = response.data.filter(
        (report) => report.farmerId === farmer?._id
      );

      setReports(filteredReports);
    } catch (error) {
      console.log("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      title="Upload History"
      subtitle="View all uploaded soil analysis reports"
    >
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 h-56 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 shadow-[var(--shadow-card)] hover:border-[var(--line-strong)] transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-display text-lg text-[var(--moss-900)]">
                    Soil Report
                  </h2>
                  <p className="text-[var(--ink-soft)] text-sm mt-1">
                    {report.reportName}
                  </p>
                </div>

                <div className="bg-[var(--moss-100)] text-[var(--moss-700)] px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5">
                  <FaFilePdf size={10} />
                  PDF
                </div>
              </div>

              <p className="label-eyebrow mt-4 mb-1">Uploaded on</p>
              <p className="readout text-sm text-[var(--ink)]">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-[var(--moss-100)] p-3 rounded-md">
                  <p className="label-eyebrow mb-1">Recommended Dose</p>
                  <p className="readout text-lg text-[var(--moss-900)]">
                    {report.recommendedNitrogenDose}
                  </p>
                </div>

                <div className="bg-[var(--slate-100)] p-3 rounded-md">
                  <p className="label-eyebrow mb-1">Moisture</p>
                  <p className="readout text-lg text-[var(--slate)]">
                    {report.moisture}%
                  </p>
                </div>
              </div>

              {report.recommendations?.length > 0 && (
                <div className="bg-[var(--canvas)] p-4 rounded-md mt-4">
                  <p className="label-eyebrow mb-2.5">AI Recommendation</p>
                  <div className="space-y-2">
                    {report.recommendations.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaCircleCheck
                          size={12}
                          className="text-[var(--moss-700)] mt-0.5 shrink-0"
                        />
                        <p className="text-sm text-[var(--ink)] leading-5">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-5">
                <a
                  href={`${SERVER_API_URL}/${report.generatedReport}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[var(--moss-900)] text-white text-center py-2.5 rounded-md text-sm font-medium hover:bg-[var(--moss-700)] transition-colors flex items-center justify-center gap-2"
                >
                  <FaEye size={12} />
                  View PDF
                </a>

                <a
                  href={`${SERVER_API_URL}/${report.generatedReport}`}
                  download
                  className="flex-1 bg-[var(--canvas)] border border-[var(--line)] text-[var(--ink)] text-center py-2.5 rounded-md text-sm font-medium hover:border-[var(--line-strong)] transition-colors flex items-center justify-center gap-2"
                >
                  <FaDownload size={12} />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && reports.length === 0 && (
        <div className="bg-[var(--paper)] border border-dashed border-[var(--line-strong)] rounded-lg p-12 text-center">
          <h1 className="font-display text-xl text-[var(--moss-900)]">
            No reports uploaded yet
          </h1>
          <p className="text-[var(--ink-soft)] text-sm mt-2">
            Upload your first soil report to begin AI analysis.
          </p>
        </div>
      )}
    </AppShell>
  );
}

export default History;
