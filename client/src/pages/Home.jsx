import { useState } from "react";
import { changeUrl } from "../api/url";
import { Copy, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortPath, setShortPath] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const response = await changeUrl({ originalUrl, shortPath });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-128px)] bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#00ffc2]">
          🔗 URL Shortener
        </h1>
        <p className="text-gray-300 mt-2 text-sm md:text-base">
          Create clean, customized, and shareable short URLs
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-xl bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl p-6 space-y-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="Enter the long URL..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffc2]"
          />
          <input
            type="text"
            placeholder="Custom short path (e.g. my-link)"
            value={shortPath}
            onChange={(e) => setShortPath(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffc2]"
          />
          <button
            type="submit"
            className="w-full bg-[#00ffc2] hover:bg-[#00e6b3] text-black font-semibold py-2 rounded transition duration-200"
          >
            🔧 Create Short URL
          </button>
        </form>

        <AnimatePresence>
          {shortUrl && (
            <motion.div
              key="shortUrl"
              className="bg-gray-800 p-4 rounded text-center flex flex-col items-center space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-sm text-gray-300">Your Short URL:</span>
              <div className="flex items-center gap-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00ffc2] break-all hover:underline"
                >
                  {shortUrl}
                </a>
                <button onClick={handleCopy} className="text-[#00ffc2]">
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              className="text-red-400 text-sm text-center"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
