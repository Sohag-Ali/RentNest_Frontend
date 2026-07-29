"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { RotateCcwIcon, SearchXIcon, SparklesIcon } from "lucide-react"

interface PropertyEmptyStateProps {
  onReset: () => void
}

export function PropertyEmptyState({ onReset }: PropertyEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 my-6 rounded-3xl border border-dashed border-border/80 bg-card/50 backdrop-blur-md shadow-inner">
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
          <SearchXIcon className="h-12 w-12 sm:h-14 sm:w-14 stroke-[1.5]" />
        </div>
        <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-1.5 shadow-md">
          <SparklesIcon className="h-4 w-4" />
        </div>
      </div>

      <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
        No Matching Properties Found
      </h3>
      <p className="text-muted-foreground text-sm max-w-md mt-2 leading-relaxed">
        We couldn&apos;t find any rental listings matching your current filter criteria. Try adjusting your search keyword, price range, or amenities.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Button
          onClick={onReset}
          className="rounded-xl h-11 px-6 font-semibold gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all"
        >
          <RotateCcwIcon className="h-4 w-4" />
          Reset All Filters
        </Button>
      </div>
    </div>
  )
}
