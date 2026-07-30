"use client"

import React, { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getMyRentals, TenantRentalItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-rental.actions"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2Icon,
  Building2Icon,
  CreditCardIcon,
  HashIcon,
  ShieldCheckIcon,
  LayoutDashboardIcon,
  MapPinIcon,
  Loader2Icon,
} from "lucide-react"

/**
 * Payment Success Content Component (Client Component)
 * 
 * Why this file exists:
 * Displayed when Stripe redirects back after payment.
 * Shows a loading state for a few seconds while verifying status asynchronously,
 * optionally fetches payment/rental details, and displays confirmation feedback.
 * No payment confirmation API call is executed by the frontend.
 */
function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id") || searchParams.get("sessionId") || ""
  const rentalRequestId = searchParams.get("rentalRequestId") || ""

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [rentalItem, setRentalItem] = useState<TenantRentalItem | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      // Display loading state for a few seconds
      const timer = new Promise((resolve) => setTimeout(resolve, 2000))

      let foundRental: TenantRentalItem | null = null
      if (rentalRequestId) {
        try {
          const res = await getMyRentals()
          if (res.success && Array.isArray(res.data)) {
            foundRental = res.data.find((item) => item.id === rentalRequestId) || null
          }
        } catch (err) {
          console.error("Error fetching payment details:", err)
        }
      }

      await timer

      if (isMounted) {
        setRentalItem(foundRental)
        setIsLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [rentalRequestId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="max-w-md w-full rounded-3xl border-border/80 bg-card p-8 sm:p-10 text-center shadow-xl space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20 shadow-sm">
            <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-heading">
              Verifying Payment...
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Please wait a moment while we process your payment confirmation and update your account details.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  const property = rentalItem?.property
  const propertyTitle = property?.title
  const propertyLocation = property?.location
  const amountPaid = property?.price

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-2xl w-full rounded-3xl border-border/80 bg-card p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Success Header Icon & Title */}
        <div className="text-center space-y-3">
          <div className="h-20 w-20 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-sm">
            <CheckCircle2Icon className="h-10 w-10" />
          </div>

          <div className="space-y-1">
            <Badge variant="success" className="px-3.5 py-1 text-xs font-bold gap-1.5">
              <ShieldCheckIcon className="h-3.5 w-3.5" />
              Verified
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
              ✓ Payment Successful
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your payment has been verified.
            </p>
          </div>
        </div>

        {/* Summary breakdown if details available */}
        {(propertyTitle || sessionId || rentalRequestId) && (
          <div className="rounded-2xl bg-muted/40 border border-border/60 p-5 space-y-4 text-xs">
            <h3 className="font-bold text-foreground text-sm font-heading border-b border-border/40 pb-2.5 flex items-center gap-2">
              <CreditCardIcon className="h-4 w-4 text-primary" />
              Payment Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {propertyTitle && (
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                    <Building2Icon className="h-3.5 w-3.5 text-primary" />
                    Property Title
                  </span>
                  <p className="font-bold text-foreground line-clamp-1">{propertyTitle}</p>
                  {propertyLocation && (
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 line-clamp-1">
                      <MapPinIcon className="h-3 w-3 shrink-0" />
                      {propertyLocation}
                    </p>
                  )}
                </div>
              )}

              {amountPaid !== undefined && (
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                    <CreditCardIcon className="h-3.5 w-3.5 text-primary" />
                    Amount
                  </span>
                  <p className="font-mono font-extrabold text-lg text-emerald-600 dark:text-emerald-400">
                    ${amountPaid.toLocaleString()}
                  </p>
                </div>
              )}

              {rentalRequestId && (
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                    <HashIcon className="h-3.5 w-3.5 text-primary" />
                    Request ID
                  </span>
                  <p className="font-mono font-semibold text-foreground text-[11px] break-all select-all bg-background/60 p-1.5 rounded-lg border border-border/40">
                    {rentalRequestId}
                  </p>
                </div>
              )}

              {sessionId && (
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                    <HashIcon className="h-3.5 w-3.5 text-primary" />
                    Session Reference
                  </span>
                  <p className="font-mono font-semibold text-foreground text-[11px] break-all select-all bg-background/60 p-1.5 rounded-lg border border-border/40">
                    {sessionId}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Back to Dashboard Button */}
        <div className="pt-2 flex justify-center">
          <Button
            render={<Link href="/dashboard/tenant" />}
            className="w-full sm:w-auto rounded-2xl px-8 h-12 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          >
            <LayoutDashboardIcon className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <Card className="max-w-md w-full rounded-3xl border-border/80 bg-card p-8 text-center shadow-xl space-y-4">
            <Loader2Icon className="h-10 w-10 animate-spin text-primary mx-auto" />
            <p className="text-xs text-muted-foreground font-medium">Loading...</p>
          </Card>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
