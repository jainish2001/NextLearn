"use client";

import { motion } from "@/lib/motion";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

// Footer component that appears at the bottom of all pages
export default function Footer() {
  return (
    <motion.footer
      // Fade-in animation on mount
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="w-full py-8 px-6 md:px-12 bg-background border-t border-gray-200 dark:border-gray-800 mt-16"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Copyright Text */}
        <div className="text-lg font-bold text-primary">
          &copy;{" "}{new Date().getFullYear()} NextLearn
        </div>

        {/* Legal Links */}
        <div className="flex gap-6 text-sm">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>

        {/* Social & Contact Icons */}
        <div className="flex gap-4 text-xl text-secondary">
          <a href="mailto:jainishjain2001@gmail.com" className="hover:text-primary transition-colors" aria-label="Email">
            <FaEnvelope />
          </a>
          <a href="https://www.linkedin.com/in/jainish2001/" className="hover:text-primary transition-colors" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/jainish2001" className="hover:text-primary transition-colors"  aria-label="GitHub">
            <FaGithub />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
