import { motion } from "framer-motion";

interface NoResultsProps {
  search?: string;
  hasFilters?: boolean;
}

export default function NoResults({ search = "", hasFilters = false }: NoResultsProps) {
  if (!search && !hasFilters) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No courses available right now
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please check back later for new courses.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No courses found
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {hasFilters && !search
          ? "We couldn't find any courses matching the selected filters."
          : `We couldn't find any courses matching "${search}"`}
      </p>
    </div>
  );
}
