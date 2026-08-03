'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FilterState, PropertyFilterSidebar } from './property-filter-sidebar';
import { SlidersHorizontalIcon } from 'lucide-react';

interface MobileFilterSheetProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
}

export function MobileFilterSheet({
  filters,
  onFilterChange,
  onResetFilters,
  activeFiltersCount,
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="inline-flex items-center justify-center rounded-full h-12 px-6 shadow-2xl bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] text-white font-bold text-sm gap-2.5 border-2 border-white/20 backdrop-blur-xl cursor-pointer transition-all hover:scale-105 active:scale-95">
          <SlidersHorizontalIcon className="h-4 w-4 text-white" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 rounded-full bg-white text-[#2563EB] text-xs items-center justify-center font-extrabold shadow-sm">
              {activeFiltersCount}
            </span>
          )}
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[88vh] rounded-t-3xl p-4 overflow-hidden bg-slate-950/95 backdrop-blur-2xl border-t border-white/15 text-white"
        >
          <SheetHeader className="pb-2">
            <SheetTitle className="text-white text-lg font-bold">
              Filter Properties
            </SheetTitle>
            <SheetDescription className="text-slate-400 text-xs">
              Refine your search results by category, city, price range, and amenities.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto h-full pb-16 pt-2">
            <PropertyFilterSidebar
              filters={filters}
              onFilterChange={onFilterChange}
              onResetFilters={() => {
                onResetFilters();
                setOpen(false);
              }}
              activeFiltersCount={activeFiltersCount}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
