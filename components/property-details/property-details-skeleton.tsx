"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function PropertyDetailsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Action Bar Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-9 w-40 rounded-xl" />
      </div>

      {/* Gallery Skeleton */}
      <Skeleton className="w-full h-[380px] sm:h-[450px] rounded-3xl" />

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>

          <Skeleton className="h-32 w-full rounded-3xl" />
          <Skeleton className="h-48 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>

        <div className="lg:col-span-1">
          <Card className="rounded-3xl p-6 space-y-4">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </Card>
        </div>
      </div>
    </div>
  )
}
