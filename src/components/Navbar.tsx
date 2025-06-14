"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex items-center justify-between py-4 px-6 md:px-12 bg-background/80 backdrop-blur-lg shadow-sm fixed top-0 left-0 z-50"
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
        {/* Replace with an image if you have a logo */}
        <span>NextLearn</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-base font-medium items-center">
        <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
        <Link href="/courses" className="hover:text-secondary transition-colors">Courses</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
} 