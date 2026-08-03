"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function BookingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="rounded-3xl border border-border/60 bg-card/60 p-5 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-28 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-xl" />
              </div>
              <Skeleton className="h-12 w-12 rounded-2xl" />
            </div>
            <div className="pt-3 border-t border-border/40 flex justify-between items-center">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </Card>
        ))}
      </div>

      {/* Filter and Search Controls Skeleton */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-card/60 border border-border/60">
        <Skeleton className="h-10 flex-1 min-w-[240px] rounded-2xl" />
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Skeleton className="h-10 w-32 rounded-2xl" />
          <Skeleton className="h-10 w-32 rounded-2xl" />
          <Skeleton className="h-10 w-36 rounded-2xl" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-3xl border border-border/60 bg-card/60 p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30 border border-border/40 gap-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-2xl shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40 rounded-md" />
                  <Skeleton className="h-3 w-24 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
