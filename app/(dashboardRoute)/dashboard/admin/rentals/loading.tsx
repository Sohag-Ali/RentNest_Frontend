import React from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * AdminRentalsLoading Component
 * 
 * Why this file exists:
 * Suspense loading fallback displayed while Next.js fetches admin rental records on the server.
 */
export default function AdminRentalsLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 rounded-xl" />
        <Skeleton className="h-4 w-96 rounded-lg" />
      </div>

      {/* 8 Stat Cards Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-2xl" />
            </div>
            <Skeleton className="h-7 w-16 rounded-lg" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </Card>
        ))}
      </div>

      {/* Search & Filters Skeleton */}
      <Card className="p-4 rounded-3xl flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-full sm:w-80 rounded-2xl" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-2xl" />
          <Skeleton className="h-9 w-24 rounded-2xl" />
          <Skeleton className="h-9 w-24 rounded-2xl" />
        </div>
      </Card>

      {/* Table Skeleton */}
      <Card className="rounded-3xl p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-border/40 last:border-0">
            <Skeleton className="h-4 w-16 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3 rounded-md" />
              <Skeleton className="h-3 w-1/4 rounded-md" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-xl" />
          </div>
        ))}
      </Card>
    </div>
  )
}
