"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CATEGORIES, CITIES } from "@/lib/mock-data/properties"
import {
  SearchIcon,
  MapPinIcon,
  HomeIcon,
  DollarSignIcon,
  BedIcon,
  BathIcon,
  CalendarIcon,
  RotateCcwIcon,
  FilterIcon,
} from "lucide-react"

export interface SearchState {
  keyword: string
  location: string
  category: string
  priceRange: string
  bedrooms: string
  bathrooms: string
  availability: string
}

interface PropertySearchProps {
  searchState: SearchState
  onSearchChange: (field: keyof SearchState, value: string) => void
  onReset: () => void
  onApplySearch: () => void
}

export function PropertySearch({
  searchState,
  onSearchChange,
  onReset,
  onApplySearch,
}: PropertySearchProps) {
  return (
    <div className="w-full rounded-3xl bg-card/80 backdrop-blur-xl border border-border/70 p-4 md:p-6 shadow-xl shadow-black/5 transition-all mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="space-y-1.5 col-span-1 sm:col-span-2 lg:col-span-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
            Search Keyword
          </label>
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Penthouse, Villa, Soho..."
              value={searchState.keyword}
              onChange={(e) => onSearchChange("keyword", e.target.value)}
              className="pl-10 h-11 rounded-xl bg-background/50 border-input shadow-xs focus:bg-background text-sm"
            />
          </div>
        </div>

        {/* Location Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
            Location
          </label>
          <Select
            value={searchState.location}
            onChange={(e) => onSearchChange("location", e.target.value)}
            icon={<MapPinIcon className="h-4 w-4" />}
            className="h-11 rounded-xl bg-background/50 border-input text-sm"
          >
            {CITIES.map((city) => (
              <option key={city} value={city === "All" ? "" : city}>
                {city === "All" ? "All Locations" : city}
              </option>
            ))}
          </Select>
        </div>

        {/* Category Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
            Property Category
          </label>
          <Select
            value={searchState.category}
            onChange={(e) => onSearchChange("category", e.target.value)}
            icon={<HomeIcon className="h-4 w-4" />}
            className="h-11 rounded-xl bg-background/50 border-input text-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat === "All" ? "" : cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
            Max Price
          </label>
          <Select
            value={searchState.priceRange}
            onChange={(e) => onSearchChange("priceRange", e.target.value)}
            icon={<DollarSignIcon className="h-4 w-4" />}
            className="h-11 rounded-xl bg-background/50 border-input text-sm"
          >
            <option value="">Any Price</option>
            <option value="3000">Up to $3,000 / mo</option>
            <option value="5000">Up to $5,000 / mo</option>
            <option value="8000">Up to $8,000 / mo</option>
            <option value="12000">Up to $12,000+ / mo</option>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
            Bedrooms
          </label>
          <Select
            value={searchState.bedrooms}
            onChange={(e) => onSearchChange("bedrooms", e.target.value)}
            icon={<BedIcon className="h-4 w-4" />}
            className="h-11 rounded-xl bg-background/50 border-input text-sm"
          >
            <option value="">Any Beds</option>
            <option value="1">1+ Bedrooms</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
            Bathrooms
          </label>
          <Select
            value={searchState.bathrooms}
            onChange={(e) => onSearchChange("bathrooms", e.target.value)}
            icon={<BathIcon className="h-4 w-4" />}
            className="h-11 rounded-xl bg-background/50 border-input text-sm"
          >
            <option value="">Any Baths</option>
            <option value="1">1+ Bathrooms</option>
            <option value="2">2+ Bathrooms</option>
            <option value="3">3+ Bathrooms</option>
            <option value="4">4+ Bathrooms</option>
          </Select>
        </div>

        {/* Availability */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
            Availability
          </label>
          <Select
            value={searchState.availability}
            onChange={(e) => onSearchChange("availability", e.target.value)}
            icon={<CalendarIcon className="h-4 w-4" />}
            className="h-11 rounded-xl bg-background/50 border-input text-sm"
          >
            <option value="">Any Status</option>
            <option value="Immediate">Available Immediately</option>
            <option value="Next Month">Next Month</option>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-end gap-2 pt-1">
          <Button
            onClick={onApplySearch}
            className="h-11 flex-1 rounded-xl font-semibold gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all"
          >
            <FilterIcon className="h-4 w-4" />
            Apply
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            size="icon"
            className="h-11 w-11 rounded-xl border-input shrink-0 hover:bg-muted/80"
            title="Reset Filters"
          >
            <RotateCcwIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  )
}
