// components/Analytics.jsx
import { useEffect, useState } from "react";
import { fetchAnalytics } from "../api/url";
import { useParams } from "react-router";
import { useAuth } from "../store";

const Analytics = () => {
  const { shortPath } = useParams(); // assumes route like /analytics/:shortPath
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();
  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const data = await fetchAnalytics(token, shortPath);
        console.log("data", data);

        setAnalytics(data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    getAnalytics();
  }, [shortPath, token]);
  console.log("anaa", analytics);
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-4">
        {" "}
        Analytics for: <span className="text-blue-600">{shortPath}</span>
      </h2>
      <div className="p-6  max-w-2xl mx-auto bg-black shadow-md rounded-xl">
        <p className=" mb-2">shortUrl:</p>

        <p className="mb-2">
          Original URL:{" "}
          <a
            href={analytics.originalUrl}
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            {analytics.originalUrl}
          </a>
        </p>
        <p className="mb-4">
          Total Clicks:{" "}
          <span className="font-semibold">{analytics.totalClicks}</span>
        </p>

        {analytics.clickDetails?.length > 0 ? (
          <div>
            <h3 className="font-semibold text-lg mb-2">Click Details</h3>
            <ul className="space-y-2">
              {analytics.clickDetails.map((click, idx) => (
                <li key={idx} className="border p-3 rounded bg-gray-50">
                  <p>
                    <strong>Time:</strong>{" "}
                    {new Date(click.timestamp).toLocaleString()}
                  </p>
                  <p>
                    <strong>IP:</strong> {click.ip || "N/A"}
                  </p>
                  <p>
                    <strong>User-Agent:</strong> {click.userAgent || "N/A"}
                  </p>
                  <p>
                    <strong>Referrer:</strong> {click.referrer || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No click details yet.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
