"use client";

import React from "react";
import { Sparkles, Ban } from "lucide-react";

interface PropertyBadgeProps {
  variant: "featured" | "available" | "unavailable" | "category";
  label?: string;
  className?: string;
}

export function PropertyBadge({ variant, label, className = "" }: PropertyBadgeProps) {
  if (variant === "featured") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-sm ${className}`}
      >
        <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-pulse" />
        <span>Featured</span>
      </div>
    );
  }

  if (variant === "unavailable") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 backdrop-blur-md ${className}`}
      >
        <Ban className="w-3.5 h-3.5 text-red-500" />
        <span>Not Available</span>
      </div>
    );
  }

  if (variant === "available") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 backdrop-blur-md ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>Available</span>
      </div>
    );
  }

  // Category variant
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-white/50 dark:border-slate-700/50 backdrop-blur-md shadow-xs ${className}`}
    >
      {label || "Property"}
    </span>
  );
}
