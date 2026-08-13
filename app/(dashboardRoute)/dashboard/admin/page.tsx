import React from "react"
import { getAdminUsers, AdminUser } from "./_actions/admin-user.actions"
import { AdminStatsGrid } from "./_components/admin-stats-grid"
import { AdminRecentUsers } from "./_components/admin-recent-users"

/**
 * AdminDashboardPage Component (Server Component)
 * 
 * Why this file exists:
 * Top-level route component for Admin Overview Dashboard (/dashboard/admin).
 * 
 * Why Server Component:
 * Fetches platform user accounts directly on the server to render 7 metric cards and recent users.
 */
export default async function AdminDashboardPage() {
  // Fetch user accounts via Server Action (GET /api/admin/users)
  const response = await getAdminUsers()
  const users: AdminUser[] = response.data || []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          Admin Dashboard Overview 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor Thikana system metrics, user registrations, and platform account activity.
        </p>
      </div>

      {/* 7 Dynamic Statistics Cards Grid */}
      <AdminStatsGrid users={users} />

      {/* Recent 5 Users Table */}
      <AdminRecentUsers users={users} />
    </div>
  )
}