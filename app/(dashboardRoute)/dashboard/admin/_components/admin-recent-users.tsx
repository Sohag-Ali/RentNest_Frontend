"use client"

import React from "react"
import Link from "next/link"
import { AdminUser } from "../_actions/admin-user.actions"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  ArrowRightIcon,
  ShieldIcon,
  Building2Icon,
  UserIcon,
} from "lucide-react"

interface AdminRecentUsersProps {
  users: AdminUser[]
}

/**
 * AdminRecentUsers Component (Client Component)
 * 
 * Why this file exists:
 * Displays the 5 most recently registered platform users on the Admin Overview Dashboard.
 */
export function AdminRecentUsers({ users }: AdminRecentUsersProps) {
  // Sort by createdAt descending and pick top 5
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 5)

  if (recentUsers.length === 0) {
    return (
      <Card className="rounded-3xl border-border/80 bg-card p-8 text-center shadow-sm">
        <p className="text-xs text-muted-foreground">No recent user registrations found.</p>
      </Card>
    )
  }

  return (
    <Card className="rounded-3xl border-border/70 bg-card shadow-sm overflow-hidden p-0 space-y-0">
      {/* Table Header Banner */}
      <div className="p-5 sm:p-6 border-b border-border/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground font-heading">Recent Users</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest 5 user accounts registered on RentNest
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/admin/users" />}
          variant="outline"
          size="sm"
          className="rounded-2xl text-xs font-bold gap-1.5 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <span>View All Users</span>
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="text-xs font-bold text-foreground py-3.5 pl-6">User</TableHead>
              <TableHead className="text-xs font-bold text-foreground py-3.5">Role</TableHead>
              <TableHead className="text-xs font-bold text-foreground py-3.5">Status</TableHead>
              <TableHead className="text-xs font-bold text-foreground py-3.5">Created Date</TableHead>
              <TableHead className="text-xs font-bold text-foreground py-3.5 pr-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentUsers.map((user) => {
              const initials = user.name ? user.name[0].toUpperCase() : "U"
              const createdFormatted = user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"

              return (
                <TableRow key={user.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                  {/* User Cell */}
                  <TableCell className="py-3.5 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-foreground line-clamp-1">{user.name}</h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role Cell */}
                  <TableCell className="py-3.5">
                    {user.role === "ADMIN" ? (
                      <Badge variant="outline" className="text-[10px] font-bold border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/10 gap-1">
                        <ShieldIcon className="h-3 w-3" />
                        ADMIN
                      </Badge>
                    ) : user.role === "LANDLORD" ? (
                      <Badge variant="outline" className="text-[10px] font-bold border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10 gap-1">
                        <Building2Icon className="h-3 w-3" />
                        LANDLORD
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] font-bold border-slate-500/40 text-slate-600 dark:text-slate-400 bg-slate-500/10 gap-1">
                        <UserIcon className="h-3 w-3" />
                        TENANT
                      </Badge>
                    )}
                  </TableCell>

                  {/* Status Cell */}
                  <TableCell className="py-3.5">
                    {user.status === "ACTIVE" ? (
                      <Badge variant="success" className="gap-1 text-[10px]">
                        <CheckCircle2Icon className="h-3 w-3" />
                        ACTIVE
                      </Badge>
                    ) : user.status === "BANNED" ? (
                      <Badge variant="destructive" className="gap-1 text-[10px]">
                        <XCircleIcon className="h-3 w-3" />
                        BANNED
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="gap-1 text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
                      >
                        <ClockIcon className="h-3 w-3" />
                        INACTIVE
                      </Badge>
                    )}
                  </TableCell>

                  {/* Created Date Cell */}
                  <TableCell className="py-3.5 text-xs text-muted-foreground font-medium">
                    {createdFormatted}
                  </TableCell>

                  {/* Action Button Cell */}
                  <TableCell className="py-3.5 pr-6 text-right">
                    <Button
                      render={<Link href="/dashboard/admin/users" />}
                      variant="ghost"
                      size="sm"
                      className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-primary hover:bg-primary/10"
                    >
                      <EyeIcon className="h-3.5 w-3.5" />
                      <span>View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
