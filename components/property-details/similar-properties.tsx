"use client"

import React from "react"
import { Property } from "@/lib/mock-data/properties"
import { PropertyCard } from "@/components/properties/property-card"
import { SparklesIcon } from "lucide-react"

interface SimilarPropertiesProps {
  currentPropertyId: string
  properties: Property[]
}

export function SimilarProperties({ currentPropertyId, properties }: SimilarPropertiesProps) {
  const similar = properties.filter((p) => p.id !== currentPropertyId).slice(0, 4)

  if (similar.length === 0) return null

  return (
    <div className="space-y-6 pt-10 border-t border-border/50">
      <div className="flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-amber-500" />
        <h2 className="text-2xl font-bold tracking-tight font-heading text-foreground">
          Similar Luxury Properties
        </h2>
      </div>

      {/* Horizontal Scroll / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((property) => (
          <PropertyCard key={property.id} property={property} viewMode="grid" />
        ))}
      </div>
    </div>
  )
}
