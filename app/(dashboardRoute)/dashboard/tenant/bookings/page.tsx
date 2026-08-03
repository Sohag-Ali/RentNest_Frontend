import React from "react"
import { getMyRentals, TenantRentalItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-rental.actions"
import { TenantBookingsList } from "./_components/tenant-bookings-list"
import { HomeIcon, SparklesIcon } from "lucide-react"

/**
 * TenantBookingsPage Component (Server Component)
 * Route: /dashboard/tenant/bookings
 * 
 * Displays all confirmed properties paid for by the currently logged-in tenant.
 */
export default async function TenantBookingsPage() {
  const response = await getMyRentals()
  const rentals: TenantRentalItem[] = response.data || []

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
              My Bookings
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <SparklesIcon className="h-3 w-3" />
              Verified Lease
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your confirmed property stays, view lease details, inspect payment receipts, and submit reviews.
          </p>
        </div>
      </div>

      {/* Bookings List Client Component */}
      <TenantBookingsList initialBookings={rentals} />
    </div>
  )
}
