"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, RotateCcw, Building2, Flame } from "lucide-react";
import { useFeaturedProperties } from "@/hooks/useFeaturedProperties";
import { FeaturedPropertyCard } from "./FeaturedPropertyCard";
import { FeaturedSkeleton } from "./FeaturedSkeleton";

// Staggered entrance animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0] as const,
    },
  },
};

export function FeaturedProperties() {
  const { data: properties, isLoading, isError, error, refetch } = useFeaturedProperties();

  return (
    <section
      aria-labelledby="featured-properties-heading"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* Background Decorative Blur Orbs & Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle SVG Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating Glowing Blobs */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -25, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-10 -left-40 w-[450px] h-[450px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[90px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
        >
          {/* Header Title & Subtitle */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-[#2563EB] dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wide border border-blue-500/20 backdrop-blur-sm">
              <Flame className="w-4 h-4 fill-blue-500 text-blue-500" />
              <span>HAND-PICKED HOMES</span>
            </div>

            <h2
              id="featured-properties-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300"
            >
              Featured Properties
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
              Hand-picked premium rental homes recommended for you.
            </p>
          </div>

          {/* Top Right Action: View All Properties → */}
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-[#2563EB] dark:text-sky-400 border border-slate-200/80 dark:border-slate-800/80 font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Loading State */}
        {isLoading && <FeaturedSkeleton count={3} />}

        {/* Error State */}
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
              Failed to load featured properties
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {error?.message || "Could not fetch featured listings from the server. Please try again."}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] hover:from-blue-700 hover:to-sky-600 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Retry Connection
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && properties && properties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto my-8 p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl text-center space-y-4"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <Building2 className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              No Featured Properties
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Featured properties are currently being curated by our team. Check back soon!
            </p>
          </motion.div>
        )}

        {/* Cards Grid */}
        {!isLoading && !isError && properties && properties.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {properties.map((property) => (
              <motion.div key={property.id} variants={cardVariants} className="h-full">
                <FeaturedPropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
