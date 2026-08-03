"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, DollarSign, Star } from "lucide-react";

export function FloatingIncomeCard() {
  return (
    <div className="relative w-full max-w-md mx-auto pointer-events-none">
      {/* Floating Card 1: Verified Listing (Top Right) */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-12 -right-2 sm:-right-6 z-20 pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
          <Home className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            🏠 Verified Listing
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            100% Quality Checked
          </p>
        </div>
      </motion.div>

      {/* Floating Card 2: Monthly Income (Middle Left) */}
      <motion.div
        animate={{
          y: [0, 12, 0],
          x: [0, -6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -top-10 -left-9 sm:-left-10 z-20 pointer-events-auto flex items-center gap-3 px-4.5 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-[#2563EB] dark:text-sky-400 font-bold shrink-0">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            💰 Monthly Income
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            +$2,850/mo Avg.
          </p>
        </div>
      </motion.div>

      {/* Floating Card 3: Trusted Platform (Bottom Right) */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          x: [0, 4, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-10 -right-2 sm:-right-4 z-20 pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold shrink-0">
          <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            ⭐ Trusted Platform
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            4.9/5 Host Rating
          </p>
        </div>
      </motion.div>
    </div>
  );
}
