"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { TenantRentalItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-rental.actions"
import { SubmitReviewModal } from "@/components/reviews/SubmitReviewModal"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Building2Icon,
  MapPinIcon,
  CalendarIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  StarIcon,
  ExternalLinkIcon,
  SearchIcon,
  MessageSquareIcon,
  HomeIcon,
  CheckCircle2Icon,
} from "lucide-react"

interface TenantBookingsListProps {
  initialBookings: TenantRentalItem[]
}

/**
 * Format category name cleanly
 */
const formatCategoryName = (category: any): string => {
  let name = ""
  if (typeof category === "object" && category?.name) {
    name = category.name
  } else if (typeof category === "string") {
    name = category
  }

  if (
    !name ||
    name.includes("YOUR_CATEGORY") ||
    name.length > 25 ||
    /^[0-9a-f-]{30,}$/i.test(name)
  ) {
    return "Apartment"
  }
  return name
}

/**
 * Default fallback property image URL
 */
const DEFAULT_PROPERTY_IMAGE =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"

/**
 * Extract real property image dynamically
 */
const getPropertyImageUrl = (property: any): string => {
  if (!property) return DEFAULT_PROPERTY_IMAGE

  if (typeof property.mainImage === "string" && property.mainImage.trim() !== "") {
    return property.mainImage.trim()
  }
  if (typeof property.main_image === "string" && property.main_image.trim() !== "") {
    return property.main_image.trim()
  }
  if (typeof property.image === "string" && property.image.trim() !== "") {
    return property.image.trim()
  }
  if (typeof property.imageUrl === "string" && property.imageUrl.trim() !== "") {
    return property.imageUrl.trim()
  }
  if (typeof property.featuredImage === "string" && property.featuredImage.trim() !== "") {
    return property.featuredImage.trim()
  }
  if (Array.isArray(property.images) && property.images.length > 0) {
    const firstImg = property.images[0]
    if (typeof firstImg === "string" && firstImg.trim() !== "") {
      return firstImg.trim()
    }
    if (typeof firstImg === "object" && firstImg?.url && typeof firstImg.url === "string") {
      return firstImg.url.trim()
    }
  }
  return DEFAULT_PROPERTY_IMAGE
}

