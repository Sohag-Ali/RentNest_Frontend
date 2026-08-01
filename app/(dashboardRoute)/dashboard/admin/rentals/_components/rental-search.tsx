"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon, FilterIcon } from "lucide-react"

interface RentalSearchProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  paymentFilter: string
  onPaymentChange: (value: string) => void
  categoryFilter: string
  onCategoryChange: (value: string) => void
  tenantStatusFilter: string
  onTenantStatusChange: (value: string) => void
  categories: string[]
}

/**
 * RentalSearch Component (Client Component)
 * 
 * Why this file exists:
 * Search and filter bar for Admin Rental Management.
 * Supports query search (Tenant Name, Email, Property Title, Landlord, Location, Transaction ID)
 * and filter dropdowns (Rental Status, Payment Status, Category, Tenant Account Status).
 */
export function RentalSearch({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  paymentFilter,
  onPaymentChange,
  categoryFilter,
  onCategoryChange,
  tenantStatusFilter,
  onTenantStatusChange,
  categories,
}: RentalSearchProps) {
  return (
    <Card className="p-4 rounded-3xl border-border/70 bg-card shadow-sm space-y-3 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-4">
      {/* Live Search Input */}
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tenant, email, property, landlord, transaction..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10 text-xs rounded-2xl border-border/60 bg-muted/30 focus-visible:ring-primary"
        />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Rental Status Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground font-medium flex items-center gap-1">
            <FilterIcon className="h-3.5 w-3.5" /> Rental:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-9 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        {/* Payment Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground font-medium">Payment:</span>
          <select
            value={paymentFilter}
            onChange={(e) => onPaymentChange(e.target.value)}
            className="h-9 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="ALL">All</option>
            <option value="PAID">Paid</option>
            <option value="UNPAID">Unpaid</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-9 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Tenant Status Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground font-medium">Tenant Status:</span>
          <select
            value={tenantStatusFilter}
            onChange={(e) => onTenantStatusChange(e.target.value)}
            className="h-9 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="ALL">All Accounts</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="BANNED">BANNED</option>
          </select>
        </div>
      </div>
    </Card>
  )
}
