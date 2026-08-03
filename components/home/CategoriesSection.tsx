"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RotateCcw, Building, Sparkles } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { CategoryCard } from "./CategoryCard";
import { CategorySkeleton } from "./CategorySkeleton";

// Framer motion container stagger animation variant
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0] as const,
    },
  },
};

export function CategoriesSection() {
  const { data: categories, isLoading, isError, error, refetch } = useCategories();

  // Identify top category with highest property count > 0 for Most Popular badge
  const topCategoryId = useMemo(() => {
    if (!categories || categories.length === 0) return null;
    const sorted = [...categories]
      .filter((cat) => cat.propertiesCount > 0)
      .sort((a, b) => b.propertiesCount - a.propertiesCount);
    return sorted.length > 0 ? sorted[0].id : null;
  }, [categories]);

  return (
    <section
      aria-labelledby="categories-heading"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* Background Decorative Blur Circles & Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle SVG Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating Glowing Orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 w-[450px] h-[450px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[90px]"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-24 left-1/3 w-[350px] h-[350px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[80px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-[#2563EB] dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wide border border-blue-500/20 shadow-xs backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-sky-400" />
            <span>CATEGORIES</span>
          </div>

          {/* Main Title */}
          <h2
            id="categories-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300"
          >
            Browse by Property Type
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Explore homes, apartments, villas, offices and more based on your lifestyle.
          </p>
        </motion.div>

        {/* Content Body: Loading, Error, Empty, or Categories Grid */}
        {isLoading && <CategorySkeleton count={8} />}

        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto my-8 p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-red-200/80 dark:border-red-900/50 backdrop-blur-xl shadow-xl text-center space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Failed to load categories
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {error?.message || "Could not fetch categories from server. Please check your network connection."}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] hover:from-blue-700 hover:to-sky-600 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        )}

        {!isLoading && !isError && categories && categories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto my-8 p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl text-center space-y-4"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <Building className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              No Categories Available
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We are currently updating our property categories. Please check back shortly for new listings.
            </p>
          </motion.div>
        )}

        {!isLoading && !isError && categories && categories.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <CategoryCard
                  category={category}
                  isTopCategory={category.id === topCategoryId}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
