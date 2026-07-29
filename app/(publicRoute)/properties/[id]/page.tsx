"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MOCK_PROPERTIES, Property } from "@/lib/mock-data/properties"
import { PropertyHeroGallery } from "@/components/property-details/property-hero-gallery"
import { PropertyQuickInfo } from "@/components/property-details/property-quick-info"
import { PropertyLandlordCard } from "@/components/property-details/property-landlord-card"
import { PropertyOverviewTable } from "@/components/property-details/property-overview-table"
import { PropertyBookingSidebar } from "@/components/property-details/property-booking-sidebar"
import { SimilarProperties } from "@/components/property-details/similar-properties"
import { PropertyDetailsSkeleton } from "@/components/property-details/property-details-skeleton"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPinIcon,
  StarIcon,
  SparklesIcon,
  WifiIcon,
  TvIcon,
  CarIcon,
  ShieldCheckIcon,
  WavesIcon,
  DumbbellIcon,
  ChevronLeftIcon,
  RefreshCwIcon,
  CalendarIcon,
} from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PropertyDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const propertyId = resolvedParams.id

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false)

  // Find property or default to first property for demo
  const property: Property | undefined =
    MOCK_PROPERTIES.find((p) => p.id === propertyId || p.slug === propertyId) || MOCK_PROPERTIES[0]

  if (!property) {
    return notFound()
  }

  const amenityIcons: Record<string, React.ReactNode> = {
    "High-Speed Wi-Fi": <WifiIcon className="h-5 w-5 text-primary" />,
    "Private Pool": <WavesIcon className="h-5 w-5 text-primary" />,
    "Gym & Fitness Center": <DumbbellIcon className="h-5 w-5 text-primary" />,
    "24/7 Security": <ShieldCheckIcon className="h-5 w-5 text-primary" />,
    "EV Charging": <CarIcon className="h-5 w-5 text-primary" />,
    "Air Conditioning": <TvIcon className="h-5 w-5 text-primary" />,
  }

  const triggerSimulatedLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 700)
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Breadcrumb Nav & Simulator */}
      <div className="flex items-center justify-between">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Listings
        </Link>

        <Button
          variant="ghost"
          size="xs"
          onClick={triggerSimulatedLoading}
          className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
        >
          <RefreshCwIcon className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Simulate Loading State
        </Button>
      </div>

      {isLoading ? (
        <PropertyDetailsSkeleton />
      ) : (
        <>
          {/* Hero Gallery Section */}
          <PropertyHeroGallery property={property} />

          {/* Main Content Layout: Left Content (65%) | Right Sidebar (35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Location Header */}
              <div className="space-y-2 pb-6 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Badge variant="luxury" className="text-xs">
                    {property.category}
                  </Badge>
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full text-amber-600 dark:text-amber-400 text-xs font-bold">
                    <StarIcon className="h-3.5 w-3.5 fill-current" />
                    <span>{property.rating}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      ({property.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading leading-tight">
                  {property.title}
                </h1>

                <p className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                  <MapPinIcon className="h-4 w-4 text-primary shrink-0" />
                  {property.location}
                </p>
              </div>

              {/* Quick Info Stat Cards */}
              <PropertyQuickInfo property={property} />

              {/* Property Description */}
              <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md shadow-black/5 space-y-4">
                <h3 className="text-xl font-bold text-foreground font-heading">About This Residence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {property.detailedDescription || property.description}
                </p>

                {showFullDesc && (
                  <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                    Featuring acoustic soundproofing insulation, state-of-the-art climate control zones, energy-efficient solar glass, and customized ambient LED illumination. Residents enjoy exclusive access to private RentNest concierge services, dry cleaning pick-ups, and keyless mobile entry.
                  </p>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-xs font-semibold text-primary hover:text-primary/80 p-0 h-auto"
                >
                  {showFullDesc ? "Show Less" : "Read Full Description..."}
                </Button>
              </Card>

              {/* Amenities Grid */}
              <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md shadow-black/5 space-y-5">
                <div className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-amber-500" />
                  <h3 className="text-xl font-bold text-foreground font-heading">Features & Amenities</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/30 hover:border-primary/30 transition-colors"
                    >
                      <div className="p-2 rounded-xl bg-background border border-border/50 shrink-0">
                        {amenityIcons[amenity] || <SparklesIcon className="h-4 w-4 text-primary" />}
                      </div>
                      <span className="text-xs font-semibold text-foreground leading-snug">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Landlord Information Card */}
              <PropertyLandlordCard landlord={property.landlord} />

              {/* Property Overview Specifications */}
              <PropertyOverviewTable overview={property.overview} />
            </div>

            {/* Right Column Sticky Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <PropertyBookingSidebar property={property} />
            </div>
          </div>

          {/* Similar Properties Carousel / Grid */}
          <SimilarProperties currentPropertyId={property.id} properties={MOCK_PROPERTIES} />

          {/* Mobile Sticky Bottom CTA Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border p-4 lg:hidden shadow-2xl flex items-center justify-between">
            <div>
              <span className="text-2xl font-extrabold text-foreground font-mono">
                ${property.price.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground"> / month</span>
              <p className="text-[10px] text-emerald-500 font-semibold">{property.overview.availableFrom}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="rounded-xl px-5 h-11 font-bold text-xs bg-primary text-primary-foreground gap-1.5 shadow-lg"
              >
                <CalendarIcon className="h-4 w-4" />
                Book Lease
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}