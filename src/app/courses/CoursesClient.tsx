"use client";

import coursesData from "@/data/courses";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { motion, AnimatePresence } from "@/lib/motion";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import NoResults from "@/components/NoResults";
import Link from "next/link";

const COURSES_PER_PAGE = 6;

const categories = Array.from(new Set(coursesData.map((c) => c.category))).sort();
const levels = Array.from(new Set(coursesData.map((c) => c.level))).sort();

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function CoursesClient() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>(
    searchParams.get("levels")?.split(",") || []
  );
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    levels: true,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (selectedLevels.length > 0) params.set("levels", selectedLevels.join(","));
    if (currentPage > 1) params.set("page", currentPage.toString());

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.pushState({}, "", newUrl);
  }, [search, selectedCategories, selectedLevels, currentPage]);

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      search !== "" ||
      selectedCategories.length > 0 ||
      selectedLevels.length > 0
    );
  }, [search, selectedCategories, selectedLevels]);

  // Filter courses
  const filteredCourses = useMemo(() => {
    const filtered = coursesData.filter((course) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesLevel && matchesSearch;
    });

    return filtered;
  }, [search, selectedCategories, selectedLevels]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    return filteredCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);
  }, [filteredCourses, currentPage]);

  // Generate pagination range
  const getPaginationRange = () => {
    const delta = 1; // Number of pages to show before and after current page
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  // Toggle section expansion
  const toggleSection = (section: "categories" | "levels") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle filter changes
  const handleFilterChange = (type: string, value: string) => {
    setCurrentPage(1);
    if (type === "search") {
      setSearch(value);
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (type: "category" | "level", value: string) => {
    setCurrentPage(1);
    if (type === "category") {
      setSelectedCategories((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else {
      setSelectedLevels((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedLevels([]);
    setCurrentPage(1);
  };

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 mt-8">
      {/* Header Section */}
      <motion.section {...fadeInUp} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">All Courses</h1>
          
          {/* Mobile Filter Toggle */}
          <Button
            variant="secondary"
            className="md:hidden flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FunnelIcon className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block w-64 flex-shrink-0"
        >
          <div className="sticky top-8 bg-gray-50 dark:bg-zinc-900 rounded-xl p-4 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full px-4 py-2 pl-10 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                value={search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleClearFilters}
              >
                <XMarkIcon className="w-5 h-5" />
                Clear Filters
              </Button>
            )}

            {/* Categories Filter */}
            <div>
              <button
                onClick={() => toggleSection("categories")}
                className="flex items-center justify-between w-full text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100"
              >
                <span>Categories</span>
                {expandedSections.categories ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </button>
              {expandedSections.categories && (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCheckboxChange("category", cat)}
                        className="w-4 h-4 rounded border-gray-300 dark:border-zinc-700 text-primary focus:ring-primary/30"
                      />
                      <span className="truncate">{cat}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Levels Filter */}
            <div>
              <button
                onClick={() => toggleSection("levels")}
                className="flex items-center justify-between w-full text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100"
              >
                <span>Levels</span>
                {expandedSections.levels ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </button>
              {expandedSections.levels && (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {levels.map((lvl) => (
                    <label
                      key={lvl}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(lvl)}
                        onChange={() => handleCheckboxChange("level", lvl)}
                        className="w-4 h-4 rounded border-gray-300 dark:border-zinc-700 text-primary focus:ring-primary/30"
                      />
                      <span className="truncate">{lvl}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.aside>

        {/* Mobile Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setIsFilterOpen(false)}
              />
              
              {/* Filter Panel */}
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-zinc-900 z-50 md:hidden overflow-y-auto"
              >
                <div className="p-4 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="w-full px-4 py-2 pl-10 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      value={search}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                    />
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <Button
                      variant="secondary"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleClearFilters}
                    >
                      <XMarkIcon className="w-5 h-5" />
                      Clear Filters
                    </Button>
                  )}

                  {/* Categories Filter */}
                  <div>
                    <button
                      onClick={() => toggleSection("categories")}
                      className="flex items-center justify-between w-full text-lg font-semibold mb-3"
                    >
                      <span>Categories</span>
                      {expandedSections.categories ? (
                        <ChevronUpIcon className="w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </button>
                    {expandedSections.categories && (
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <label
                            key={cat}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(cat)}
                              onChange={() => handleCheckboxChange("category", cat)}
                              className="w-4 h-4 rounded border-gray-300 dark:border-zinc-700 text-primary focus:ring-primary/30"
                            />
                            <span>{cat}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Levels Filter */}
                  <div>
                    <button
                      onClick={() => toggleSection("levels")}
                      className="flex items-center justify-between w-full text-lg font-semibold mb-3"
                    >
                      <span>Levels</span>
                      {expandedSections.levels ? (
                        <ChevronUpIcon className="w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </button>
                    {expandedSections.levels && (
                      <div className="space-y-2">
                        {levels.map((lvl) => (
                          <label
                            key={lvl}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedLevels.includes(lvl)}
                              onChange={() => handleCheckboxChange("level", lvl)}
                              className="w-4 h-4 rounded border-gray-300 dark:border-zinc-700 text-primary focus:ring-primary/30"
                            />
                            <span>{lvl}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Courses Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* No results */}
          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-500 py-12"
            >
              <NoResults 
                search={search} 
                hasFilters={selectedCategories.length > 0 || selectedLevels.length > 0} 
              />
            </motion.div>
          )}

          {/* Course cards */}
          {paginatedCourses.map((course, idx) => (
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

                <h3 className="text-xl font-bold mb-2 text-primary">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                  {course.description}
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-800 dark:text-gray-300 italic">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Level: {course.level} • Duration: {course.duration}
                  </p>
                </div>

                <Link href={`/courses/${course.id}-${course.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")}`}>
                  <Button
                    variant="primary"
                    className="w-full mt-auto hover:scale-105 transition-transform"
                  >
                    View More
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.section>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center gap-2 mt-8 flex-wrap"
        >
          {currentPage > 1 && (
            <Button
              variant="secondary"
              className="px-3 py-1"
              onClick={() => setCurrentPage(currentPage - 1)}
              aria-label="Previous Page"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>
          )}

          {getPaginationRange().map((page, index) => (
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "secondary"}
                className="px-4 py-1"
                onClick={() => setCurrentPage(Number(page))}
              >
                {page}
              </Button>
            )
          ))}

          {currentPage < totalPages && (
            <Button
              variant="secondary"
              className="px-3 py-1"
              onClick={() => setCurrentPage(currentPage + 1)}
              aria-label="Next Page"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}
