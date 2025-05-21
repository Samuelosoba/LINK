import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Nav() {
  return (
    <motion.nav
      className="bg-black bg-opacity-70 backdrop-blur-md text-white py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#00ffc2]">
          🔗 LINK
        </Link>

        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-[#00ffc2] transition">
            Home
          </Link>
          <a href="#features" className="hover:text-[#00ffc2] transition">
            Features
          </a>
          <a href="#about" className="hover:text-[#00ffc2] transition">
            About
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
