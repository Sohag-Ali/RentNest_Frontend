import React from "react"
import { getLandlordRequests, LandlordRequestItem } from "@/app/(dashboardRoute)/_action/landlord-request.actions"
import { LandlordRequestsList } from "./_components/landlord-requests-list"

/**
 * LandlordRequestsPage Component (Server Component)
 * 
 * Why this file exists:
 * Top-level route component for managing landlord incoming booking requests (/dashboard/landlord/requests).
 * 
 * Why Server Component:
 * Fetches data on the server before sending HTML to the browser.
 */
export default async function LandlordRequestsPage() {
  // Fetch incoming booking requests using Server Action
  const response = await getLandlordRequests()
  const requests: LandlordRequestItem[] = response.data || []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Description */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          Incoming Booking Requests
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review, approve, or reject tenant lease applications for your properties.
        </p>
      </div>

      {/* Client Component rendering request cards and interactive action dialogs */}
      <LandlordRequestsList initialRequests={requests} />
    </div>
  )
}