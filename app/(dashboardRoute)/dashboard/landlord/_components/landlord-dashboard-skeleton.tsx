'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function LandlordDashboardSkeleton() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto min-h-screen animate-in fade-in-50 duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl border border-border/60 bg-card">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-lg" />
        </div>
        <div className="flex items-center gap-3 p-2 border border-border/60 rounded-2xl w-48">
          <Skeleton className="h-11 w-11 rounded-xl" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>

      {/* 6 Overview Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="border border-border/60 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-8 rounded-xl" />
            </div>
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-3 w-28" />
          </Card>
        ))}
      </div>

      {/* Full Width Revenue Chart Skeleton */}
      <Card className="border border-border/60 p-6 space-y-4">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-72 w-full rounded-xl" />
      </Card>

      {/* 2 Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border/60 p-6 space-y-4">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </Card>
        <Card className="border border-border/60 p-6 space-y-4">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </Card>
      </div>

      {/* Top Properties Skeleton */}
      <Card className="border border-border/60 p-6 space-y-4">
        <Skeleton className="h-5 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      </Card>

      {/* Recent Requests & Recent Payments Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border/60 p-6 space-y-4">
          <Skeleton className="h-5 w-44" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        </Card>
        <Card className="border border-border/60 p-6 space-y-4">
          <Skeleton className="h-5 w-44" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Properties & Quick Actions Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border/60 p-6 space-y-4">
          <Skeleton className="h-5 w-44" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
          </div>
        </Card>
        <Card className="border border-border/60 p-6 space-y-4">
          <Skeleton className="h-5 w-44" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-2xl" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
