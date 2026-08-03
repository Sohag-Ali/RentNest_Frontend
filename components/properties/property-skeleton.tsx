'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function SearchSkeleton() {
  return (
    <div className="w-full rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 p-6 shadow-xl shadow-blue-500/5 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <Skeleton className="h-12 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <Card className="w-full rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-5 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800">
        <Skeleton className="h-6 w-32 bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-11 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PropertyCardSkeleton({
  viewMode = 'grid',
}: {
  viewMode?: 'grid' | 'list';
}) {
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col md:flex-row rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-4 gap-6">
        <Skeleton className="w-full md:w-80 h-56 rounded-2xl shrink-0 bg-slate-200 dark:bg-slate-800" />
        <div className="flex flex-col justify-between flex-1 space-y-4 py-2">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-5 w-20 bg-slate-200 dark:bg-slate-800" />
            </div>
            <Skeleton className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-800" />
          </div>
          <Skeleton className="h-10 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-8 w-28 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-10 w-32 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800" />
      <CardContent className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-4/5 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-4 w-3/5 bg-slate-200 dark:bg-slate-800" />
        </div>
        <Skeleton className="h-10 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-24 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-6 w-20 bg-slate-200 dark:bg-slate-800" />
        </div>
        <Skeleton className="h-11 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </CardContent>
    </Card>
  );
}

export function PropertyGridSkeleton({
  viewMode = 'grid',
  count = 6,
}: {
  viewMode?: 'grid' | 'list';
  count?: number;
}) {
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <PropertyCardSkeleton key={i} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} viewMode="grid" />
      ))}
    </div>
  );
}
