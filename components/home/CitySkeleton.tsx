"use client";

import React from "react";

interface CitySkeletonProps {
  count?: number;
}

export function CitySkeleton({ count = 4 }: CitySkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading cities"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-3xl p-4 border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg animate-pulse h-[380px] sm:h-[400px] flex flex-col justify-between"
        >
          {/* Badge Skeleton */}
          <div className="flex justify-between items-center z-10">
            <div className="h-6 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Bottom Glass Panel Skeleton */}
          <div className="rounded-2xl p-4 bg-slate-200/80 dark:bg-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-6 w-32 rounded-lg bg-slate-300 dark:bg-slate-700" />
              <div className="h-4 w-20 rounded bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-300/40 dark:border-slate-700/40">
              <div className="h-4 w-24 rounded bg-slate-300 dark:bg-slate-700" />
              <div className="h-8 w-20 rounded-xl bg-slate-300 dark:bg-slate-700" />
            </div>
          </div>

          {/* Shimmer Overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/10 to-transparent pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
