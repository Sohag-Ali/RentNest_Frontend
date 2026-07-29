"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function SearchSkeleton() {
  return (
    <div className="w-full rounded-3xl bg-card border border-border/70 p-6 shadow-sm mb-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <Card className="w-full rounded-3xl border-border/80 bg-card p-5 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/50">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </Card>
  )
}

export function PropertyCardSkeleton({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col md:flex-row rounded-3xl border border-border/70 bg-card p-4 gap-6">
        <Skeleton className="w-full md:w-80 h-56 rounded-2xl shrink-0" />
        <div className="flex flex-col justify-between flex-1 space-y-4 py-2">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-10 w-full rounded-2xl" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="rounded-3xl border-border/70 bg-card overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <CardContent className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <Skeleton className="h-10 w-full rounded-2xl" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </CardContent>
    </Card>
  )
}

export function PropertyGridSkeleton({ viewMode = "grid", count = 6 }: { viewMode?: "grid" | "list"; count?: number }) {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <PropertyCardSkeleton key={i} viewMode="list" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} viewMode="grid" />
      ))}
    </div>
  )
}
