"use client"

import React, { useState, useMemo } from "react"
import { Property, SearchState, FilterState } from "@/types/property"
import { PropertyHeader } from "@/components/properties/property-header"
import { PropertySearch } from "@/components/properties/property-search"
import { PropertyFilterSidebar } from "@/components/properties/property-filter-sidebar"
import { PropertyGrid } from "@/components/properties/property-grid"
import { PropertyEmptyState } from "@/components/properties/property-empty-state"
import { PropertyPagination } from "@/components/properties/property-pagination"
import { MobileFilterSheet } from "@/components/properties/mobile-filter-sheet"

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
  maxPrice: 500000,
  bedrooms: 0,
  bathrooms: 0,
  selectedAmenities: [],
  availableOnly: false,
  featuredOnly: false,
  minRating: 0,
}

interface PropertyListingProps {
  properties?: Property[]
}

export function PropertyListing({ properties = [] }: PropertyListingProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [searchState, setSearchState] = useState<SearchState>(initialSearchState)
  const [filters, setFilters] = useState<FilterState>(initialFilterState)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const itemsPerPage = 12

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

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.category) count++
    if (filters.city) count++
    if (filters.maxPrice < 500000) count++
    if (filters.bedrooms > 0) count++
    if (filters.bathrooms > 0) count++
    if (filters.selectedAmenities.length > 0) count += filters.selectedAmenities.length
    if (filters.availableOnly) count++
    if (filters.featuredOnly) count++
    if (filters.minRating > 0) count++
    return count
  }, [filters])

  const filteredProperties = useMemo(() => {
    const list = Array.isArray(properties) ? properties : []
    return list
      .filter((item: Property) => {
        if (!item) return false

        if (searchState.keyword) {
          const kw = searchState.keyword.toLowerCase()
          const matchesTitle = item.title ? item.title.toLowerCase().includes(kw) : false
          const matchesLoc = item.location ? item.location.toLowerCase().includes(kw) : false
          const matchesDesc = item.description ? item.description.toLowerCase().includes(kw) : false
          if (!matchesTitle && !matchesLoc && !matchesDesc) return false
        }

        const targetCity = searchState.location || filters.city
        if (targetCity && item.city && item.city.toLowerCase() !== targetCity.toLowerCase()) {
          return false
        }

        const targetCategory = searchState.category || filters.category
        if (targetCategory && item.category) {
          const itemCatName = typeof item.category === "object" ? (item.category as any)?.name : item.category
          if (itemCatName && itemCatName !== targetCategory && !String(itemCatName).toLowerCase().includes(targetCategory.toLowerCase())) {
            return false
          }
        }

        const maxPriceLimit = searchState.priceRange ? Number(searchState.priceRange) : filters.maxPrice
        if (item.price != null && item.price > maxPriceLimit) return false

        const minBeds = searchState.bedrooms ? Number(searchState.bedrooms) : filters.bedrooms
        if (minBeds > 0 && (item.bedrooms ?? 0) < minBeds) return false

        const minBaths = searchState.bathrooms ? Number(searchState.bathrooms) : filters.bathrooms
        if (minBaths > 0 && (item.bathrooms ?? 0) < minBaths) return false

        if (searchState.availability) {
          const availableFrom = item.overview?.availableFrom ?? ""
          if (!availableFrom.toLowerCase().includes(searchState.availability.toLowerCase())) {
            return false
          }
        }
        if (filters.availableOnly && !item.isAvailable) return false

        if (filters.featuredOnly && !item.isFeatured) return false

        if (filters.minRating > 0 && (item.rating ?? 0) < filters.minRating) return false

        if (filters.selectedAmenities.length > 0) {
          const amenities = Array.isArray(item.amenities) ? item.amenities : []
          const hasAllAmenities = filters.selectedAmenities.every((a) => amenities.includes(a))
          if (!hasAllAmenities) return false
        }

        return true
      })
      .sort((a, b) => {
        const priceA = a.price ?? 0
        const priceB = b.price ?? 0
        const ratingA = a.rating ?? 0
        const ratingB = b.rating ?? 0
        if (sortBy === "price-low") return priceA - priceB
        if (sortBy === "price-high") return priceB - priceA
        if (sortBy === "rating") return ratingB - ratingA
        if (sortBy === "newest") return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      })
  }, [properties, searchState, filters, sortBy])

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProperties.slice(start, start + itemsPerPage)
  }, [filteredProperties, currentPage])

  return (
    <main className="min-h-screen  py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <PropertyHeader
        totalProperties={filteredProperties.length}
        viewMode={viewMode}
        onViewChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <PropertySearch
        searchState={searchState}
        onSearchChange={handleSearchChange}
        onReset={handleReset}
        onApplySearch={() => setCurrentPage(1)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <PropertyFilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleReset}
            activeFiltersCount={activeFiltersCount}
          />
        </div>

        <div className="lg:col-span-3 space-y-6">
          {!properties || properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 my-6 rounded-3xl border border-dashed border-border/80 bg-card/50 backdrop-blur-md shadow-inner">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                No Properties Available
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mt-2 leading-relaxed">
                We couldn&apos;t load any rental listings at the moment. Please try again later.
              </p>
            </div>
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

      <MobileFilterSheet
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleReset}
        activeFiltersCount={activeFiltersCount}
      />
    </main>
  )
}
