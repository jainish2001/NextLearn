import { Suspense } from "react";
import coursesData from "@/data/courses";
import Link from "next/link";
import CourseDetails from "./CourseDetails";

// Generate static params for all courses
export async function generateStaticParams() {
  return coursesData.map((course) => ({
    slug: `${course.id}-${course.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`,
  }));
}

// Get course data from slug
function getCourseFromSlug(slug: string) {
  const id = parseInt(slug.split("-")[0]);
  return coursesData.find((course) => course.id === id);
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params to resolve it
  const course = getCourseFromSlug(slug);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Course Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The course you&#39;re looking for doesn&#39;t exist.
          </p>
          <Link href="/courses" className="text-primary hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <CourseDetails course={course} />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
