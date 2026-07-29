"use client"

import React, { useState, useMemo } from "react"
import { MOCK_PROPERTIES, Property } from "@/lib/mock-data/properties"
import { PropertyHeader } from "@/components/properties/property-header"
import { PropertySearch, SearchState } from "@/components/properties/property-search"
import { PropertyFilterSidebar, FilterState } from "@/components/properties/property-filter-sidebar"
import { PropertyGrid } from "@/components/properties/property-grid"
import { PropertyGridSkeleton, SearchSkeleton, SidebarSkeleton } from "@/components/properties/property-skeleton"
import { PropertyEmptyState } from "@/components/properties/property-empty-state"
import { PropertyPagination } from "@/components/properties/property-pagination"
import { MobileFilterSheet } from "@/components/properties/mobile-filter-sheet"
import { Button } from "@/components/ui/button"
import { RefreshCwIcon } from "lucide-react"

const initialSearchState: SearchState = {
  keyword: "",
  location: "",
  category: "",
  priceRange: "",
  bedrooms: "",
  bathrooms: "",
  availability: "",
}

const initialFilterState: FilterState = {
  category: "",
  city: "",
  maxPrice: 15000,
  bedrooms: 0,
  bathrooms: 0,
  selectedAmenities: [],
  availableOnly: false,
  featuredOnly: false,
  minRating: 0,
}

export default function PropertyPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [searchState, setSearchState] = useState<SearchState>(initialSearchState)
  const [filters, setFilters] = useState<FilterState>(initialFilterState)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const itemsPerPage = 6

  const handleSearchChange = (field: keyof SearchState, value: string) => {
    setSearchState((prev) => ({ ...prev, [field]: value }))
  }

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setSearchState(initialSearchState)
    setFilters(initialFilterState)
    setCurrentPage(1)
  }

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.category) count++
    if (filters.city) count++
    if (filters.maxPrice < 15000) count++
    if (filters.bedrooms > 0) count++
    if (filters.bathrooms > 0) count++
    if (filters.selectedAmenities.length > 0) count += filters.selectedAmenities.length
    if (filters.availableOnly) count++
    if (filters.featuredOnly) count++
    if (filters.minRating > 0) count++
    return count
  }, [filters])

  // Filter properties in memory based on search & sidebar options
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((item: Property) => {
      // Keyword
      if (searchState.keyword) {
        const kw = searchState.keyword.toLowerCase()
        const matchesTitle = item.title.toLowerCase().includes(kw)
        const matchesLoc = item.location.toLowerCase().includes(kw)
        const matchesDesc = item.description.toLowerCase().includes(kw)
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false
      }

      // Location / City
      const targetCity = searchState.location || filters.city
      if (targetCity && item.city.toLowerCase() !== targetCity.toLowerCase()) {
        return false
      }

      // Category
      const targetCategory = searchState.category || filters.category
      if (targetCategory && item.category !== targetCategory) {
        return false
      }

      // Price
      const maxPriceLimit = searchState.priceRange ? Number(searchState.priceRange) : filters.maxPrice
      if (item.price > maxPriceLimit) return false

      // Bedrooms
      const minBeds = searchState.bedrooms ? Number(searchState.bedrooms) : filters.bedrooms
      if (minBeds > 0 && item.bedrooms < minBeds) return false

      // Bathrooms
      const minBaths = searchState.bathrooms ? Number(searchState.bathrooms) : filters.bathrooms
      if (minBaths > 0 && item.bathrooms < minBaths) return false

      // Availability
      if (searchState.availability && !item.overview.availableFrom.toLowerCase().includes(searchState.availability.toLowerCase())) {
        return false
      }
      if (filters.availableOnly && !item.isAvailable) return false

      // Featured
      if (filters.featuredOnly && !item.isFeatured) return false

      // Rating
      if (filters.minRating > 0 && item.rating < filters.minRating) return false

      // Amenities
      if (filters.selectedAmenities.length > 0) {
        const hasAllAmenities = filters.selectedAmenities.every((a) => item.amenities.includes(a))
        if (!hasAllAmenities) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    })
  }, [searchState, filters, sortBy])

  // Pagination slicing
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProperties.slice(start, start + itemsPerPage)
  }, [filteredProperties, currentPage])

  // Toggle simulate loading UI demo
  const triggerSimulatedLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 800)
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <PropertyHeader
        totalProperties={filteredProperties.length}
        viewMode={viewMode}
        onViewChange={(mode) => {
          setViewMode(mode)
          triggerSimulatedLoading()
        }}
        sortBy={sortBy}
        onSortChange={(sort) => {
          setSortBy(sort)
          triggerSimulatedLoading()
        }}
      />

      {/* Demo State Control Toolbar */}
      <div className="flex justify-end mb-4">
        <Button
          variant="ghost"
          size="xs"
          onClick={triggerSimulatedLoading}
          className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
        >
          <RefreshCwIcon className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Simulate Skeleton Load
        </Button>
      </div>

      {/* Search Area */}
      {isLoading ? (
        <SearchSkeleton />
      ) : (
        <PropertySearch
          searchState={searchState}
          onSearchChange={handleSearchChange}
          onReset={handleReset}
          onApplySearch={triggerSimulatedLoading}
        />
      )}

      {/* Main Desktop Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sticky Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          {isLoading ? (
            <SidebarSkeleton />
          ) : (
            <PropertyFilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleReset}
              activeFiltersCount={activeFiltersCount}
            />
          )}
        </div>

        {/* Right Property Grid */}
        <div className="lg:col-span-3 space-y-6">
          {isLoading ? (
            <PropertyGridSkeleton viewMode={viewMode} count={6} />
          ) : paginatedProperties.length === 0 ? (
            <PropertyEmptyState onReset={handleReset} />
          ) : (
            <>
              <PropertyGrid properties={paginatedProperties} viewMode={viewMode} />
              <PropertyPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page)
                  window.scrollTo({ top: 300, behavior: "smooth" })
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet & Sticky Bottom Trigger */}
      <MobileFilterSheet
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleReset}
        activeFiltersCount={activeFiltersCount}
      />
    </main>
  )
}