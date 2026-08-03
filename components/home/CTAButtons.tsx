"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlusCircle, ArrowRight } from "lucide-react";

export function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
      {/* Primary Button: List Your Property */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative group rounded-2xl overflow-hidden shadow-lg shadow-blue-600/30 dark:shadow-blue-500/20"
      >
        {/* Animated Gradient Glow Aura behind button */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-teal-500 to-sky-500 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-pulse" />

        <Link
          href="/dashboard/landlord/properties/create"
          className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base sm:text-lg rounded-2xl transition-all duration-300 text-center tracking-wide"
        >
          <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
          <span>List Your Property</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
        </Link>
      </motion.div>

      {/* Secondary Button: Learn More */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link
          href="/about"
          className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-800/80 text-slate-100 font-semibold text-base sm:text-lg rounded-2xl backdrop-blur-xl border border-white/20 dark:border-slate-700/60 shadow-md hover:shadow-lg transition-all duration-300 text-center tracking-wide w-full"
        >
          <span>Learn More</span>
        </Link>
      </motion.div>
    </div>
  );
}