export function TenantBookingsList({ initialBookings }: TenantBookingsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter completed & paid bookings
  const bookings = initialBookings.filter(
    (item) => item.status === "COMPLETED" || item.payment?.status === "COMPLETED" || item.payment?.status === "paid"
  )

  const filteredBookings = bookings.filter((booking) => {
    const title = booking.property?.title || ""
    const location = booking.property?.location || ""
    const category = formatCategoryName(booking.property?.category)
    const query = searchQuery.toLowerCase().trim()

    return (
      title.toLowerCase().includes(query) ||
      location.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query)
    )
  })

  const totalSpent = bookings.reduce((sum, item) => sum + (item.property?.price || item.payment?.amount || 0), 0)

  if (bookings.length === 0) {
    return (
      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
            <HomeIcon className="h-10 w-10" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              No confirmed bookings yet
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When your rental applications are approved and payment is completed, your confirmed property stays will be displayed here.
            </p>
          </div>
          <Button
            render={<Link href="/dashboard/tenant/requests" />}
            className="rounded-2xl px-6 h-11 text-xs font-bold bg-primary text-primary-foreground shadow-md"
          >
            Check My Rental Requests
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 rounded-3xl border border-border/70 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Confirmed Stays</span>
          <div className="text-3xl font-extrabold text-foreground font-mono mt-1">{bookings.length}</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">Active Lease Contracts</p>
        </Card>

        <Card className="p-5 rounded-3xl border border-border/70 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Total Rent Paid</span>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            ${totalSpent.toLocaleString()}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Verified Stripe Transactions</p>
        </Card>

        <Card className="p-5 rounded-3xl border border-border/70 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Lease Protection</span>
          <div className="text-base font-bold text-foreground mt-2 flex items-center gap-1.5">
            <ShieldCheckIcon className="h-5 w-5 text-emerald-500" />
            RentNest Verified
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Full Tenant Protection</p>
        </Card>
      </div>

      {/* Search Toolbar */}
      <Card className="p-4 rounded-3xl border border-border/70 bg-card shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by property title, location, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 text-xs rounded-2xl border-border/60 bg-muted/30 focus-visible:ring-primary"
          />
        </div>
      </Card>

      {/* Bookings Card List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredBookings.map((booking) => {
          const property = booking.property
          const landlord = property?.landlord
          const categoryName = formatCategoryName(property?.category)
          const propertyImage = getPropertyImageUrl(property)
          const review = booking.review

          const moveInFormatted = booking.moveInDate
            ? new Date(booking.moveInDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"

          const paidDateFormatted = booking.payment?.paidAt || booking.createdAt
            ? new Date(booking.payment?.paidAt || booking.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"

          return (
            <Card
              key={booking.id}
              className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Property Real Image & Info */}
                <div className="flex flex-col sm:flex-row items-start gap-5 flex-1 min-w-0">
                  <div className="relative w-full sm:w-56 h-44 sm:h-48 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/60 shadow-xs">
                    <Image
                      src={propertyImage}
                      alt={property?.title || "Property Image"}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 224px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <Badge variant="glass" className="text-[11px] font-semibold px-2.5 py-0.5 backdrop-blur-md bg-background/80">
                        {categoryName}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 min-w-0">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5">
                          <CheckCircle2Icon className="h-3 w-3 mr-1" /> Verified Booking
                        </Badge>
                      </div>

                      <h3 className="text-xl font-extrabold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors font-heading">
                        {property?.title || "Booked Residence"}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                        <MapPinIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{property?.location || "Location N/A"}</span>
                      </p>
                    </div>

                    {/* Host Contact Profile */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/40 text-xs">
                      <Avatar className="h-9 w-9 border border-primary/20 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                          {landlord?.name ? landlord.name[0].toUpperCase() : "L"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground line-clamp-1">
                          Host: {landlord?.name || "Landlord"}
                        </p>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">
                          {landlord?.email || "No email available"}
                        </p>
                      </div>
                    </div>

                    {/* Move-in & Paid metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <CalendarIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>Move-in Date: </span>
                        <span className="font-semibold text-primary">{moveInFormatted}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px]">
                        <CreditCardIcon className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        <span>Paid: </span>
                        <span>{paidDateFormatted}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Rent Price & Interactive Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-border/50 gap-4 shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-3xl font-extrabold text-foreground font-mono">
                      ${property?.price ? property.price.toLocaleString() : 0}
                    </span>
                    <span className="text-xs text-muted-foreground"> / month</span>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-wrap items-center gap-2 justify-start lg:justify-end">
                    {/* View Details Button */}
                    {property?.id && (
                      <Button
                        render={<Link href={`/properties/${property.id}`} />}
                        className="rounded-2xl px-4 h-10 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                        <span>View Details</span>
                      </Button>
                    )}

                    {/* View Payment Receipt Button */}
                    <Button
                      render={<Link href={`/payment/success?rentalRequestId=${booking.id}`} />}
                      variant="outline"
                      className="rounded-2xl px-4 h-10 text-xs font-bold gap-1.5 border-border/80 hover:bg-muted"
                    >
                      <CreditCardIcon className="h-4 w-4" />
                      <span>Receipt</span>
                    </Button>

                    {/* Review Button / Status */}
                    {review ? (
                      <div className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-2xl border border-amber-500/20 text-xs font-bold">
                        <StarIcon className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span>{review.rating}/5 Reviewed</span>
                      </div>
                    ) : (
                      <SubmitReviewModal
                        rentalRequestId={booking.id}
                        propertyTitle={property?.title}
                        onSuccess={() => window.location.reload()}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
