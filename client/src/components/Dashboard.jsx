import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router";
import { useAuth } from "../store";
import { getUserStat } from "../api/auth";
import Spinner from "./Spinner";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      // no token? redirect to login
      navigate("/auth/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await getUserStat(token);
        console.log(res);

        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        if (error.response?.status === 401) {
          logout();
          navigate("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token, navigate, logout]);
  console.log(stats);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#00ffc2] to-[#008f6b] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-black  backdrop-blur-md border-[#008f6b] p-6 flex flex-col">
        <h2 className="text-3xl font-bold mb-8">My Dashboard</h2>
        <nav className="flex flex-col space-y-4 text-lg">
          <a
            href="#"
            className="hover:text-[#00b38f] transition-colors duration-300"
          >
            Home
          </a>
          <Link
            to="/dashboard/user-links"
            className="hover:text-[#00b38f] transition-colors duration-300"
          >
            Link
          </Link>
          <Link
            to="/dashboard/analytics/:shortPath"
            className="hover:text-[#00b38f] transition-colors duration-300"
          >
            Analytics
          </Link>
          <a
            href="#"
            className="hover:text-[#00b38f] transition-colors duration-300"
          >
            Settings
          </a>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-[#00ffc2] text-black font-semibold py-2 rounded-lg hover:bg-[#00b38f] transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-6"
        >
          Welcome back,{" "}
          <span className="text-[#00ffc2]">{user?.username || "User"}</span>!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Stats cards */}
          <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Total Links</h3>
            <p className="text-4xl font-bold">{stats?.totalLinks ?? 0}</p>
          </div>

          <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Clicks</h3>
            <p className="text-4xl font-bold">{stats?.totalClicks ?? 0}</p>
          </div>

          <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Active Links</h3>
            <p className="text-4xl font-bold">{stats?.activeLinks ?? 0}</p>
          </div>
        </motion.div>
        <Outlet />
      </main>
    </div>
  );
}
