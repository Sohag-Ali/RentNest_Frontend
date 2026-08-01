"use client"

import React from "react"
import { AdminRental } from "../../_actions/admin-rental.actions"
import { RentalStatusBadge } from "./rental-status-badge"
import { PaymentInfoCard } from "./payment-info-card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileTextIcon,
  UserIcon,
  Building2Icon,
  CreditCardIcon,
  CalendarIcon,
  MapPinIcon,
  TagIcon,
  DollarSignIcon,
  HashIcon,
} from "lucide-react"

interface RentalDetailsDialogProps {
  rental: AdminRental | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * RentalDetailsDialog Component (Client Component)
 * 
 * Why this file exists:
 * Large Shadcn Modal displaying complete 4-section inspection data for a rental request:
 * Section 1: Rental Information
 * Section 2: Tenant Profile
 * Section 3: Property Listing
 * Section 4: Payment Transaction Details
 */
export function RentalDetailsDialog({
  rental,
  open,
  onOpenChange,
}: RentalDetailsDialogProps) {
  if (!rental) return null

  const moveInFormatted = rental.moveInDate
    ? new Date(rental.moveInDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A"

  const createdFormatted = rental.createdAt
    ? new Date(rental.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A"

  const propertyPriceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(rental.property?.price || 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-card border-border/80 shadow-2xl space-y-6">
        {/* Modal Header */}
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline" className="text-xs font-bold border-primary/40 text-primary bg-primary/10 gap-1">
              <FileTextIcon className="h-3.5 w-3.5" />
              Rental Application Inspection
            </Badge>
            <RentalStatusBadge status={rental.status} />
          </div>

          <DialogTitle className="text-xl font-extrabold font-heading text-foreground pt-1 flex items-center gap-2">
            <span>Rental Request Details</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground font-mono">
            ID: {rental.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* SECTION 1: RENTAL INFORMATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-1 border-b border-border/40">
              <FileTextIcon className="h-4 w-4 text-primary" />
              Section 1: Rental Information
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border/30 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold flex items-center gap-1">
                  <HashIcon className="h-3 w-3" /> Rental ID
                </span>
                <span className="font-mono font-bold text-foreground text-[11px] truncate block">
                  {rental.id.slice(0, 10)}...
                </span>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold">Status</span>
                <RentalStatusBadge status={rental.status} />
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3 text-emerald-500" /> Move In Date
                </span>
                <span className="font-bold text-foreground text-[11px]">{moveInFormatted}</span>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3 text-muted-foreground" /> Applied On
                </span>
                <span className="font-medium text-foreground text-[11px]">{createdFormatted}</span>
              </div>
            </div>
          </div>

          {/* SECTION 2: TENANT DETAILS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-1 border-b border-border/40">
              <UserIcon className="h-4 w-4 text-purple-500" />
              Section 2: Tenant Profile
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border/30 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold">Name</span>
                <span className="font-bold text-foreground">{rental.tenant?.name || "N/A"}</span>
              </div>

              <div className="col-span-2">
                <span className="text-[10px] text-muted-foreground block font-semibold">Email</span>
                <span className="font-medium text-foreground truncate block">{rental.tenant?.email || "N/A"}</span>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold">Account Status</span>
                <Badge variant="outline" className="text-[10px] font-bold">
                  {rental.tenant?.status || "ACTIVE"}
                </Badge>
              </div>
            </div>
          </div>

          {/* SECTION 3: PROPERTY DETAILS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-1 border-b border-border/40">
              <Building2Icon className="h-4 w-4 text-blue-500" />
              Section 3: Property Information
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border/30 text-xs">
              <div className="col-span-2">
                <span className="text-[10px] text-muted-foreground block font-semibold">Property Title</span>
                <span className="font-bold text-foreground line-clamp-1">
                  {rental.property?.title || "N/A"}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold flex items-center gap-1">
                  <TagIcon className="h-3 w-3 text-blue-500" /> Category
                </span>
                <span className="font-bold text-foreground">{rental.category?.name || "General"}</span>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold flex items-center gap-1">
                  <MapPinIcon className="h-3 w-3 text-rose-500" /> Location
                </span>
                <span className="font-medium text-foreground line-clamp-1">
                  {rental.property?.location || "N/A"}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold flex items-center gap-1">
                  <DollarSignIcon className="h-3 w-3 text-emerald-500" /> Monthly Price
                </span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  {propertyPriceFormatted}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block font-semibold">Landlord</span>
                <span className="font-bold text-foreground">{rental.landlord?.name || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* SECTION 4: PAYMENT DETAILS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-1 border-b border-border/40">
              <CreditCardIcon className="h-4 w-4 text-emerald-500" />
              Section 4: Payment Transaction
            </h4>
            <PaymentInfoCard payment={rental.payment} />
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-2xl h-10 px-6 text-xs font-bold"
          >
            Close Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
