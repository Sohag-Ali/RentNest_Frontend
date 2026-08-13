"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

export function FloatingIncomeCard() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Upper Card 1: Monthly Income (Top Left) */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-6 -left-3 sm:-left-6 pointer-events-auto flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-2xl shadow-blue-500/10"
      >
        <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sky-400 font-black text-base shrink-0">
          ৳
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white leading-tight">Monthly Income</p>
          <div className="mt-0.5 inline-block px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-black text-[10px] font-mono">
            +৳35,000/mo Avg.
          </div>
        </div>
      </motion.div>

      {/* Upper Card 2: Verified Listing (Top Right) */}
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute -top-6 -right-3 sm:-right-6 pointer-events-auto flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-2xl shadow-teal-500/10"
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white leading-tight">Verified Listing</p>
          <p className="text-[10px] text-slate-300 font-medium mt-0.5">100% Quality Checked</p>
        </div>
      </motion.div>

      {/* Floating Card 3: Trusted Platform (Middle Right) */}
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 pointer-events-auto flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-2xl shadow-amber-500/10"
      >
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
          <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white leading-tight">Trusted Platform</p>
          <div className="mt-0.5 inline-block px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-[10px]">
            4.9 / 5 Host Rating
          </div>
        </div>
      </motion.div>
    </div>
  );
}

