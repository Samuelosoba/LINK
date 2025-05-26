import { useEffect, useState } from "react";
import { getUserLinks } from "../api/url";
import { useAuth } from "../store";
import { Copy, Trash2 } from "lucide-react";
import { Link } from "react-router";

export default function Links() {
  const { token } = useAuth();
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await getUserLinks(token);
        setLinks(res.data.links);
      } catch (err) {
        console.error("Error fetching links:", err);
      }
    };
    fetchLinks();
  }, [token]);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  
  const filteredLinks = links.filter((link) =>
    link.shortPath.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">🔗 Your Shortened Links</h2>

      <input
        type="text"
        placeholder="Search by short URL..."
        className="w-full max-w-md px-4 py-2 mb-6 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffc2]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredLinks.length === 0 ? (
        <p>No links found.</p>
      ) : (
        <div className="space-y-4">
          {filteredLinks.map((link) => (
            <div
              key={link._id}
              className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Original:</p>
                <a
                  href={link.originalUrl}
                  className="text-[#00ffc2] hover:underline break-words"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.originalUrl}
                </a>
                <p className="text-sm text-gray-400">Short URL:</p>
                <a
                  href={`${window.location.origin}/${link.shortPath}`}
                  className="text-[#00ffc2] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {window.location.origin}/{link.shortPath}
                </a>
              </div>

              <div className="mt-2 md:mt-0 flex items-center space-x-4">
                <span className="text-sm text-gray-400">
                  Clicks: {link.clicks}
                </span>
                <button
                  onClick={() =>
                    handleCopy(`${window.location.origin}/${link.shortPath}`)
                  }
                  title="Copy"
                >
                  <Copy className="w-5 h-5 text-[#00ffc2]" />
                </button>
                <button
                  onClick={() => console.log("Delete logic here")}
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>
              </div>
            </div>
          ))}
          {links.map((link) => (
            <Link
              key={link.shortPath}
              to={`/dashboard/analytics/${link.shortPath}`}
              className="text-blue-500 underline"
            >
              View Analytics
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
