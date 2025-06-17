// Importing required modules and components
import Link from "next/link"; // For navigation
import { motion } from "framer-motion"; // For animation
import Button from "@/components/Button"; // Reusable button component

// Main NotFound page component
export default function NotFound() {
  return (
    // Page section with vertical centering
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Animated container using Framer Motion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} // Start slightly below with opacity 0
        animate={{ opacity: 1, y: 0 }}  // Fade in and move up
        transition={{ duration: 0.6 }}  // Smooth transition
        className="max-w-xl"
      >
        {/* Big 404 heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-4">
          404
        </h1>

        {/* Description text */}
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        {/* Link to return to homepage */}
        <Link href="/">
          {/* Reusable styled button */}
          <Button 
            variant="secondary" 
            className="px-6 py-3 text-lg hover:scale-105 transition-transform"
          >
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
