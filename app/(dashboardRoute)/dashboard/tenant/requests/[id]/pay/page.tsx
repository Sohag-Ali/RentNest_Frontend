import React from "react"
import Link from "next/link"
import Image from "next/image"
import { getMyRentals, TenantRentalItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-rental.actions"
import { PayCheckoutButton } from "./_components/pay-checkout-button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CreditCardIcon,
  ChevronLeftIcon,
  CheckCircle2Icon,
  MapPinIcon,
  CalendarIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
} from "lucide-react"

interface PaymentPageProps {
  params: Promise<{ id: string }>
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
 * TenantPaymentPage Component (Server Component)
 * 
 * Why this file exists:
 * Handles payment checkout UI for approved rental applications (/dashboard/tenant/requests/[id]/pay).
 * 
 * Why Server Component:
 * Validates request status directly on the server to prevent unauthorized access.
 */
export default async function TenantPaymentPage({ params }: PaymentPageProps) {
  // 1. Resolve dynamic route parameter `id` (Next.js 15 standard)
  const resolvedParams = await params
  const requestId = resolvedParams.id

  // 2. Fetch tenant rental requests using Server Action
  const response = await getMyRentals()
  const rentals: TenantRentalItem[] = response.data || []

  // 3. Find the selected rental request by its ID
  const rental = rentals.find((r) => r.id === requestId)

  // -------------------------------------------------------------
  // ACCESS CONTROL: Restrict access if request is missing or NOT APPROVED
  // -------------------------------------------------------------
  if (!rental || rental.status !== "APPROVED") {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <Link
          href="/dashboard/tenant/requests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Rental Requests
        </Link>

        <Card className="rounded-3xl border-border/80 bg-card p-10 text-center shadow-md">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-16 w-16 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center border border-rose-500/20">
              <AlertTriangleIcon className="h-8 w-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                This booking is not eligible for payment.
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Payment checkout is only accessible after your landlord approves your rental request application.
              </p>
            </div>

            <Button
              render={<Link href="/dashboard/tenant/requests" />}
              className="rounded-2xl px-6 h-11 text-xs font-bold bg-primary text-primary-foreground shadow-md"
            >
              Return to My Requests
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Calculate pricing summary
  const property = rental.property
  const landlord = property?.landlord
  const categoryName = formatCategoryName(property?.category)
  const propertyImage =
    property?.mainImage ||
    (Array.isArray(property?.images) && property.images[0]) ||
    DEFAULT_PROPERTY_IMAGE

  const rentAmount = property?.price || 0
  const serviceFee = 50 // Fixed platform service fee
  const totalAmount = rentAmount + serviceFee

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Navigation link back to requests list */}
      <div>
        <Link
          href="/dashboard/tenant/requests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to My Requests
        </Link>
      </div>

      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading flex items-center gap-2.5">
          <CreditCardIcon className="h-7 w-7 text-primary" />
          Lease Payment Checkout
        </h1>
        <p className="text-xs text-muted-foreground">
          Review your approved rental details and complete lease authorization payment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column: Property & Booking Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Property Overview Card */}
          <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md space-y-5">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Property Image Container */}
              <div className="relative w-full sm:w-44 h-32 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/50">
                <Image
                  src={propertyImage}
                  alt={property?.title || "Property Photo"}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>

              {/* Property Title & Specs */}
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="luxury" className="text-[10px]">
                    {categoryName}
                  </Badge>
                  <Badge variant="success" className="text-[10px] gap-1">
                    <CheckCircle2Icon className="h-3 w-3" />
                    Approved
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-foreground tracking-tight line-clamp-1">
                  {property?.title || "Rental Residence"}
                </h3>

                <p className="text-xs text-muted-foreground flex items-center gap-1 line-clamp-1">
                  <MapPinIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                  {property?.location || "Location N/A"}
                </p>

                <div className="text-xs text-muted-foreground pt-1 flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Move-in Date: </span>
                  <span className="font-semibold text-foreground">
                    {rental.moveInDate
                      ? new Date(rental.moveInDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Landlord Info Box */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border/40 text-xs">
              <Avatar className="h-9 w-9 border border-border shrink-0">
                <AvatarFallback>{landlord?.name ? landlord.name[0] : "L"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground">
                  Landlord: {landlord?.name || "Host"}
                </p>
                <p className="text-[11px] text-muted-foreground line-clamp-1">
                  Contact: {landlord?.email || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
              <ShieldCheckIcon className="h-4 w-4 shrink-0" />
              <span>Thikana Verified Lease Protection Included</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Payment Summary Breakdown */}
        <div className="md:col-span-1">
          <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-xl space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-foreground font-heading border-b border-border/40 pb-3">
              Payment Summary
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center text-muted-foreground">
                <span className="font-medium">Monthly Base Rent</span>
                <span className="font-mono font-bold text-foreground">
                  ৳{rentAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-muted-foreground">
                <span className="font-medium">Service & Processing Fee</span>
                <span className="font-mono font-bold text-foreground">
                  ৳{serviceFee}
                </span>
              </div>

              <div className="pt-3 border-t border-border/50 flex justify-between items-center text-sm font-bold text-foreground">
                <span>Total Amount Due</span>
                <span className="text-primary font-mono font-extrabold text-base">
                  ৳{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Interactive Server Action Action Button */}
            <PayCheckoutButton rentalRequestId={requestId} />

            <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
              By clicking Proceed to Payment, you agree to Thikana lease terms and conditions.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
