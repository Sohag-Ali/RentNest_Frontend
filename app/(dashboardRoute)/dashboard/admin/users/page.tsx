import React from "react"
import { getAdminUsers, AdminUser } from "../_actions/admin-user.actions"
import { AdminUsersTable } from "../_components/admin-users-table"

/**
 * AdminUsersPage Component (Server Component)
 * 
 * Why this file exists:
 * Top-level route component for Admin User Management (/dashboard/admin/users).
 * 
 * Why Server Component:
 * Fetches system user accounts directly on the server for security and performance.
 */
export default async function AdminUsersPage() {
  // Fetch user accounts using Server Action (GET /api/admin/users)
  const response = await getAdminUsers()
  const users: AdminUser[] = response.data || []
  const meta = response.meta || null

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          User Management
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage system accounts, inspect user roles, and update account statuses (ACTIVE, INACTIVE, BANNED).
        </p>
      </div>

      {/* Interactive TanStack Table Component for Stats, Search, Filters & User Actions */}
      <AdminUsersTable initialUsers={users} meta={meta} />
    </div>
  )
}
