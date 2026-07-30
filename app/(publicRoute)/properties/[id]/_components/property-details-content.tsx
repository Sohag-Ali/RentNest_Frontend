"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Property } from "@/types/property"
import { PropertyHeroGallery } from "@/components/property-details/property-hero-gallery"
import { PropertyQuickInfo } from "@/components/property-details/property-quick-info"
import { PropertyLandlordCard } from "@/components/property-details/property-landlord-card"
import { PropertyOverviewTable } from "@/components/property-details/property-overview-table"
import { PropertyBookingSidebar } from "@/components/property-details/property-booking-sidebar"
import { SimilarProperties } from "@/components/property-details/similar-properties"
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
} from "lucide-react"

interface PropertyDetailsContentProps {
  property: Property
  allProperties: Property[]
  isLoggedIn?: boolean
}

/**
 * PropertyDetailsContent Component
 * 
 * Why this file exists:
 * Assembles and lays out the main property view components (gallery, overview table, booking sidebar).
 * 
 * Why props:
 * Receives property details and `isLoggedIn` state from parent Server Component page.
 */
export function PropertyDetailsContent({
  property,
  allProperties,
  isLoggedIn = false,
}: PropertyDetailsContentProps) {
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false)

  const amenityIcons: Record<string, React.ReactNode> = {
    "High-Speed Wi-Fi": <WifiIcon className="h-5 w-5 text-primary" />,
    "Private Pool": <WavesIcon className="h-5 w-5 text-primary" />,
    "Gym & Fitness Center": <DumbbellIcon className="h-5 w-5 text-primary" />,
    "24/7 Security": <ShieldCheckIcon className="h-5 w-5 text-primary" />,
    "EV Charging": <CarIcon className="h-5 w-5 text-primary" />,
    "Air Conditioning": <TvIcon className="h-5 w-5 text-primary" />,
  }

  const shortDescription = property.description
  const fullDescription = property.detailedDescription || property.description
  const hasExtendedDescription = fullDescription.length > shortDescription.length

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Navigation link back to listings */}
      <div className="flex items-center justify-between">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Listings
        </Link>
      </div>

      {/* Property Image Gallery */}
      <PropertyHeroGallery property={property} />

      {/* Main Grid: Details on Left, Booking Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          {/* Header Title & Location */}
          <div className="space-y-2 pb-6 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Badge variant="luxury" className="text-xs">
                {typeof property.category === "object" ? (property.category as any)?.name || "Apartment" : property.category}
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

          {/* Quick Info Specs */}
          <PropertyQuickInfo property={property} />

          {/* Description Section */}
          <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md shadow-black/5 space-y-4">
            <h3 className="text-xl font-bold text-foreground font-heading">About This Residence</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {showFullDesc ? fullDescription : shortDescription}
            </p>

            {hasExtendedDescription && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-xs font-semibold text-primary hover:text-primary/80 p-0 h-auto"
              >
                {showFullDesc ? "Show Less" : "Read Full Description..."}
              </Button>
            )}
          </Card>

          {/* Amenities Section */}
          <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md shadow-black/5 space-y-5">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-amber-500" />
              <h3 className="text-xl font-bold text-foreground font-heading">Features & Amenities</h3>
            </div>

            {property.amenities.length > 0 ? (
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
            ) : (
              <p className="text-sm text-muted-foreground">No amenities listed for this property.</p>
            )}
          </Card>

          {/* Landlord Card */}
          {property.landlord && <PropertyLandlordCard landlord={property.landlord} />}

          {/* Overview Table */}
          {property.overview && <PropertyOverviewTable overview={property.overview} />}
        </div>

        {/* Sidebar Component containing Booking Logic and Dialog */}
        <div className="hidden lg:block lg:col-span-1">
          <PropertyBookingSidebar property={property} isLoggedIn={isLoggedIn} />
        </div>
      </div>

      {/* Similar Properties Section */}
      <SimilarProperties currentPropertyId={(property as any)._id || property.id} properties={allProperties} />
    </main>
  )
}
