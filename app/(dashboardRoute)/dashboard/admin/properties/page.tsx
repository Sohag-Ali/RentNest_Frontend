import React from "react"
import { getAllAdminProperties, AdminProperty } from "../_actions/admin-property.actions"
import { PropertiesTable } from "./_components/properties-table"

/**
 * AdminPropertiesPage Component (Server Component)
 * 
 * Why this file exists:
 * Top-level route component for Admin Property Management (/dashboard/admin/properties).
 * 
 * Why Server Component:
 * Fetches all landlord property listings directly on the server via Server Action (GET /api/admin/properties).
 */
export default async function AdminPropertiesPage() {
  // Fetch property listings using Server Action
  const response = await getAllAdminProperties()
  const properties: AdminProperty[] = response.data || []
  const meta = response.meta || null
  const errorMessage = !response.success ? response.message : null

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          All Properties
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage every property listed by landlords across the RentNest platform.
        </p>
      </div>

      {/* Interactive TanStack Table Component */}
      <PropertiesTable
        initialProperties={properties}
        meta={meta}
        error={errorMessage}
      />
    </div>
  )
}
