"use client";

import coursesData from "@/data/courses";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const categories = [
  "All Categories",
  ...Array.from(new Set(coursesData.map((c) => c.category))),
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory =
        category === "All Categories" || course.category === category;
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-12 mt-16">
      {/* Filter/Search */}
      <motion.section
        {...fadeInUp}
        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold">All Courses</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-2 pl-10 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <select
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </motion.section>

      {/* Courses Grid */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center text-gray-500 py-12"
          >
            No courses found matching your criteria.
          </motion.div>
        )}
        {filteredCourses.map((course, idx) => (
          <motion.div
            key={course.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <Card className="items-stretch h-full hover:scale-105 transition-transform">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="rounded-xl object-cover"
                  placeholder="blur"
                  blurDataURL="/next.svg"
                  priority={idx < 2}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{course.description}</p>
              <Button variant="primary" className="w-full mt-auto hover:scale-105 transition-transform">View More</Button>
            </Card>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
} 