"use client"; // Ensures this component runs on the client side (required for motion animations)

import { motion } from "framer-motion"; // For entry animations

// Terms of Service page component
export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-16">
      {/* Animated container for fade-in and slide-up effect on mount */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Start transparent and slightly down
        animate={{ opacity: 1, y: 0 }} // Animate to full opacity and neutral Y
        transition={{ duration: 0.6 }}  // Animation duration
      >
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Terms of Service
        </h1>

        {/* Terms content sections */}
        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          
          {/* Section 1: Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using NextLearn, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          {/* Section 2: Use License */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily access the materials (courses, content, etc.) on NextLearn for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          {/* Section 3: User Account */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Account</h2>
            <p className="mb-4">
              To access certain features of NextLearn, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </section>

          {/* Section 4: Course Content */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Course Content</h2>
            <p className="mb-4">
              All course content provided on NextLearn is for educational purposes only. We reserve the right to modify, update, or remove any content at any time without notice.
            </p>
          </section>

          {/* Section 5: Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
            <p className="mb-4">
              The materials on NextLearn are provided on an &apos;as is&apos; basis. NextLearn makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>
          
        </div>
      </motion.div>
    </div>
  );
}
