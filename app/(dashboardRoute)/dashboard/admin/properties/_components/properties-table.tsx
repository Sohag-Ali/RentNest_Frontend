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
import { AdminProperty, AdminPropertyMeta } from "../../_actions/admin-property.actions"
import { PropertyStatusBadge } from "./property-status-badge"
import { PropertyDetailsDialog } from "./property-details-dialog"
import { PropertyCard } from "./property-card"
import { PropertySearch } from "./property-search"
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
  Building2Icon,
  CheckCircle2Icon,
  XCircleIcon,
  UserCheckIcon,
  MoreVerticalIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  TagIcon,
  UserIcon,
  SparklesIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
} from "lucide-react"

interface PropertiesTableProps {
  initialProperties: AdminProperty[]
  meta?: AdminPropertyMeta | null
  error?: string | null
  onRetry?: () => void
}

const ITEMS_PER_PAGE = 5

/**
 * PropertiesTable Component (Client Component)
 * 
 * Why this file exists:
 * Main Admin Property Management dashboard view.
 * Features 4 top stat cards, client-side search/filters, TanStack Table layout,
 * formatted price formatting ($8,200), amenity badge truncation (+N more),
 * responsive mobile card view, empty state, and error retry state.
 */
export function PropertiesTable({
  initialProperties,
  meta,
  error,
  onRetry,
}: PropertiesTableProps) {
  const [properties, setProperties] = useState<AdminProperty[]>(initialProperties)
  const [searchQuery, setSearchQuery] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("ALL")
  const [categoryFilter, setCategoryFilter] = useState("ALL")
  const [landlordFilter, setLandlordFilter] = useState("ALL")

  // Modal State
  const [selectedProperty, setSelectedProperty] = useState<AdminProperty | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Sync props state on server revalidation
  useEffect(() => {
    setProperties(initialProperties)
  }, [initialProperties])

  // Extract unique categories and landlords for dropdown filters
  const uniqueCategories = useMemo(() => {
    const set = new Set<string>()
    properties.forEach((p) => {
      if (p.category?.name) set.add(p.category.name)
    })
    return Array.from(set)
  }, [properties])

  const uniqueLandlords = useMemo(() => {
    const set = new Set<string>()
    properties.forEach((p) => {
      if (p.landlord?.name) set.add(p.landlord.name)
    })
    return Array.from(set)
  }, [properties])

  // Calculate Stat Cards
  const totalProperties = meta?.total || properties.length
  const availableCount = useMemo(() => properties.filter((p) => p.isAvailable).length, [properties])
  const unavailableCount = useMemo(() => properties.filter((p) => !p.isAvailable).length, [properties])
  const totalLandlordsCount = uniqueLandlords.length

  // Filtered Properties Dataset
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const query = searchQuery.toLowerCase().trim()
      const title = p.title || ""
      const location = p.location || ""
      const landlord = p.landlord?.name || ""
      const category = p.category?.name || ""

      const matchesSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query) ||
        landlord.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query)

      const matchesAvailability =
        availabilityFilter === "ALL" ||
        (availabilityFilter === "AVAILABLE" && p.isAvailable) ||
        (availabilityFilter === "UNAVAILABLE" && !p.isAvailable)

      const matchesCategory = categoryFilter === "ALL" || category === categoryFilter
      const matchesLandlord = landlordFilter === "ALL" || landlord === landlordFilter

      return matchesSearch && matchesAvailability && matchesCategory && matchesLandlord
    })
  }, [properties, searchQuery, availabilityFilter, categoryFilter, landlordFilter])

  const handleOpenDetails = (property: AdminProperty) => {
    setSelectedProperty(property)
    setIsDetailsOpen(true)
  }

  // -------------------------------------------------------------
  // TANSTACK TABLE COLUMNS DEFINITION
  // -------------------------------------------------------------
  const columns = useMemo<ColumnDef<AdminProperty>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
          const property = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0">
                <Building2Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-foreground line-clamp-1">{property.title}</h4>
                <p className="text-[11px] text-muted-foreground line-clamp-1">{property.id.slice(0, 8)}...</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          const categoryName = row.original.category?.name || "General"
          return (
            <Badge variant="outline" className="text-[10px] font-bold border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10 gap-1">
              <TagIcon className="h-3 w-3" />
              {categoryName}
            </Badge>
          )
        },
      },
      {
        accessorKey: "landlord",
        header: "Landlord",
        cell: ({ row }) => {
          const landlordName = row.original.landlord?.name || "Unknown Landlord"
          return (
            <span className="text-xs font-bold text-foreground flex items-center gap-1">
              <UserIcon className="h-3.5 w-3.5 text-purple-500 shrink-0" />
              {landlordName}
            </span>
          )
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
          return (
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <MapPinIcon className="h-3.5 w-3.5 text-rose-500 shrink-0" />
              {row.original.location}
            </span>
          )
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(row.original.price || 0)

          return (
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {formattedPrice}
            </span>
          )
        },
      },
      {
        accessorKey: "isAvailable",
        header: "Availability",
        cell: ({ row }) => {
          return <PropertyStatusBadge isAvailable={row.original.isAvailable} />
        },
      },
      {
        accessorKey: "amenities",
        header: "Amenities",
        cell: ({ row }) => {
          const amenities = Array.isArray(row.original.amenities) ? row.original.amenities : []
          if (amenities.length === 0) {
            return <span className="text-[11px] text-muted-foreground italic">None</span>
          }

          const visible = amenities.slice(0, 3)
          const remaining = amenities.length - 3

          return (
            <div className="flex flex-wrap items-center gap-1">
              {visible.map((item, i) => (
                <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">
                  {item}
                </Badge>
              ))}
              {remaining > 0 && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-primary border-primary/30">
                  +{remaining} more
                </Badge>
              )}
            </div>
          )
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
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
          const property = row.original
          return (
            <div className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-xl hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer">
                  <MoreVerticalIcon className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="rounded-2xl w-40 p-1.5 shadow-xl">
                  <DropdownMenuItem
                    onClick={() => handleOpenDetails(property)}
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
    data: filteredProperties,
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
              Failed to Load Admin Properties
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
      {/* 1. TOP STATISTICS CARDS                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Properties</span>
            <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <Building2Icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-foreground font-mono">{totalProperties}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Listed platform properties</p>
          </div>
        </Card>

        {/* Available Properties */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Available Properties</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2Icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{availableCount}</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Ready for rent</p>
          </div>
        </Card>

        {/* Unavailable Properties */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Unavailable Properties</span>
            <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
              <XCircleIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{unavailableCount}</h3>
            <p className="text-[11px] text-rose-500 font-medium mt-0.5">Rented or unlisted</p>
          </div>
        </Card>

        {/* Total Landlords */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Landlords</span>
            <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
              <UserCheckIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">{totalLandlordsCount}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Active property hosts</p>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SEARCH & FILTERS CONTROLS                                  */}
      {/* ------------------------------------------------------------- */}
      <PropertySearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        availabilityFilter={availabilityFilter}
        onAvailabilityChange={setAvailabilityFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        landlordFilter={landlordFilter}
        onLandlordChange={setLandlordFilter}
        categories={uniqueCategories}
        landlords={uniqueLandlords}
      />

      {/* ------------------------------------------------------------- */}
      {/* 3. TABLE / RESPONSIVE CARDS & EMPTY STATE                      */}
      {/* ------------------------------------------------------------- */}
      {table.getRowModel().rows.length === 0 ? (
        /* EMPTY STATE: No Properties Found */
        <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
              <Building2Icon className="h-10 w-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                No Properties Found
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {searchQuery || availabilityFilter !== "ALL" || categoryFilter !== "ALL" || landlordFilter !== "ALL"
                  ? "No landlord properties matched your current search parameters or filter criteria."
                  : "There are currently no property listings in the database."}
              </p>
            </div>
            {(searchQuery || availabilityFilter !== "ALL" || categoryFilter !== "ALL" || landlordFilter !== "ALL") && (
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setAvailabilityFilter("ALL")
                  setCategoryFilter("ALL")
                  setLandlordFilter("ALL")
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
            {table.getRowModel().rows.map((row) => (
              <PropertyCard
                key={row.original.id}
                property={row.original}
                onViewDetails={handleOpenDetails}
              />
            ))}
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
                <span className="ml-1 text-muted-foreground">({meta.total} total properties)</span>
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

      {/* Property Details Modal Dialog */}
      <PropertyDetailsDialog
        property={selectedProperty}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  )
}
