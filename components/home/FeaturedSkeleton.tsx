"use client";

import React from "react";

interface FeaturedSkeletonProps {
  count?: number;
}

export function FeaturedSkeleton({ count = 3 }: FeaturedSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading featured properties"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-3xl p-4 border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg animate-pulse flex flex-col justify-between h-[490px]"
        >
          {/* Main Image Box Skeleton */}
          <div className="relative w-full h-[240px] rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 rounded-full bg-slate-300 dark:bg-slate-700" />
              <div className="h-9 w-9 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-7 w-28 rounded-lg bg-slate-300 dark:bg-slate-700" />
              <div className="h-6 w-16 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
          </div>

          {/* Title & Location Skeleton */}
          <div className="space-y-2 mt-4">
            <div className="h-6 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-1/2 rounded-md bg-slate-200/80 dark:bg-slate-800/80" />
          </div>

          {/* Stats Bar Skeleton */}
          <div className="h-12 w-full rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 mt-3" />

          {/* Footer Skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-800/50 mt-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-1">
                <div className="h-3.5 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-14 rounded bg-slate-200/70 dark:bg-slate-800/70" />
              </div>
            </div>
            <div className="h-9 w-24 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/10 to-transparent pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
