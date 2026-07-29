"use client"

import React from "react"
import { Property } from "@/lib/mock-data/properties"
import { PropertyCard } from "./property-card"

interface PropertyGridProps {
  properties: Property[]
  viewMode: "grid" | "list"
}

export function PropertyGrid({ properties, viewMode }: PropertyGridProps) {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} viewMode="list" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} viewMode="grid" />
      ))}
    </div>
  )
}
