"use client"

import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FilterState, PropertyFilterSidebar } from "./property-filter-sidebar"
import { SlidersHorizontalIcon } from "lucide-react"

interface MobileFilterSheetProps {
  filters: FilterState
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onResetFilters: () => void
  activeFiltersCount: number
}

export function MobileFilterSheet({
  filters,
  onFilterChange,
  onResetFilters,
  activeFiltersCount,
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="inline-flex items-center justify-center rounded-full h-12 px-6 shadow-2xl bg-primary text-primary-foreground font-bold gap-2.5 border-2 border-white/20 backdrop-blur-md cursor-pointer transition-all hover:bg-primary/90">
          <SlidersHorizontalIcon className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 rounded-full bg-white text-primary text-xs items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-4 overflow-hidden">
          <SheetHeader className="pb-2">
            <SheetTitle>Filter Properties</SheetTitle>
            <SheetDescription>
              Refine your search results by category, city, price range, and amenities.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto h-full pb-16 pt-2">
            <PropertyFilterSidebar
              filters={filters}
              onFilterChange={onFilterChange}
              onResetFilters={() => {
                onResetFilters()
                setOpen(false)
              }}
              activeFiltersCount={activeFiltersCount}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
