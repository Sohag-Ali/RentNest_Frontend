"use client";

import React from "react";

interface CategorySkeletonProps {
  count?: number;
}

export function CategorySkeleton({ count = 8 }: CategorySkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading categories"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm animate-pulse flex flex-col justify-between h-[200px]"
        >
          {/* Top Badge & Glow Placeholder */}
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80" />
            <div className="h-6 w-20 rounded-full bg-slate-200/80 dark:bg-slate-800/80" />
          </div>

          {/* Title & Subtitle / Count Skeleton */}
          <div className="space-y-2.5 mt-4">
            <div className="h-6 w-2/3 rounded-lg bg-slate-200/80 dark:bg-slate-800/80" />
            <div className="h-4 w-1/2 rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
          </div>

          {/* Bottom Shimmer Bar */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/10 to-transparent" />
        </div>
      ))}
    </div>
  );
}
