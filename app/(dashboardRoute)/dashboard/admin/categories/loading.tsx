import React from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * AdminCategoriesLoading Component
 * 
 * Why this file exists:
 * Next.js Suspense loading fallback displayed while fetching admin property categories on the server.
 */
export default function AdminCategoriesLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-lg" />
        </div>
        <Skeleton className="h-11 w-40 rounded-2xl" />
      </div>

      {/* 3 Stat Cards Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-2xl" />
            </div>
            <Skeleton className="h-7 w-16 rounded-lg" />
          </Card>
        ))}
      </div>

      {/* Main Table Skeleton */}
      <Card className="rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 pb-2">
          <Skeleton className="h-10 w-full sm:w-80 rounded-2xl" />
          <Skeleton className="h-10 w-28 rounded-2xl" />
        </div>

        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 py-3 border-b border-border/40 last:border-0"
          >
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="h-10 w-10 rounded-2xl" />
              <Skeleton className="h-4 w-1/3 rounded-md" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </Card>
    </div>
  )
}
