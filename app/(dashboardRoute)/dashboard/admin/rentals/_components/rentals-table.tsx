"use client"

import React, { useState, useMemo, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { AdminRental, AdminRentalMeta } from "../../_actions/admin-rental.actions"
import { RentalStatusBadge } from "./rental-status-badge"
import { PaymentStatusBadge } from "./payment-status-badge"
import { RentalDetailsDialog } from "./rental-details-dialog"
import { RentalSearch } from "./rental-search"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dropdown-menu"
import {
  FileTextIcon,
  ClockIcon,
  CheckCircle2Icon,
  CheckCheckIcon,
  XCircleIcon,
  CreditCardIcon,
  DollarSignIcon,
  MoreVerticalIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  TagIcon,
  UserIcon,
  Building2Icon,
  RefreshCwIcon,
  AlertTriangleIcon,
} from "lucide-react"

interface RentalsTableProps {
  initialRentals: AdminRental[]
  meta?: AdminRentalMeta | null
  error?: string | null
  onRetry?: () => void
}

const ITEMS_PER_PAGE = 5

/**
 * RentalsTable Component (Client Component)
 * 
 * Why this file exists:
 * Main Admin Rental Management dashboard interface built with TanStack Table.
 * Features 8 dynamic statistics cards (Total, Pending, Approved, Completed, Rejected, Paid, Unpaid, Total Revenue),
 * search query filtering, dropdown filters, formatted amounts ($3,400), mobile card views, empty state, and error retry logic.
 */
export function RentalsTable({
  initialRentals,
  meta,
  error,
  onRetry,
}: RentalsTableProps) {
  const [rentals, setRentals] = useState<AdminRental[]>(initialRentals)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [paymentFilter, setPaymentFilter] = useState("ALL")
  const [categoryFilter, setCategoryFilter] = useState("ALL")
  const [tenantStatusFilter, setTenantStatusFilter] = useState("ALL")

  // Details Modal State
  const [selectedRental, setSelectedRental] = useState<AdminRental | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Sync state on server revalidation
  useEffect(() => {
    setRentals(initialRentals)
  }, [initialRentals])

  // Extract unique categories for filter select
  const uniqueCategories = useMemo(() => {
    const set = new Set<string>()
    rentals.forEach((r) => {
      if (r.category?.name) set.add(r.category.name)
    })
    return Array.from(set)
  }, [rentals])

  // -------------------------------------------------------------
  // CALCULATE 8 TOP STATISTICS CARDS METRICS
  // -------------------------------------------------------------
  const totalRentalsCount = meta?.total || rentals.length
  const pendingCount = useMemo(() => rentals.filter((r) => r.status?.toUpperCase() === "PENDING").length, [rentals])
  const approvedCount = useMemo(() => rentals.filter((r) => r.status?.toUpperCase() === "APPROVED").length, [rentals])
  const completedCount = useMemo(() => rentals.filter((r) => r.status?.toUpperCase() === "COMPLETED").length, [rentals])
  const rejectedCount = useMemo(() => rentals.filter((r) => r.status?.toUpperCase() === "REJECTED").length, [rentals])

  const paidRentalsCount = useMemo(
    () => rentals.filter((r) => Boolean(r.payment) && (r.payment?.status?.toUpperCase() === "COMPLETED" || r.payment?.status?.toUpperCase() === "PAID" || r.payment?.status?.toUpperCase() === "SUCCEEDED")).length,
    [rentals]
  )
  const unpaidRentalsCount = totalRentalsCount - paidRentalsCount

  const totalRevenue = useMemo(() => {
    return rentals.reduce((sum, r) => {
      if (r.payment && (r.payment.status?.toUpperCase() === "COMPLETED" || r.payment.status?.toUpperCase() === "PAID" || r.payment.status?.toUpperCase() === "SUCCEEDED")) {
        return sum + (r.payment.amount || 0)
      }
      return sum
    }, 0)
  }, [rentals])

  const formattedTotalRevenue = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(totalRevenue)

  // -------------------------------------------------------------
  // FILTER DATASET
  // -------------------------------------------------------------
  const filteredRentals = useMemo(() => {
    return rentals.filter((r) => {
      const query = searchQuery.toLowerCase().trim()
      const tenantName = r.tenant?.name || ""
      const tenantEmail = r.tenant?.email || ""
      const propertyTitle = r.property?.title || ""
      const landlordName = r.landlord?.name || ""
      const location = r.property?.location || ""
      const transactionId = r.payment?.transactionId || ""

      const matchesSearch =
        !query ||
        tenantName.toLowerCase().includes(query) ||
        tenantEmail.toLowerCase().includes(query) ||
        propertyTitle.toLowerCase().includes(query) ||
        landlordName.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query) ||
        transactionId.toLowerCase().includes(query)

      const matchesStatus = statusFilter === "ALL" || r.status?.toUpperCase() === statusFilter

      const hasPayment = Boolean(r.payment) && (r.payment?.status?.toUpperCase() === "COMPLETED" || r.payment?.status?.toUpperCase() === "PAID" || r.payment?.status?.toUpperCase() === "SUCCEEDED")
      const matchesPayment =
        paymentFilter === "ALL" ||
        (paymentFilter === "PAID" && hasPayment) ||
        (paymentFilter === "UNPAID" && !hasPayment)

      const matchesCategory = categoryFilter === "ALL" || r.category?.name === categoryFilter
      const matchesTenantStatus = tenantStatusFilter === "ALL" || r.tenant?.status === tenantStatusFilter

      return matchesSearch && matchesStatus && matchesPayment && matchesCategory && matchesTenantStatus
    })
  }, [rentals, searchQuery, statusFilter, paymentFilter, categoryFilter, tenantStatusFilter])

  const handleOpenDetails = (rental: AdminRental) => {
    setSelectedRental(rental)
    setIsDetailsOpen(true)
  }

  // -------------------------------------------------------------
  // TANSTACK TABLE COLUMNS DEFINITION
  // -------------------------------------------------------------
  const columns = useMemo<ColumnDef<AdminRental>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Rental ID",
        cell: ({ row }) => (
          <span className="font-mono text-xs font-bold text-foreground">
            #{row.original.id.slice(0, 8)}
          </span>
        ),
      },
      {
        accessorKey: "tenant",
        header: "Tenant",
        cell: ({ row }) => {
          const tenant = row.original.tenant
          return (
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-foreground line-clamp-1">{tenant?.name || "N/A"}</h4>
              <p className="text-[11px] text-muted-foreground line-clamp-1">{tenant?.email || "N/A"}</p>
            </div>
          )
        },
      },
      {
        accessorKey: "property",
        header: "Property",
        cell: ({ row }) => (
          <span className="text-xs font-bold text-foreground line-clamp-1 flex items-center gap-1">
            <Building2Icon className="h-3.5 w-3.5 text-primary shrink-0" />
            {row.original.property?.title || "N/A"}
          </span>
        ),
      },
      {
        accessorKey: "landlord",
        header: "Landlord",
        cell: ({ row }) => (
          <span className="text-xs font-bold text-foreground flex items-center gap-1">
            <UserIcon className="h-3.5 w-3.5 text-purple-500 shrink-0" />
            {row.original.landlord?.name || "N/A"}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <Badge variant="outline" className="text-[10px] font-bold border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10 gap-1">
            <TagIcon className="h-3 w-3" />
            {row.original.category?.name || "General"}
          </Badge>
        ),
      },
      {
        accessorKey: "moveInDate",
        header: "Move In",
        cell: ({ row }) => {
          const formatted = row.original.moveInDate
            ? new Date(row.original.moveInDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"
          return <span className="text-xs text-muted-foreground font-medium">{formatted}</span>
        },
      },
      {
        accessorKey: "status",
        header: "Rental Status",
        cell: ({ row }) => <RentalStatusBadge status={row.original.status} />,
      },
      {
        id: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => (
          <PaymentStatusBadge
            hasPayment={Boolean(row.original.payment)}
            status={row.original.payment?.status}
          />
        ),
      },
      {
        id: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amt = row.original.payment?.amount || row.original.property?.price || 0
          const formattedAmount = new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          }).format(amt)

          return (
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {formattedAmount}
            </span>
          )
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
          const createdFormatted = row.original.createdAt
            ? new Date(row.original.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"
          return <span className="text-xs text-muted-foreground font-medium">{createdFormatted}</span>
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right pr-2">Actions</div>,
        cell: ({ row }) => {
          const rental = row.original
          return (
            <div className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-xl hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer">
                  <MoreVerticalIcon className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="rounded-2xl w-40 p-1.5 shadow-xl">
                  <DropdownMenuItem
                    onClick={() => handleOpenDetails(rental)}
                    className="rounded-xl text-xs font-semibold gap-2 cursor-pointer"
                  >
                    <EyeIcon className="h-3.5 w-3.5 text-primary" />
                    <span>View Details</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data: filteredRentals,
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

  // ERROR STATE
  if (error) {
    return (
      <Card className="rounded-3xl border-rose-500/30 bg-rose-500/5 p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-16 w-16 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center border border-rose-500/20">
            <AlertTriangleIcon className="h-8 w-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold tracking-tight text-foreground font-heading">
              Failed to Load Rental Applications
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{error}</p>
          </div>
          {onRetry && (
            <Button
              onClick={onRetry}
              className="rounded-2xl px-6 h-10 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-md"
            >
              <RefreshCwIcon className="h-4 w-4" />
              <span>Retry Request</span>
            </Button>
          )}
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP 8 STATISTICS CARDS GRID                                */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Rentals */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Rentals</span>
            <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <FileTextIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-foreground font-mono">{totalRentalsCount}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Total lease applications</p>
          </div>
        </Card>

        {/* Pending Rentals */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Pending Rentals</span>
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <ClockIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{pendingCount}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Awaiting landlord response</p>
          </div>
        </Card>

        {/* Approved Rentals */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Approved Rentals</span>
            <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
              <CheckCircle2Icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{approvedCount}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Approved & ready for payment</p>
          </div>
        </Card>

        {/* Completed Rentals */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Completed Rentals</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <CheckCheckIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{completedCount}</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Finalized active leases</p>
          </div>
        </Card>

        {/* Rejected Rentals */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Rejected Rentals</span>
            <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
              <XCircleIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{rejectedCount}</h3>
            <p className="text-[11px] text-rose-500 font-medium mt-0.5">Declined applications</p>
          </div>
        </Card>

        {/* Paid Rentals */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Paid Rentals</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <CreditCardIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{paidRentalsCount}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Successful payment records</p>
          </div>
        </Card>

        {/* Unpaid Rentals */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Unpaid Rentals</span>
            <div className="h-10 w-10 rounded-2xl bg-slate-500/10 text-slate-500 flex items-center justify-center border border-slate-500/20">
              <CreditCardIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-600 dark:text-slate-400 font-mono">{unpaidRentalsCount}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Awaiting checkout</p>
          </div>
        </Card>

        {/* Total Revenue */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Total Revenue</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <DollarSignIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{formattedTotalRevenue}</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Processed tenant payments</p>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SEARCH & FILTERS CONTROLS                                  */}
      {/* ------------------------------------------------------------- */}
      <RentalSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        paymentFilter={paymentFilter}
        onPaymentChange={setPaymentFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        tenantStatusFilter={tenantStatusFilter}
        onTenantStatusChange={setTenantStatusFilter}
        categories={uniqueCategories}
      />

      {/* ------------------------------------------------------------- */}
      {/* 3. TANSTACK TABLE & RESPONSIVE MOBILE VIEW                    */}
      {/* ------------------------------------------------------------- */}
      {table.getRowModel().rows.length === 0 ? (
        /* EMPTY STATE: No Rentals Found */
        <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
              <FileTextIcon className="h-10 w-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                No Rentals Found
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {searchQuery || statusFilter !== "ALL" || paymentFilter !== "ALL" || categoryFilter !== "ALL" || tenantStatusFilter !== "ALL"
                  ? "No rental requests matched your current search parameters or filter criteria."
                  : "There are currently no rental applications in the database."}
              </p>
            </div>
            {(searchQuery || statusFilter !== "ALL" || paymentFilter !== "ALL" || categoryFilter !== "ALL" || tenantStatusFilter !== "ALL") && (
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("ALL")
                  setPaymentFilter("ALL")
                  setCategoryFilter("ALL")
                  setTenantStatusFilter("ALL")
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
          {/* DESKTOP TANSTACK TABLE VIEW */}
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
          <div className="block md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {table.getRowModel().rows.map((row) => {
              const rental = row.original
              const amt = rental.payment?.amount || rental.property?.price || 0
              const formattedAmt = new Intl.NumberFormat("en-BD", {
                style: "currency",
                currency: "BDT",
                maximumFractionDigits: 0,
              }).format(amt)

              return (
                <Card key={rental.id} className="p-5 rounded-3xl border-border/70 bg-card shadow-sm space-y-4">
                  <div className="flex items-center justify-between gap-3 pb-2 border-b border-border/40">
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-bold text-muted-foreground block">
                        #{rental.id.slice(0, 8)}
                      </span>
                      <h4 className="text-sm font-bold text-foreground line-clamp-1">
                        {rental.tenant?.name || "N/A"}
                      </h4>
                    </div>

                    <RentalStatusBadge status={rental.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-muted/40 border border-border/40">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Property</span>
                      <span className="font-bold text-foreground line-clamp-1">
                        {rental.property?.title || "N/A"}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground block">Landlord</span>
                      <span className="font-bold text-foreground line-clamp-1">
                        {rental.landlord?.name || "N/A"}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground block">Payment Status</span>
                      <PaymentStatusBadge
                        hasPayment={Boolean(rental.payment)}
                        status={rental.payment?.status}
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground block">Amount</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                        {formattedAmt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-1">
                    <Button
                      onClick={() => handleOpenDetails(rental)}
                      variant="outline"
                      size="sm"
                      className="rounded-xl text-xs font-bold gap-1 px-3 h-8 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <EyeIcon className="h-3.5 w-3.5" />
                      <span>View Details</span>
                    </Button>
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
                <span className="ml-1 text-muted-foreground">({meta.total} total rentals)</span>
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

      {/* Rental Inspection Details Dialog */}
      <RentalDetailsDialog
        rental={selectedRental}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  )
}
