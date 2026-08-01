import React from "react"
import { getAllAdminRentals, AdminRental } from "../_actions/admin-rental.actions"
import { RentalsTable } from "./_components/rentals-table"

/**
 * AdminRentalsPage Component (Server Component)
 * 
 * Why this file exists:
 * Top-level route component for Admin Rental Management (/dashboard/admin/rentals).
 * 
 * Why Server Component:
 * Fetches platform rental applications directly on the server via Server Action (GET /api/admin/rentals).
 */
export default async function AdminRentalsPage() {
  // Fetch rental applications using Server Action
  const response = await getAllAdminRentals()
  const rentals: AdminRental[] = response.data || []
  const meta = response.meta || null
  const errorMessage = !response.success ? response.message : null

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          Rental Management
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor every rental request across the platform.
        </p>
      </div>

      {/* Interactive TanStack Table Component */}
      <RentalsTable
        initialRentals={rentals}
        meta={meta}
        error={errorMessage}
      />
    </div>
  )
}
