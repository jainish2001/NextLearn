'use client';

import { motion } from "@/lib/motion";
import Button from "@/components/Button";
import Image from "next/image";
import { Course } from "@/data/courses";

interface CourseDetailsProps {
  course: Course;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Image */}
        <div className="relative h-[400px] rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Course Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {course.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {course.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {course.category}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {course.level}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {course.duration}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {course.instructor}
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Button variant="primary" className="w-full">
              Enroll Now
            </Button>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            <strong>This comprehensive course</strong> is designed to take you from{" "}
            <em>beginner to professional</em> in{" "}
            <strong>{course.category.toLowerCase()}</strong>. <br />You&apos;ll gain practical
            experience through real-world projects and hands-on activities.
          </p>
          <br />
          <h3><strong>What You&apos;ll Learn</strong></h3>
          <ul>
            <li className="list-disc ml-5"><strong>Core fundamentals</strong> of {course.category}</li>
            <li className="list-disc ml-5"><strong>Project-based learning</strong> with real-world examples</li>
            <li className="list-disc ml-5">Best practices and industry <em>standards</em></li>
            <li className="list-disc ml-5">Hands-on experience with practical <strong>exercises</strong></li>
            <li className="list-disc ml-5">Development of a <em>professional portfolio</em></li>
          </ul>
          <br />
          <h3><strong>Course Structure</strong></h3>
          <p>
            Structured across <strong>{course.duration}</strong> of focused learning,
            this course guides you through a weekly progression from foundational concepts
            to advanced techniques in{" "}
            <strong>{course.category.toLowerCase()}</strong>.
          </p>
          <ul>
            <li className="list-disc ml-5"><strong>Week-by-week learning path</strong></li>
            <li className="list-disc ml-5">Interactive assignments and challenges</li>
            <li className="list-disc ml-5">Community and instructor feedback</li>
          </ul>
          <br />
          <h3><strong>Prerequisites</strong></h3>
          <p>
            This is a <strong>{course.level}</strong> level course, intended for{" "}
            {course.level === "Beginner"
              ? "those new to the field."
              : course.level === "Intermediate"
              ? "individuals with basic prior knowledge."
              : "experienced professionals looking to refine their skills."}
          </p>
          {course.level !== "Beginner" && (
            <p><em>Some familiarity with core concepts is recommended.</em></p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
