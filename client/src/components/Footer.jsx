import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      className="bg-black text-white py-6 mt-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Link. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="hover:text-[#00ffc2] transition" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="hover:text-[#00ffc2] transition" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
