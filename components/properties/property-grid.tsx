"use client"

import React from "react"
import { Property } from "@/types/property"
import { PropertyCard } from "./property-card"

interface PropertyGridProps {
  properties: Property[]
  viewMode: "grid" | "list"
}

/**
 * PropertyGrid Component
 * 
 * Why this file exists:
 * Maps over the `properties` array received from the parent Server Component and renders individual `<PropertyCard />` items.
 * 
 * Why props:
 * Receives the array of backend properties and the active view mode ("grid" or "list").
 */
export function PropertyGrid({ properties, viewMode }: PropertyGridProps) {
  // Safe array check
  const list = Array.isArray(properties) ? properties : []

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-6">
        {list.map((property) => {
          const propId = (property as any)._id || property.id
          return <PropertyCard key={propId} property={property} viewMode="list" />
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((property) => {
        const propId = (property as any)._id || property.id
        return <PropertyCard key={propId} property={property} viewMode="grid" />
      })}
    </div>
  )
}
