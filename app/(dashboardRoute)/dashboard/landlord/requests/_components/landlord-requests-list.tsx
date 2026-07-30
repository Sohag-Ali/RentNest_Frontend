"use client"

import React, { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { LandlordRequestItem, updateLandlordRequestStatus } from "@/app/(dashboardRoute)/_action/landlord-request.actions"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  CheckCircle2Icon,
  XCircleIcon,
  MapPinIcon,
  CalendarIcon,
  Building2Icon,
  Loader2Icon,
  AlertTriangleIcon,
  MailIcon,
  ClockIcon,
} from "lucide-react"

interface LandlordRequestsListProps {
  initialRequests: LandlordRequestItem[]
}

/**
 * LandlordRequestsList Component (Client Component)
 * 
 * Why this file exists:
 * Manages the interactive landlord requests list, confirmation dialogs (Approve/Reject), and status updates.
 * 
 * Why props:
 * Receives the initial requests array fetched by the parent Server Component page.
 */
export function LandlordRequestsList({ initialRequests }: LandlordRequestsListProps) {
  // Local state to store and dynamically update request list
  const [requests, setRequests] = useState<LandlordRequestItem[]>(initialRequests)
  
  // State for tracking which request is being approved or rejected in confirmation dialogs
  const [approveTargetId, setApproveTargetId] = useState<string | null>(null)
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  // Extract category name safely from string or object
  const getCategoryName = (category: any) => {
    if (typeof category === "object" && category?.name) {
      return category.name
    }
    return typeof category === "string" ? category : "Rental"
  }

  /**
   * Confirm and execute Request Approval
   */
  const handleConfirmApprove = async () => {
    if (!approveTargetId) return

    setIsUpdating(true)
    try {
      // Execute Server Action
      const result = await updateLandlordRequestStatus(approveTargetId, "APPROVED")

      if (result.success) {
        toast.success("Booking request approved successfully.")
        
        // Update request status locally in state
        setRequests((prev) =>
          prev.map((req) =>
            req.id === approveTargetId ? { ...req, status: "APPROVED" } : req
          )
        )
      } else {
        toast.error(result.message || "Failed to approve booking request.")
      }
    } catch (error) {
      console.error("Error approving request:", error)
      toast.error("An error occurred while approving request.")
    } finally {
      setIsUpdating(false)
      setApproveTargetId(null)
    }
  }

  /**
   * Confirm and execute Request Rejection
   */
  const handleConfirmReject = async () => {
    if (!rejectTargetId) return

    setIsUpdating(true)
    try {
      // Execute Server Action
      const result = await updateLandlordRequestStatus(rejectTargetId, "REJECTED")

      if (result.success) {
        toast.success("Booking request rejected successfully.")

        // Update request status locally in state
        setRequests((prev) =>
          prev.map((req) =>
            req.id === rejectTargetId ? { ...req, status: "REJECTED" } : req
          )
        )
      } else {
        toast.error(result.message || "Failed to reject booking request.")
      }
    } catch (error) {
      console.error("Error rejecting request:", error)
      toast.error("An error occurred while rejecting request.")
    } finally {
      setIsUpdating(false)
      setRejectTargetId(null)
    }
  }

  // -------------------------------------------------------------
  // EMPTY STATE: Displayed when landlord has zero requests
  // -------------------------------------------------------------
  if (!requests || requests.length === 0) {
    return (
      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
            <Building2Icon className="h-10 w-10" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              No booking requests yet.
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When tenants submit move-in applications for your properties, they will appear here for review.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  // -------------------------------------------------------------
  // MAIN REQUEST CARDS LIST
  // -------------------------------------------------------------
  return (
    <>
      <div className="space-y-5">
        {requests.map((request) => {
          const property = request.property
          const tenant = request.tenant
          const categoryName = getCategoryName(property?.category)

          return (
            <Card
              key={request.id}
              className="rounded-3xl border-border/70 bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Section: Property & Tenant Details */}
                <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                  {/* Property Image */}
                  <div className="relative w-full sm:w-44 h-36 rounded-2xl overflow-hidden shrink-0 bg-muted">
                    <Image
                      src={property?.mainImage || "/placeholder.jpg"}
                      alt={property?.title || "Property Image"}
                      fill
                      sizes="176px"
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="glass" className="text-[10px]">
                        {categoryName}
                      </Badge>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-foreground line-clamp-1">
                        {property?.title || "Rental Residence"}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPinIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                        {property?.location || "Location N/A"}
                      </p>
                    </div>

                    {/* Tenant Profile Box */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/40 text-xs">
                      <Avatar className="h-9 w-9 border border-border shrink-0">
                        <AvatarImage src={tenant?.avatar || ""} alt={tenant?.name || "Tenant"} />
                        <AvatarFallback>{tenant?.name ? tenant.name[0] : "T"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground line-clamp-1">
                          {tenant?.name || "Tenant Applicant"}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 line-clamp-1 mt-0.5">
                          <MailIcon className="h-3 w-3 shrink-0 text-muted-foreground" />
                          {tenant?.email || "No email provided"}
                        </p>
                      </div>
                    </div>

                    {/* Dates & Status Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <CalendarIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>Move-in: </span>
                        <span className="font-semibold">
                          {request.moveInDate
                            ? new Date(request.moveInDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px]">
                        <ClockIcon className="h-3 w-3 shrink-0" />
                        <span>Requested: </span>
                        <span>
                          {request.createdAt
                            ? new Date(request.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section: Price & Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-border/50 gap-4 shrink-0">
                  {/* Price tag */}
                  <div className="text-left lg:text-right">
                    <span className="text-2xl font-extrabold text-foreground font-mono">
                      ${property?.price ? property.price.toLocaleString() : 0}
                    </span>
                    <span className="text-xs text-muted-foreground"> / month</span>
                  </div>

                  {/* Status Badge & Action Controls */}
                  <div className="flex items-center gap-2">
                    {request.status === "APPROVED" ? (
                      /* Approved Status Badge */
                      <Badge variant="success" className="gap-1.5 px-3 py-1 text-xs">
                        <CheckCircle2Icon className="h-3.5 w-3.5" />
                        Approved
                      </Badge>
                    ) : request.status === "REJECTED" ? (
                      /* Rejected Status Badge */
                      <Badge variant="destructive" className="gap-1.5 px-3 py-1 text-xs">
                        <XCircleIcon className="h-3.5 w-3.5" />
                        Rejected
                      </Badge>
                    ) : (
                      /* Pending Actions (Approve & Reject buttons) */
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setRejectTargetId(request.id)}
                          className="rounded-xl h-9 text-xs font-semibold border-rose-500/30 text-rose-600 hover:bg-rose-500/10 dark:text-rose-400 gap-1"
                        >
                          <XCircleIcon className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setApproveTargetId(request.id)}
                          className="rounded-xl h-9 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-1"
                        >
                          <CheckCircle2Icon className="h-3.5 w-3.5" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* -------------------------------------------------------------
          APPROVE CONFIRMATION DIALOG
         ------------------------------------------------------------- */}
      <Dialog open={Boolean(approveTargetId)} onOpenChange={(open) => !open && setApproveTargetId(null)}>
        <DialogContent className="rounded-3xl max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
              <CheckCircle2Icon className="h-5 w-5 text-emerald-500" />
              Approve Booking Request
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pt-1">
              Are you sure you want to approve this booking request? This will authorize the tenant to proceed with lease agreement details.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row gap-2 pt-3 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setApproveTargetId(null)}
              disabled={isUpdating}
              className="flex-1 rounded-xl h-11 text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmApprove}
              disabled={isUpdating}
              className="flex-1 rounded-xl h-11 text-xs font-bold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isUpdating ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <CheckCircle2Icon className="h-4 w-4" />
                  Approve Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* -------------------------------------------------------------
          REJECT CONFIRMATION DIALOG
         ------------------------------------------------------------- */}
      <Dialog open={Boolean(rejectTargetId)} onOpenChange={(open) => !open && setRejectTargetId(null)}>
        <DialogContent className="rounded-3xl max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
              <AlertTriangleIcon className="h-5 w-5 text-rose-500" />
              Reject Booking Request
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pt-1">
              Are you sure you want to reject this booking request? The tenant will be notified that their application was declined.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row gap-2 pt-3 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setRejectTargetId(null)}
              disabled={isUpdating}
              className="flex-1 rounded-xl h-11 text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmReject}
              disabled={isUpdating}
              className="flex-1 rounded-xl h-11 text-xs font-bold gap-1.5 bg-rose-600 hover:bg-rose-700 text-white"
            >
              {isUpdating ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                <>
                  <XCircleIcon className="h-4 w-4" />
                  Reject Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

/**
 * Skeleton Loader Component for Landlord Requests
 */
export function LandlordRequestsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="w-full sm:w-44 h-36 rounded-2xl" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
