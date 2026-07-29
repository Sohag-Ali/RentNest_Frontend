"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CATEGORIES, CITIES, AMENITIES_LIST } from "@/lib/mock-data/properties"
import {
  SlidersHorizontalIcon,
  RotateCcwIcon,
  StarIcon,
  SparklesIcon,
  CheckCircle2Icon,
  Building2Icon,
  MapPinIcon,
  DollarSignIcon,
  BedIcon,
  BathIcon,
  ShieldCheckIcon,
} from "lucide-react"

export interface FilterState {
  category: string
  city: string
  maxPrice: number
  bedrooms: number
  bathrooms: number
  selectedAmenities: string[]
  availableOnly: boolean
  featuredOnly: boolean
  minRating: number
}

interface PropertyFilterSidebarProps {
  filters: FilterState
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onResetFilters: () => void
  activeFiltersCount: number
}

export function PropertyFilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  activeFiltersCount,
}: PropertyFilterSidebarProps) {
  const toggleAmenity = (amenity: string) => {
    if (filters.selectedAmenities.includes(amenity)) {
      onFilterChange(
        "selectedAmenities",
        filters.selectedAmenities.filter((a) => a !== amenity)
      )
    } else {
      onFilterChange("selectedAmenities", [...filters.selectedAmenities, amenity])
    }
  }

  return (
    <Card className="w-full rounded-3xl border-border/80 bg-card/80 backdrop-blur-xl shadow-xl shadow-black/5 sticky top-24 overflow-hidden">
      {/* Sidebar Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <SlidersHorizontalIcon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Filter Properties</CardTitle>
        </div>
        {activeFiltersCount > 0 && (
          <span className="flex h-6 px-2.5 text-xs font-semibold rounded-full bg-primary/10 text-primary items-center justify-center">
            {activeFiltersCount} Active
          </span>
        )}
      </CardHeader>

      <CardContent className="space-y-6 pt-5 max-h-[calc(100vh-200px)] overflow-y-auto pr-3">
        {/* Category */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
            <Building2Icon className="h-3.5 w-3.5" /> Category
          </Label>
          <Select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="rounded-xl h-10 text-xs bg-background/50 border-input"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat === "All" ? "" : cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </Select>
        </div>

        <Separator />

        {/* City */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5" /> City
          </Label>
          <Select
            value={filters.city}
            onChange={(e) => onFilterChange("city", e.target.value)}
            className="rounded-xl h-10 text-xs bg-background/50 border-input"
          >
            {CITIES.map((city) => (
              <option key={city} value={city === "All" ? "" : city}>
                {city === "All" ? "All Cities" : city}
              </option>
            ))}
          </Select>
        </div>

        <Separator />

        {/* Price Range Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
              <DollarSignIcon className="h-3.5 w-3.5" /> Max Price
            </Label>
            <span className="text-sm font-bold text-primary font-mono">
              ${filters.maxPrice.toLocaleString()} / mo
            </span>
          </div>
          <Slider
            min={2000}
            max={15000}
            step={500}
            value={filters.maxPrice}
            onValueChange={(val) => onFilterChange("maxPrice", val)}
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>$2,000</span>
            <span>$8,500</span>
            <span>$15,000+</span>
          </div>
        </div>

        <Separator />

        {/* Bedrooms Pills */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
            <BedIcon className="h-3.5 w-3.5" /> Bedrooms
          </Label>
          <div className="flex gap-1.5 flex-wrap">
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onFilterChange("bedrooms", num)}
                className={`h-9 min-w-9 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  filters.bedrooms === num
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-background/50 text-foreground border-input hover:bg-muted/70"
                }`}
              >
                {num === 0 ? "Any" : `${num}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms Pills */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
            <BathIcon className="h-3.5 w-3.5" /> Bathrooms
          </Label>
          <div className="flex gap-1.5 flex-wrap">
            {[0, 1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onFilterChange("bathrooms", num)}
                className={`h-9 min-w-9 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  filters.bathrooms === num
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-background/50 text-foreground border-input hover:bg-muted/70"
                }`}
              >
                {num === 0 ? "Any" : `${num}+`}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Switches: Available Only & Featured Only */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-500" />
                Available Now Only
              </Label>
              <p className="text-[11px] text-muted-foreground">Show units ready for move-in</p>
            </div>
            <Switch
              checked={filters.availableOnly}
              onCheckedChange={(checked) => onFilterChange("availableOnly", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                <SparklesIcon className="h-3.5 w-3.5 text-amber-500" />
                Featured Listings
              </Label>
              <p className="text-[11px] text-muted-foreground">Top-tier luxury verified homes</p>
            </div>
            <Switch
              checked={filters.featuredOnly}
              onCheckedChange={(checked) => onFilterChange("featuredOnly", checked)}
            />
          </div>
        </div>

        <Separator />

        {/* Rating Filter */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
            <StarIcon className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> Minimum Rating
          </Label>
          <div className="flex gap-2">
            {[0, 4.0, 4.5, 4.8].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => onFilterChange("minRating", rating)}
                className={`flex-1 h-9 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center gap-1 ${
                  filters.minRating === rating
                    ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                    : "bg-background/50 text-foreground border-input hover:bg-muted/70"
                }`}
              >
                {rating === 0 ? (
                  "Any"
                ) : (
                  <>
                    <span>{rating}</span>
                    <StarIcon className="h-3 w-3 fill-current" />
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Amenities Checkboxes */}
        <div className="space-y-3">
          <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
            <ShieldCheckIcon className="h-3.5 w-3.5" /> Amenities
          </Label>
          <div className="grid grid-cols-1 gap-2.5">
            {AMENITIES_LIST.map((amenity) => {
              const isChecked = filters.selectedAmenities.includes(amenity)
              return (
                <div key={amenity} className="flex items-center space-x-2.5">
                  <Checkbox
                    id={`sidebar-amenity-${amenity}`}
                    checked={isChecked}
                    onCheckedChange={() => toggleAmenity(amenity)}
                    className="rounded-md"
                  />
                  <label
                    htmlFor={`sidebar-amenity-${amenity}`}
                    className="text-xs font-medium leading-none cursor-pointer select-none text-foreground/80 hover:text-foreground"
                  >
                    {amenity}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 pb-5 border-t border-border/50">
        <Button
          variant="outline"
          onClick={onResetFilters}
          className="w-full rounded-2xl h-10 gap-2 border-input font-medium text-xs hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all"
        >
          <RotateCcwIcon className="h-3.5 w-3.5" />
          Reset All Filters
        </Button>
      </CardFooter>
    </Card>
  )
}
