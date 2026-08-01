"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { TenantRentalItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-rental.actions"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  CheckCircle2Icon,
  XCircleIcon,
  HourglassIcon,
  Building2Icon,
  ShieldCheckIcon,
} from "lucide-react"

interface TenantRequestsListProps {
  initialRentals: TenantRentalItem[]
}

/**
 * Format category name cleanly, converting raw UUIDs or template strings to human readable text
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
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"

/**
 * TenantRequestsList Component (Client Component)
 * 
 * Why this file exists:
 * Displays tenant rental application requests in Shadcn Cards with status-specific badges and action buttons.
 * Automatically syncs state with server component updates and handles COMPLETED statuses after payment.
 * 
 * Why props:
 * Receives the initial rentals list fetched by the parent Server Component page.
 */
export function TenantRequestsList({ initialRentals }: TenantRequestsListProps) {
  const router = useRouter()
  const [rentals, setRentals] = useState<TenantRentalItem[]>(initialRentals)

  // Keep client component state in sync with Server Component props when data is re-fetched
  useEffect(() => {
    setRentals(initialRentals)
  }, [initialRentals])

  // Trigger router refresh on mount to clear any stale client-side router cache
  useEffect(() => {
    router.refresh()
  }, [router])

  // -------------------------------------------------------------
  // EMPTY STATE: Displayed when tenant has zero requests
  // -------------------------------------------------------------
  if (!rentals || rentals.length === 0) {
    return (
      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
            <Building2Icon className="h-10 w-10" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              You haven&apos;t requested any properties yet.
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Explore available luxury property listings and click &quot;Request Booking Now&quot; to apply for a lease.
            </p>
          </div>
          <Button
            render={<Link href="/properties" />}
            className="rounded-2xl px-6 h-11 text-xs font-bold bg-primary text-primary-foreground shadow-md"
          >
            Browse Properties
          </Button>
        </div>
      </Card>
    )
  }

  // -------------------------------------------------------------
  // MAIN RENTAL REQUEST CARDS LIST
  // -------------------------------------------------------------
  return (
    <div className="space-y-5">
      {rentals.map((rental) => {
        const property = rental.property
        const landlord = property?.landlord
        const categoryName = formatCategoryName(property?.category)
        const propertyImage =
          property?.mainImage ||
          (Array.isArray(property?.images) && property.images[0]) ||
          DEFAULT_PROPERTY_IMAGE

        const isCompleted = rental.status === "COMPLETED"

        return (
          <Card
            key={rental.id}
            className="rounded-3xl border-border/70 bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Section: Property Image & Information */}
              <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                {/* Property Main Image */}
                <div className="relative w-full sm:w-44 h-36 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/50">
                  <Image
                    src={propertyImage}
                    alt={property?.title || "Property Photo"}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="glass" className="text-[10px]">
                      {categoryName}
                    </Badge>
                  </div>
                </div>

                {/* Details Container */}
                <div className="space-y-3 flex-1 min-w-0">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground line-clamp-1">
                      {property?.title || "Rental Property"}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPinIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                      {property?.location || "Location N/A"}
                    </p>
                  </div>

                  {/* Landlord Contact Info */}
                  <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-muted/40 border border-border/40 text-xs">
                    <Avatar className="h-7 w-7 border border-border shrink-0">
                      <AvatarFallback>{landlord?.name ? landlord.name[0] : "L"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-foreground line-clamp-1">
                        Host: {landlord?.name || "Landlord"} ({landlord?.email || "N/A"})
                      </p>
                    </div>
                  </div>

                  {/* Dates Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <CalendarIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>Move-in Date: </span>
                      <span className="font-semibold">
                        {rental.moveInDate
                          ? new Date(rental.moveInDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px]">
                      <ClockIcon className="h-3 w-3 shrink-0" />
                      <span>Requested: </span>
                      <span>
                        {rental.createdAt
                          ? new Date(rental.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section: Rent Price & Status-driven Action UI */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-border/50 gap-4 shrink-0">
                {/* Rent Price Tag */}
                <div className="text-left lg:text-right">
                  <span className="text-2xl font-extrabold text-foreground font-mono">
                    ${property?.price ? property.price.toLocaleString() : 0}
                  </span>
                  <span className="text-xs text-muted-foreground"> / month</span>
                </div>

                {/* Status UI & Conditional Action Button */}
                <div className="space-y-2 text-left lg:text-right">
                  {isCompleted ? (
                    /* COMPLETED STATUS: Green Badge + View Payment Button */
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 justify-start lg:justify-end">
                        <Badge
                          variant="success"
                          className="gap-1 px-3 py-1 text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold"
                        >
                          <ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                          Completed
                        </Badge>
                      </div>

                      <Button
                        render={<Link href={`/payment/success?rentalRequestId=${rental.id}`} />}
                        className="rounded-2xl px-5 h-9 text-xs font-bold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center"
                      >
                        <CreditCardIcon className="h-4 w-4" />
                        <span>View Payment</span>
                      </Button>
                    </div>
                  ) : rental.status === "APPROVED" ? (
                    /* APPROVED STATUS: Green Badge + Large "Pay Now" Button */
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 justify-start lg:justify-end">
                        <Badge variant="success" className="gap-1 px-3 py-1 text-xs">
                          <CheckCircle2Icon className="h-3.5 w-3.5" />
                          Approved
                        </Badge>
                      </div>

                      <Button
                        render={<Link href={`/dashboard/tenant/requests/${rental.id}/pay`} />}
                        className="rounded-2xl px-6 h-10 text-xs font-bold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center"
                      >
                        <CreditCardIcon className="h-4 w-4" />
                        <span>Pay Now</span>
                      </Button>
                    </div>
                  ) : rental.status === "REJECTED" ? (
                    /* REJECTED STATUS: Red Badge + "Request Rejected" text */
                    <div className="space-y-1">
                      <Badge variant="destructive" className="gap-1 px-3 py-1 text-xs">
                        <XCircleIcon className="h-3.5 w-3.5" />
                        Rejected
                      </Badge>
                      <p className="text-[11px] text-rose-500 font-semibold">
                        Request Rejected
                      </p>
                    </div>
                  ) : (
                    /* PENDING STATUS: Yellow Badge + Waiting for landlord approval */
                    <div className="space-y-1">
                      <Badge
                        variant="secondary"
                        className="gap-1 px-3 py-1 text-xs bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
                      >
                        <HourglassIcon className="h-3.5 w-3.5" />
                        Pending
                      </Badge>
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                        Waiting for landlord approval
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

/**
 * Skeleton Loader Component for Tenant Requests
 */
export function TenantRequestsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="w-full sm:w-44 h-36 rounded-2xl" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
