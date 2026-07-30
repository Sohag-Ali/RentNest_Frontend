"use client"

import React from "react"
import { Property } from "@/types/property"
import { PropertyCard } from "@/components/properties/property-card"
import { SparklesIcon } from "lucide-react"

interface SimilarPropertiesProps {
  currentPropertyId: string
  properties: Property[]
}

/**
 * SimilarProperties Component
 * 
 * Why this file exists:
 * Displays up to 3 or 4 similar property listings at the bottom of the property details page.
 * 
 * Why props:
 * Receives `currentPropertyId` to exclude the active property, and `properties` list.
 */
export function SimilarProperties({ currentPropertyId, properties }: SimilarPropertiesProps) {
  // Filter out the property currently being viewed by comparing IDs (handling MongoDB _id or standard id)
  const similar = (Array.isArray(properties) ? properties : [])
    .filter((p) => {
      const pId = (p as any)._id || p.id
      return pId !== currentPropertyId
    })
    .slice(0, 3)

  // If no other properties exist, do not render this section
  if (similar.length === 0) return null

  return (
    <div className="space-y-6 pt-10 border-t border-border/50">
      <div className="flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-amber-500" />
        <h2 className="text-2xl font-bold tracking-tight font-heading text-foreground">
          Similar Luxury Properties
        </h2>
      </div>

      {/* Grid displaying similar property cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((property) => {
          const propId = (property as any)._id || property.id
          return <PropertyCard key={propId} property={property} viewMode="grid" />
        })}
      </div>
    </div>
  )
}
