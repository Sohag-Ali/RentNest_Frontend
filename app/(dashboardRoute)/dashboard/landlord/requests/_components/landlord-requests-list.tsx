"use client"

import React, { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { LandlordRequestItem, updateLandlordRequestStatus } from "@/app/(dashboardRoute)/_action/landlord-request.actions"
import { Card } from "@/components/ui/card"
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
  ImageOffIcon,
} from "lucide-react"

interface LandlordRequestsListProps {
  initialRequests: LandlordRequestItem[]
}

export function LandlordRequestsList({ initialRequests }: LandlordRequestsListProps) {
  const [requests, setRequests] = useState<LandlordRequestItem[]>(initialRequests)
  const [approveTargetId, setApproveTargetId] = useState<string | null>(null)
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  // Safely extract category name
  const getCategoryName = (category: any) => {
    if (typeof category === "object" && category?.name) {
      return category.name
    }
    return typeof category === "string" ? category : "Property"
  }

  // Robust multi-key property image extractor (mainImage, main_image, image, images[0])
  const getPropertyImageUrl = (property: any): string => {
    if (!property) return ""

    if (typeof property.mainImage === "string" && property.mainImage.trim() !== "") {
      return property.mainImage.trim()
    }
    if (typeof property.main_image === "string" && property.main_image.trim() !== "") {
      return property.main_image.trim()
    }
    if (typeof property.image === "string" && property.image.trim() !== "") {
      return property.image.trim()
    }
    if (Array.isArray(property.images) && property.images.length > 0) {
      const firstImg = property.images[0]
      if (typeof firstImg === "string" && firstImg.trim() !== "") {
        return firstImg.trim()
      }
      if (typeof firstImg === "object" && firstImg?.url && typeof firstImg.url === "string") {
        return firstImg.url.trim()
      }
    }
    return ""
  }

  const handleConfirmApprove = async () => {
    if (!approveTargetId) return

    setIsUpdating(true)
    try {
      const result = await updateLandlordRequestStatus(approveTargetId, "APPROVED")
      if (result.success) {
        toast.success("Booking request approved successfully! 🎉")
        setRequests((prev) =>
          prev.map((req) => (req.id === approveTargetId ? { ...req, status: "APPROVED" } : req))
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

  const handleConfirmReject = async () => {
    if (!rejectTargetId) return

    setIsUpdating(true)
    try {
      const result = await updateLandlordRequestStatus(rejectTargetId, "REJECTED")
      if (result.success) {
        toast.success("Booking request rejected.")
        setRequests((prev) =>
          prev.map((req) => (req.id === rejectTargetId ? { ...req, status: "REJECTED" } : req))
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

  if (!requests || requests.length === 0) {
    return (
      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
            <Building2Icon className="h-10 w-10" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              No booking requests yet
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When tenants submit move-in applications for your properties, they will appear here for your review.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-5">
        {requests.map((request) => {
          const property = request.property
          const tenant = request.tenant
          const categoryName = getCategoryName(property?.category)
          const propertyImgSrc = getPropertyImageUrl(property)

          return (
            <Card
              key={request.id}
              className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Section: Property Image & Details */}
                <div className="flex flex-col sm:flex-row items-start gap-5 flex-1">
                  {/* Prominent Property Image Box */}
                  <div className="relative w-full sm:w-52 h-40 sm:h-44 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/60 shadow-sm">
                    {propertyImgSrc ? (
                      <Image
                        src={propertyImgSrc}
                        alt={property?.title || "Property Image"}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 208px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex flex-col items-center justify-center bg-muted/60 text-muted-foreground">
                        <ImageOffIcon className="h-8 w-8 mb-1 opacity-50" />
                        <span className="text-[10px] font-medium">No Image Available</span>
                      </div>
                    )}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <Badge variant="glass" className="text-[11px] font-semibold px-2.5 py-0.5 backdrop-blur-md bg-background/80">
                        {categoryName}
                      </Badge>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {property?.title || "Rental Residence"}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                        <MapPinIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{property?.location || "Location N/A"}</span>
                      </p>
                    </div>

                    {/* Tenant Profile Box */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/50 text-xs">
                      <Avatar className="h-10 w-10 border border-primary/20 shrink-0">
                        <AvatarImage src={tenant?.avatar || ""} alt={tenant?.name || "Tenant"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {tenant?.name ? tenant.name[0].toUpperCase() : "T"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground line-clamp-1">
                          {tenant?.name || "Tenant Applicant"}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 line-clamp-1 mt-0.5">
                          <MailIcon className="h-3 w-3 shrink-0 text-primary" />
                          {tenant?.email || "No email provided"}
                        </p>
                      </div>
                    </div>

                    {/* Dates & Status Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-0.5">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <CalendarIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>Move-in: </span>
                        <span className="font-semibold text-primary">
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
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">
                      ${property?.price ? property.price.toLocaleString() : 0}
                    </span>
                    <span className="text-xs text-muted-foreground font-normal"> / month</span>
                  </div>

                  {/* Status Badge & Action Controls */}
                  <div className="flex items-center gap-2">
                    {request.status === "APPROVED" ? (
                      <Badge variant="success" className="gap-1.5 px-3.5 py-1.5 text-xs font-semibold">
                        <CheckCircle2Icon className="h-3.5 w-3.5" />
                        Approved
                      </Badge>
                    ) : request.status === "REJECTED" ? (
                      <Badge variant="destructive" className="gap-1.5 px-3.5 py-1.5 text-xs font-semibold">
                        <XCircleIcon className="h-3.5 w-3.5" />
                        Rejected
                      </Badge>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setRejectTargetId(request.id)}
                          className="rounded-xl h-9 px-4 text-xs font-semibold border-rose-500/30 text-rose-600 hover:bg-rose-500/10 dark:text-rose-400 gap-1.5"
                        >
                          <XCircleIcon className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setApproveTargetId(request.id)}
                          className="rounded-xl h-9 px-4 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 gap-1.5"
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

      {/* APPROVE CONFIRMATION DIALOG */}
      <Dialog open={Boolean(approveTargetId)} onOpenChange={(open) => !open && setApproveTargetId(null)}>
        <DialogContent className="rounded-3xl max-w-md p-6 bg-card border border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
              <CheckCircle2Icon className="h-5 w-5 text-emerald-500" />
              Approve Booking Request
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pt-1">
              Are you sure you want to approve this booking request? The tenant will be authorized to complete their rental move-in process.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row gap-2 pt-4 sm:justify-end">
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

      {/* REJECT CONFIRMATION DIALOG */}
      <Dialog open={Boolean(rejectTargetId)} onOpenChange={(open) => !open && setRejectTargetId(null)}>
        <DialogContent className="rounded-3xl max-w-md p-6 bg-card border border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
              <AlertTriangleIcon className="h-5 w-5 text-rose-500" />
              Reject Booking Request
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pt-1">
              Are you sure you want to reject this booking request? The tenant will be notified that their application was declined.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row gap-2 pt-4 sm:justify-end">
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

export function LandlordRequestsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row gap-5">
            <Skeleton className="w-full sm:w-52 h-40 rounded-2xl" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
