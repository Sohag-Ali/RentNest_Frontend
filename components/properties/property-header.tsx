"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { LayoutGridIcon, ListIcon, SparklesIcon, ArrowUpDownIcon } from "lucide-react"

interface PropertyHeaderProps {
  totalProperties: number
  viewMode: "grid" | "list"
  onViewChange: (mode: "grid" | "list") => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function PropertyHeader({
  totalProperties,
  viewMode,
  onViewChange,
  sortBy,
  onSortChange,
}: PropertyHeaderProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between pb-2 border-b border-border/40 mb-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Badge variant="luxury" className="gap-1 px-3 py-1 font-medium tracking-wide">
            <SparklesIcon className="h-3.5 w-3.5 text-amber-500" />
            Curated Living Spaces
          </Badge>
          <Badge variant="secondary" className="font-semibold text-xs rounded-full px-3 py-0.5">
            {totalProperties} Properties Available
          </Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl font-heading bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
          Explore Exclusive Rentals
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
          Discover high-end luxury villas, urban penthouses, and seaside sanctuaries with instant availability and verified landlord credentials.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
        {/* Sort Dropdown */}
        <div className="w-48 sm:w-56">
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            icon={<ArrowUpDownIcon className="h-4 w-4" />}
            className="rounded-xl border-border bg-card/60 shadow-xs text-xs font-medium h-10"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Listed</option>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center rounded-xl bg-muted/60 p-1 border border-border/50">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon-sm"
            onClick={() => onViewChange("grid")}
            className="rounded-lg transition-all"
            aria-label="Grid View"
          >
            <LayoutGridIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon-sm"
            onClick={() => onViewChange("list")}
            className="rounded-lg transition-all"
            aria-label="List View"
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
