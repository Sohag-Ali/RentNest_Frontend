"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon, FilterIcon } from "lucide-react"

interface PropertySearchProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  availabilityFilter: string
  onAvailabilityChange: (value: string) => void
  categoryFilter: string
  onCategoryChange: (value: string) => void
  landlordFilter: string
  onLandlordChange: (value: string) => void
  categories: string[]
  landlords: string[]
}

/**
 * PropertySearch Component (Client Component)
 * 
 * Why this file exists:
 * Search and filter control panel for Admin Property Management.
 * Filters by Title, Location, Landlord, Category, and Availability status.
 */
export function PropertySearch({
  searchQuery,
  onSearchChange,
  availabilityFilter,
  onAvailabilityChange,
  categoryFilter,
  onCategoryChange,
  landlordFilter,
  onLandlordChange,
  categories,
  landlords,
}: PropertySearchProps) {
  return (
    <Card className="p-4 rounded-3xl border-border/70 bg-card shadow-sm space-y-3 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-4">
      {/* Live Search Input */}
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by title, location, landlord, or category..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10 text-xs rounded-2xl border-border/60 bg-muted/30 focus-visible:ring-primary"
        />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Availability Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground font-medium flex items-center gap-1">
            <FilterIcon className="h-3.5 w-3.5" /> Availability:
          </span>
          <select
            value={availabilityFilter}
            onChange={(e) => onAvailabilityChange(e.target.value)}
            className="h-9 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-9 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Landlord Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground font-medium">Landlord:</span>
          <select
            value={landlordFilter}
            onChange={(e) => onLandlordChange(e.target.value)}
            className="h-9 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer max-w-[140px]"
          >
            <option value="ALL">All Landlords</option>
            {landlords.map((landlord) => (
              <option key={landlord} value={landlord}>
                {landlord}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  )
}
