"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import coursesData from "@/data/courses";

// Extract unique values for filters
const categories = Array.from(new Set(coursesData.map((c) => c.category))).sort();
const levels = Array.from(new Set(coursesData.map((c) => c.level))).sort();

interface CourseFiltersProps {
  onFilterChange: (filters: {
    search: string;
    categories: string[];
    levels: string[];
  }) => void;
}

export default function CourseFilters({ onFilterChange }: CourseFiltersProps) {
  const searchParams = useSearchParams();
  
  // Initialize state from URL params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>(
    searchParams.get("levels")?.split(",") || []
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Add state for collapsible sections
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

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.pushState({}, "", newUrl);

    // Notify parent component of filter changes
    onFilterChange({
      search,
      categories: selectedCategories,
      levels: selectedLevels,
    });
  }, [search, selectedCategories, selectedLevels, onFilterChange]);

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      search !== "" ||
      selectedCategories.length > 0 ||
      selectedLevels.length > 0
    );
  }, [search, selectedCategories, selectedLevels]);

  // Toggle section expansion
  const toggleSection = (section: "categories" | "levels") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle filter changes
  const handleFilterChange = (type: string, value: string) => {
    if (type === "search") {
      setSearch(value);
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (type: "category" | "level", value: string) => {
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
    <>
      {/* Mobile Filter Toggle */}
      <Button
        variant="secondary"
        className="md:hidden flex items-center gap-2"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <FunnelIcon className="w-5 h-5" />
        Filters
      </Button>

      {/* Desktop Filters Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:block w-64 flex-shrink-0"
      >
        <div className="sticky top-8 bg-white/80 dark:bg-zinc-900/80 rounded-2xl p-6 space-y-8 max-h-[calc(100vh-4rem)] overflow-y-auto border border-gray-200 dark:border-zinc-800 shadow-xl">
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-2 pl-10 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/30 transition shadow-sm"
              value={search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="secondary"
              className="w-full flex items-center justify-center gap-2 mb-4"
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
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary cursor-pointer px-2 py-1 rounded-lg transition-colors duration-150 hover:bg-primary/10 dark:hover:bg-primary/20"
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
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {levels.map((lvl) => (
                  <label
                    key={lvl}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary cursor-pointer px-2 py-1 rounded-lg transition-colors duration-150 hover:bg-primary/10 dark:hover:bg-primary/20"
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
    </>
  );
}

/* Add this to the bottom of the file for custom scrollbar styles */
<style jsx global>{`
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%);
  border-radius: 8px;
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #818cf8 #f3f4f6;
}
`}</style> 