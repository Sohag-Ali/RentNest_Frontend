"use client"

import React from "react"
import { AdminProperty } from "../../_actions/admin-property.actions"
import { PropertyStatusBadge } from "./property-status-badge"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2Icon,
  MapPinIcon,
  UserIcon,
  TagIcon,
  EyeIcon,
  SparklesIcon,
} from "lucide-react"

interface PropertyCardProps {
  property: AdminProperty
  onViewDetails: (property: AdminProperty) => void
}

/**
 * PropertyCard Component (Client Component)
 * 
 * Why this file exists:
 * Mobile and Tablet responsive card representation of a property listing.
 */
export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price || 0)

  const landlordName = property.landlord?.name || "Unknown Landlord"
  const categoryName = property.category?.name || "General"
  const amenitiesList = Array.isArray(property.amenities) ? property.amenities : []

  return (
    <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all space-y-4">
      {/* Top Banner: Image Placeholder & Availability Badge */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-border/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0">
            <Building2Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-foreground line-clamp-1">{property.title}</h4>
            <p className="text-xs text-muted-foreground flex items-center gap-1 line-clamp-1 mt-0.5">
              <MapPinIcon className="h-3 w-3 text-rose-500 shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>
        </div>

        <PropertyStatusBadge isAvailable={property.isAvailable} className="shrink-0" />
      </div>

      {/* Grid Meta Details */}
      <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-muted/40 border border-border/40">
        <div>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <TagIcon className="h-3 w-3 text-blue-500" /> Category
          </span>
          <span className="font-bold text-foreground line-clamp-1">{categoryName}</span>
        </div>

        <div>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <UserIcon className="h-3 w-3 text-purple-500" /> Landlord
          </span>
          <span className="font-bold text-foreground line-clamp-1">{landlordName}</span>
        </div>

        <div className="col-span-2 pt-1 border-t border-border/30 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">Price</span>
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* Amenities & Action */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <SparklesIcon className="h-3.5 w-3.5 text-amber-500" />
          <span>{amenitiesList.length} Amenities</span>
        </div>

        <Button
          onClick={() => onViewDetails(property)}
          variant="outline"
          size="sm"
          className="rounded-xl text-xs font-bold gap-1 px-3 h-8 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <EyeIcon className="h-3.5 w-3.5" />
          <span>View Details</span>
        </Button>
      </div>
    </Card>
  )
}
