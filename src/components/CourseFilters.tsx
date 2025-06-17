"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "@/lib/motion";
import { useDebouncedCallback } from "use-debounce";

import Button from "@/components/Button";
import FilterSection from "@/components/FilterSection";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import coursesData from "@/data/courses";

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

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>(
    searchParams.get("levels")?.split(",") || []
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    levels: true,
  });

  const debouncedSetSearch = useDebouncedCallback((val: string) => {
    setSearch(val);
  }, 300);

  const handleCheckboxChange = (type: "category" | "level", value: string) => {
    if (type === "category") {
      setSelectedCategories((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setSelectedLevels((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  const toggleSection = (section: "categories" | "levels") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  const hasActiveFilters = useMemo(() => {
    return search || selectedCategories.length > 0 || selectedLevels.length > 0;
  }, [search, selectedCategories, selectedLevels]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedCategories.length) params.set("categories", selectedCategories.join(","));
    if (selectedLevels.length) params.set("levels", selectedLevels.join(","));

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.pushState({}, "", newUrl);

    onFilterChange({ search, categories: selectedCategories, levels: selectedLevels });
  }, [search, selectedCategories, selectedLevels, onFilterChange]);

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "unset";
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

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:block w-64 flex-shrink-0"
      >
        <div className="sticky top-8 bg-white/80 dark:bg-zinc-900/80 rounded-2xl p-6 space-y-8 max-h-[calc(100vh-4rem)] overflow-y-auto border border-gray-200 dark:border-zinc-800 shadow-xl">
          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-2 pl-10 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              defaultValue={search}
              onChange={(e) => debouncedSetSearch(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {hasActiveFilters && (
            <Button variant="secondary" className="w-full" onClick={handleClearFilters}>
              <XMarkIcon className="w-5 h-5 mr-2" />
              Clear Filters
            </Button>
          )}

          {/* Categories */}
          <FilterSection
            title="Categories"
            options={categories}
            selected={selectedCategories}
            expanded={expandedSections.categories}
            toggle={() => toggleSection("categories")}
            onChange={(val) => handleCheckboxChange("category", val)}
          />

          {/* Levels */}
          <FilterSection
            title="Levels"
            options={levels}
            selected={selectedLevels}
            expanded={expandedSections.levels}
            toggle={() => toggleSection("levels")}
            onChange={(val) => handleCheckboxChange("level", val)}
          />
        </div>
      </motion.aside>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-zinc-900 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full px-4 py-2 pl-10 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  defaultValue={search}
                  onChange={(e) => debouncedSetSearch(e.target.value)}
                />

                {hasActiveFilters && (
                  <Button variant="secondary" className="w-full" onClick={handleClearFilters}>
                    <XMarkIcon className="w-5 h-5 mr-2" />
                    Clear Filters
                  </Button>
                )}

                <FilterSection
                  title="Categories"
                  options={categories}
                  selected={selectedCategories}
                  expanded={expandedSections.categories}
                  toggle={() => toggleSection("categories")}
                  onChange={(val) => handleCheckboxChange("category", val)}
                />

                <FilterSection
                  title="Levels"
                  options={levels}
                  selected={selectedLevels}
                  expanded={expandedSections.levels}
                  toggle={() => toggleSection("levels")}
                  onChange={(val) => handleCheckboxChange("level", val)}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
