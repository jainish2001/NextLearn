"use client"; // Enables client-side rendering and interactivity

import { motion } from "framer-motion"; // Used for entry animations

// Privacy Policy page component
export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-16">
      {/* Animate the container on page load */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}  // Start faded and shifted down
        animate={{ opacity: 1, y: 0 }}   // Animate to fully visible and in place
        transition={{ duration: 0.6 }}   // Duration of animation
      >
        {/* Page title */}
        <h1 className="text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>

        {/* Content container with vertical spacing between sections */}
        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          
          {/* Section 1: Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including but not limited to your name, email address, and any other information you choose to provide when creating an account or using our services.
            </p>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your learning experience.
            </p>
          </section>

          {/* Section 3: Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We do not share your personal information with third parties except as described in this privacy policy. We may share your information with service providers who assist us in operating our website and conducting our business.
            </p>
          </section>

          {/* Section 4: Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
          </section>

          {/* Section 5: Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="mb-4">
              You have the right to access, correct, or delete your personal information. You can also object to the processing of your personal information or request that we restrict the processing of your personal information.
            </p>
          </section>
          
        </div>
      </motion.div>
    </div>
  );
}
