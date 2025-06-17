"use client"; // Marks the component as client-rendered for React interactivity

import { motion } from "@/lib/motion"; // For animations
import Button from "@/components/Button"; // Reusable button component
import Card from "@/components/Card"; // Reusable card UI component
import features from "@/data/features"; // Static features data
import testimonials from "@/data/testimonials"; // Static testimonials data
import Image from "next/image"; // Optimized image handling
import React from "react";

// Heroicons (solid set)
import {
  AcademicCapIcon,
  DevicePhoneMobileIcon,
  CheckBadgeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import { useRouter } from "next/navigation"; // Client-side navigation

// Vercel analytics integrations
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Icon mapping for dynamic rendering
const icons = {
  AcademicCapIcon,
  DevicePhoneMobileIcon,
  CheckBadgeIcon,
  UserGroupIcon,
};

// Simple fade animation config
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

function TestimonialCard({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
  const [imgError, setImgError] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="items-center bg-white/80 dark:bg-zinc-900/80 hover:scale-105 transition-transform">
        {imgError ? (
          <Image
            src="/default-avatar.png"
            alt={t.name}
            width={64}
            height={64}
            className="rounded-full mb-2 object-cover"
          />
        ) : (
          <Image
            src={t.avatar}
            alt={t.name}
            width={64}
            height={64}
            className="rounded-full mb-2 object-cover"
            onError={() => setImgError(true)}
          />
        )}
        <p className="italic text-gray-700 dark:text-gray-200 mb-2">
          &quot;{t.text}&quot;
        </p>
        <span className="font-semibold text-primary">{t.name}</span>
      </Card>
    </motion.div>
  );
}

// Home page component
export default function Home() {
  const router = useRouter();

  // Scroll to Features section
  const handleGetStarted = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-24">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] pt-12 pb-20 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Unlock Your Potential with <span className="underline decoration-accent">NextLearn</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover top courses, learn from experts, and join a thriving community. Your journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              className="text-lg px-8 py-3 shadow-lg hover:scale-105 transition-transform"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </motion.div>

        {/* Background gradient effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 blur-2xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4">
        <motion.h2
          {...fadeInUp}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Why Choose Us?
        </motion.h2>

        {/* Responsive grid of features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon as keyof typeof icons]; // Dynamically get icon component
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="items-center hover:scale-105 transition-transform">
                  <div className="bg-primary/10 text-primary rounded-full p-4 mb-3">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/5 py-16 px-4">
        <motion.h2
          {...fadeInUp}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          What Our Learners Say
        </motion.h2>

        {/* Grid layout for testimonials */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.name} t={t} delay={index * 0.1} />
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <motion.div
          {...fadeInUp}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start learning?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of learners and boost your skills with our expertly crafted courses.
          </p>
          <Button 
            variant="secondary" 
            className="text-lg px-8 py-3 shadow-lg hover:scale-105 transition-transform"
            onClick={() => router.push("/courses")} // Navigate to /courses page
          >
            Browse Courses
          </Button>
        </motion.div>
      </section>

      {/* Analytics and Performance Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
