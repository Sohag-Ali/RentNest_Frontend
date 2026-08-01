"use client"

import React from "react"
import { AdminProperty } from "../../_actions/admin-property.actions"
import { PropertyStatusBadge } from "./property-status-badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2Icon,
  MapPinIcon,
  UserIcon,
  TagIcon,
  DollarSignIcon,
  CalendarIcon,
  SparklesIcon,
  HomeIcon,
} from "lucide-react"

interface PropertyDetailsDialogProps {
  property: AdminProperty | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * PropertyDetailsDialog Component (Client Component)
 * 
 * Why this file exists:
 * Large Shadcn modal displaying comprehensive details of a selected property listing:
 * Title, Category, Landlord, Location, Price, Availability Badge, Created Date, Description, and Amenities.
 */
export function PropertyDetailsDialog({
  property,
  open,
  onOpenChange,
}: PropertyDetailsDialogProps) {
  if (!property) return null

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price || 0)

  const createdFormatted = property.createdAt
    ? new Date(property.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A"

  const landlordName = property.landlord?.name || "Unknown Landlord"
  const categoryName = property.category?.name || "General"
  const amenitiesList = Array.isArray(property.amenities) ? property.amenities : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-card border-border/80 shadow-2xl space-y-6">
        {/* Header */}
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline" className="text-xs font-bold border-primary/40 text-primary bg-primary/10 gap-1">
              <HomeIcon className="h-3.5 w-3.5" />
              Property Details
            </Badge>
            <PropertyStatusBadge isAvailable={property.isAvailable} />
          </div>

          <DialogTitle className="text-2xl font-extrabold font-heading text-foreground pt-1">
            {property.title}
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground flex items-center gap-1.5 pt-0.5">
            <MapPinIcon className="h-3.5 w-3.5 text-rose-500 shrink-0" />
            <span>{property.location}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Highlight Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-muted/40 border border-border/40 text-xs">
          {/* Price */}
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold">
              <DollarSignIcon className="h-3.5 w-3.5 text-emerald-500" /> Price
            </span>
            <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {formattedPrice}
            </p>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold">
              <TagIcon className="h-3.5 w-3.5 text-blue-500" /> Category
            </span>
            <p className="text-xs font-bold text-foreground line-clamp-1">{categoryName}</p>
          </div>

          {/* Landlord */}
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold">
              <UserIcon className="h-3.5 w-3.5 text-purple-500" /> Landlord
            </span>
            <p className="text-xs font-bold text-foreground line-clamp-1">{landlordName}</p>
          </div>

          {/* Created Date */}
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold">
              <CalendarIcon className="h-3.5 w-3.5 text-amber-500" /> Listed On
            </span>
            <p className="text-xs font-medium text-foreground">{createdFormatted}</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Building2Icon className="h-4 w-4 text-primary" />
            Description
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-4 rounded-2xl border border-border/30">
            {property.description || "No property description provided."}
          </p>
        </div>

        {/* Amenities as Badges */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <SparklesIcon className="h-4 w-4 text-amber-500" />
            Amenities ({amenitiesList.length})
          </h4>
          {amenitiesList.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">No amenities specified for this listing.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((amenity, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-xs px-3 py-1 rounded-xl bg-primary/10 text-primary border-primary/20 font-medium"
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-2xl h-10 px-6 text-xs font-bold"
          >
            Close Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
