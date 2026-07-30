import React from "react"
import { getMyRentals, TenantRentalItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-rental.actions"
import { TenantRequestsList } from "./_components/tenant-requests-list"

/**
 * TenantRequestsPage Component (Server Component)
 * 
 * Why this file exists:
 * Top-level route component for managing tenant rental requests (/dashboard/tenant/requests).
 * 
 * Why Server Component:
 * Fetches tenant rental application data directly on the server for speed and SEO.
 */
export default async function TenantRequestsPage() {
  // Fetch tenant's submitted rental requests using Server Action
  const response = await getMyRentals()
  const rentals: TenantRentalItem[] = response.data || []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          My Rental Requests
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track the status of your submitted property application requests and proceed to payment once approved.
        </p>
      </div>

      {/* Client Component rendering request cards and status UI */}
      <TenantRequestsList initialRentals={rentals} />
    </div>
  )
}
