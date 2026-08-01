"use client"

import React, { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { AdminUser, AdminUserMeta } from "../_actions/admin-user.actions"
import { UpdateStatusDialog } from "./update-status-dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  UsersIcon,
  UserCheckIcon,
  UserMinusIcon,
  UserXIcon,
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  EyeIcon,
  UserCogIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShieldIcon,
  Building2Icon,
  UserIcon,
} from "lucide-react"

interface AdminUsersTableProps {
  initialUsers: AdminUser[]
  meta?: AdminUserMeta | null
}

const ITEMS_PER_PAGE = 5

/**
 * AdminUsersTable Component (Client Component)
 * 
 * Why this file exists:
 * Modern TanStack Table component for Admin User Management.
 * Manages search, role & status filtering, backend metadata pagination, responsive layout,
 * and status update confirmation dialogs.
 */
export function AdminUsersTable({ initialUsers, meta }: AdminUsersTableProps) {
  const router = useRouter()
  const [users, setUsers] = useState<AdminUser[]>(initialUsers)
  const [globalFilter, setGlobalFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("ALL")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")

  // Status Change Dialog State
  const [selectedUserForStatus, setSelectedUserForStatus] = useState<AdminUser | null>(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState<boolean>(false)

  // Keep internal state updated when props are revalidated by Server Action
  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  // -------------------------------------------------------------
  // STATS CARDS METRICS
  // -------------------------------------------------------------
  const totalUsersCount = meta?.total || users.length
  const activeCount = useMemo(() => users.filter((u) => u.status === "ACTIVE").length, [users])
  const inactiveCount = useMemo(() => users.filter((u) => u.status === "INACTIVE").length, [users])
  const bannedCount = useMemo(() => users.filter((u) => u.status === "BANNED").length, [users])

  // Filtered dataset for TanStack Table
  const filteredData = useMemo(() => {
    return users.filter((user) => {
      const name = user.name || ""
      const email = user.email || ""
      const query = globalFilter.toLowerCase().trim()
      const matchesSearch = name.toLowerCase().includes(query) || email.toLowerCase().includes(query)

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter
      const matchesStatus = statusFilter === "ALL" || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, globalFilter, roleFilter, statusFilter])

  const openChangeStatusModal = (user: AdminUser) => {
    setSelectedUserForStatus(user)
    setIsStatusDialogOpen(true)
  }

  // -------------------------------------------------------------
  // TANSTACK TABLE COLUMNS DEFINITION
  // -------------------------------------------------------------
  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
          const user = row.original
          const initials = user.name ? user.name[0].toUpperCase() : "U"
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-foreground line-clamp-1">{user.name}</h4>
                <p className="text-[11px] text-muted-foreground line-clamp-1">{user.email}</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.original.role
          return role === "ADMIN" ? (
            <Badge variant="outline" className="text-[10px] font-bold border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/10 gap-1">
              <ShieldIcon className="h-3 w-3" />
              ADMIN
            </Badge>
          ) : role === "LANDLORD" ? (
            <Badge variant="outline" className="text-[10px] font-bold border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10 gap-1">
              <Building2Icon className="h-3 w-3" />
              LANDLORD
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] font-bold border-slate-500/40 text-slate-600 dark:text-slate-400 bg-slate-500/10 gap-1">
              <UserIcon className="h-3 w-3" />
              TENANT
            </Badge>
          )
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status
          return status === "ACTIVE" ? (
            <Badge variant="success" className="gap-1 text-[11px]">
              <CheckCircle2Icon className="h-3 w-3" />
              ACTIVE
            </Badge>
          ) : status === "BANNED" ? (
            <Badge variant="destructive" className="gap-1 text-[11px]">
              <XCircleIcon className="h-3 w-3" />
              BANNED
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="gap-1 text-[11px] bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
            >
              <ClockIcon className="h-3 w-3" />
              INACTIVE
            </Badge>
          )
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        cell: ({ row }) => {
          const createdAt = row.original.createdAt
          return (
            <span className="text-xs text-muted-foreground font-medium">
              {createdAt
                ? new Date(createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
          )
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right pr-2">Actions</div>,
        cell: ({ row }) => {
          const user = row.original
          return (
            <div className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-xl hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer">
                  <MoreVerticalIcon className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="rounded-2xl w-44 p-1.5 shadow-xl">
                  <DropdownMenuItem
                    onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
                    className="rounded-xl text-xs font-semibold gap-2 cursor-pointer"
                  >
                    <EyeIcon className="h-3.5 w-3.5 text-primary" />
                    <span>View User</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-border/50" />

                  <DropdownMenuItem
                    onClick={() => openChangeStatusModal(user)}
                    className="rounded-xl text-xs font-semibold gap-2 cursor-pointer"
                  >
                    <UserCogIcon className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Change Status</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      },
    ],
    [router]
  )

  // Initialize TanStack Table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: ITEMS_PER_PAGE,
      },
    },
  })

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP STATISTICS CARDS                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Users</span>
            <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <UsersIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-foreground font-mono">{totalUsersCount}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Total accounts</p>
          </div>
        </Card>

        {/* Active Users */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Active Users</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <UserCheckIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{activeCount}</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Verified & active</p>
          </div>
        </Card>

        {/* Inactive Users */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Inactive Users</span>
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <UserMinusIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{inactiveCount}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Pending status</p>
          </div>
        </Card>

        {/* Banned Users */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Banned Users</span>
            <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
              <UserXIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{bannedCount}</h3>
            <p className="text-[11px] text-rose-500 font-medium mt-0.5">Suspended accounts</p>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SEARCH & FILTERS BAR                                       */}
      {/* ------------------------------------------------------------- */}
      <Card className="p-4 rounded-3xl border-border/70 bg-card shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Search Bar Input */}
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or email address..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 h-10 text-xs rounded-2xl border-border/60 bg-muted/30 focus-visible:ring-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Role Filter Select */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-muted-foreground font-medium flex items-center gap-1">
              <FilterIcon className="h-3.5 w-3.5" /> Role:
            </span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-10 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">ADMIN</option>
              <option value="LANDLORD">LANDLORD</option>
              <option value="TENANT">TENANT</option>
            </select>
          </div>

          {/* Status Filter Select */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-muted-foreground font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="BANNED">BANNED</option>
            </select>
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------- */}
      {/* 3. TANSTACK TABLE & RESPONSIVE MOBILE VIEW                    */}
      {/* ------------------------------------------------------------- */}
      {table.getRowModel().rows.length === 0 ? (
        /* EMPTY STATE: No Users Found */
        <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
              <UsersIcon className="h-10 w-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                No Users Found
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {globalFilter || roleFilter !== "ALL" || statusFilter !== "ALL"
                  ? "No user records matched your selected search query or filters."
                  : "There are currently no registered users in the database."}
              </p>
            </div>
            {(globalFilter || roleFilter !== "ALL" || statusFilter !== "ALL") && (
              <Button
                onClick={() => {
                  setGlobalFilter("")
                  setRoleFilter("ALL")
                  setStatusFilter("ALL")
                }}
                variant="outline"
                className="rounded-2xl px-6 h-10 text-xs font-bold"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <>
          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block">
            <Card className="rounded-3xl border-border/70 bg-card shadow-sm overflow-hidden p-0">
              <Table>
                <TableHeader className="bg-muted/40">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-border/60 hover:bg-transparent">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="text-xs font-bold text-foreground py-4 pl-6">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4 pl-6">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* TABLET / MOBILE CARDS VIEW */}
          <div className="block md:hidden space-y-4">
            {table.getRowModel().rows.map((row) => {
              const user = row.original
              const initials = user.name ? user.name[0].toUpperCase() : "U"
              const createdFormatted = user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"

              return (
                <Card key={user.id} className="p-5 rounded-3xl border-border/70 bg-card shadow-sm space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-10 w-10 border border-border shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-foreground line-clamp-1">{user.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">{user.email}</p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 rounded-xl hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="rounded-2xl w-44 p-1.5 shadow-xl">
                        <DropdownMenuItem
                          onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
                          className="rounded-xl text-xs font-semibold gap-2 cursor-pointer"
                        >
                          <EyeIcon className="h-3.5 w-3.5 text-primary" />
                          <span>View User</span>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-border/50" />

                        <DropdownMenuItem
                          onClick={() => openChangeStatusModal(user)}
                          className="rounded-xl text-xs font-semibold gap-2 cursor-pointer"
                        >
                          <UserCogIcon className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Change Status</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-muted/40 border border-border/40">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Role</span>
                      <span className="font-bold text-foreground">{user.role}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground block">Status</span>
                      {user.status === "ACTIVE" ? (
                        <Badge variant="success" className="text-[10px]">
                          ACTIVE
                        </Badge>
                      ) : user.status === "BANNED" ? (
                        <Badge variant="destructive" className="text-[10px]">
                          BANNED
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">
                          INACTIVE
                        </Badge>
                      )}
                    </div>

                    <div className="col-span-2 pt-1 border-t border-border/30">
                      <span className="text-[10px] text-muted-foreground block">Created Date</span>
                      <span className="font-medium text-foreground">{createdFormatted}</span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* 4. TANSTACK TABLE PAGINATION BAR                             */}
          {/* ------------------------------------------------------------- */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground font-medium">
              Showing Page{" "}
              <span className="font-bold text-foreground">
                {table.getState().pagination.pageIndex + 1}
              </span>{" "}
              of <span className="font-bold text-foreground">{table.getPageCount()}</span>
              {meta?.total && (
                <span className="ml-1 text-muted-foreground">({meta.total} total accounts)</span>
              )}
            </p>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                variant="outline"
                size="sm"
                className="rounded-xl h-9 text-xs font-bold gap-1"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                variant="outline"
                size="sm"
                className="rounded-xl h-9 text-xs font-bold gap-1"
              >
                <span>Next</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Confirmation Dialog for Changing User Status */}
      <UpdateStatusDialog
        user={selectedUserForStatus}
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
      />
    </div>
  )
}
