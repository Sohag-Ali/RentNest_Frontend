"use client"

import React from "react"
import { Property } from "@/lib/mock-data/properties"
import { BedIcon, BathIcon, SquareIcon, HomeIcon, CalendarIcon } from "lucide-react"

interface PropertyQuickInfoProps {
  property: Property
}

export function PropertyQuickInfo({ property }: PropertyQuickInfoProps) {
  const infoItems = [
    {
      icon: <BedIcon className="h-5 w-5 text-primary" />,
      label: "Bedrooms",
      value: `${property.bedrooms} Beds`,
    },
    {
      icon: <BathIcon className="h-5 w-5 text-primary" />,
      label: "Bathrooms",
      value: `${property.bathrooms} Baths`,
    },
    {
      icon: <SquareIcon className="h-4.5 w-4.5 text-primary" />,
      label: "Living Area",
      value: `${property.areaSqFt.toLocaleString()} sqft`,
    },
    {
      icon: <HomeIcon className="h-5 w-5 text-primary" />,
      label: "Property Type",
      value: property.category,
    },
    {
      icon: <CalendarIcon className="h-5 w-5 text-primary" />,
      label: "Move-in Status",
      value: property.overview.availableFrom,
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-6">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-card border border-border/70 shadow-xs hover:border-primary/40 transition-colors"
        >
          <div className="p-2.5 rounded-xl bg-primary/10 mb-2">{item.icon}</div>
          <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
          <span className="text-sm font-bold text-foreground font-heading mt-0.5">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}
