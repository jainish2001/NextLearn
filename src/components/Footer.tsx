"use client";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="w-full py-8 px-6 md:px-12 bg-background border-t border-gray-200 dark:border-gray-800 mt-16"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-lg font-bold text-primary">&copy;{" "}2025 NextLearn</div>
        <div className="flex gap-6 text-sm">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
        <div className="flex gap-4 text-xl text-secondary">
          <a href="mailto:info@nextlearn.com" aria-label="Email"><FaEnvelope /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="GitHub"><FaGithub /></a>
        </div>
      </div>
    </motion.footer>
  );
} 
