"use client"

import React from "react"
import Link from "next/link"
import { AdminUser } from "../_actions/admin-user.actions"
import { Card } from "@/components/ui/card"
import {
  UsersIcon,
  ShieldIcon,
  Building2Icon,
  UserIcon,
  UserCheckIcon,
  UserMinusIcon,
  UserXIcon,
  ArrowRightIcon,
} from "lucide-react"

interface AdminStatsGridProps {
  users: AdminUser[]
}

/**
 * AdminStatsGrid Component (Client Component)
 * 
 * Why this file exists:
 * Displays 7 dynamic statistics cards calculated from live backend user data.
 * Features clickable cards (Total Users links directly to /dashboard/admin/users).
 */
export function AdminStatsGrid({ users }: AdminStatsGridProps) {
  const totalUsers = users.length
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length
  const totalLandlords = users.filter((u) => u.role === "LANDLORD").length
  const totalTenants = users.filter((u) => u.role === "TENANT").length

  const activeUsers = users.filter((u) => u.status === "ACTIVE").length
  const inactiveUsers = users.filter((u) => u.status === "INACTIVE").length
  const bannedUsers = users.filter((u) => u.status === "BANNED").length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Users (Clickable Card linking to /dashboard/admin/users) */}
      <Link href="/dashboard/admin/users" className="block group">
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm group-hover:shadow-md group-hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
              Total Users
            </span>
            <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
              <UsersIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-foreground font-mono">{totalUsers}</h3>
            <span className="text-[11px] font-bold text-primary flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              Manage <ArrowRightIcon className="h-3 w-3" />
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">All registered accounts</p>
        </Card>
      </Link>

      {/* 2. Total Admins */}
      <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">Total Admins</span>
          <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
            <ShieldIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">{totalAdmins}</h3>
          <p className="text-[11px] text-muted-foreground mt-1">System administrators</p>
        </div>
      </Card>

      {/* 3. Total Landlords */}
      <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">Total Landlords</span>
          <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
            <Building2Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{totalLandlords}</h3>
          <p className="text-[11px] text-muted-foreground mt-1">Property hosts</p>
        </div>
      </Card>

      {/* 4. Total Tenants */}
      <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">Total Tenants</span>
          <div className="h-10 w-10 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center border border-sky-500/20">
            <UserIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 font-mono">{totalTenants}</h3>
          <p className="text-[11px] text-muted-foreground mt-1">Renter accounts</p>
        </div>
      </Card>

      {/* 5. Active Users */}
      <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">Active Users</span>
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
            <UserCheckIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{activeUsers}</h3>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Active status accounts
          </p>
        </div>
      </Card>

      {/* 6. Inactive Users */}
      <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">Inactive Users</span>
          <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
            <UserMinusIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{inactiveUsers}</h3>
          <p className="text-[11px] text-muted-foreground mt-1">Unverified or idle</p>
        </div>
      </Card>

      {/* 7. Banned Users */}
      <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">Banned Users</span>
          <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
            <UserXIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{bannedUsers}</h3>
          <p className="text-[11px] text-rose-500 font-medium mt-1">Suspended users</p>
        </div>
      </Card>
    </div>
  )
}
