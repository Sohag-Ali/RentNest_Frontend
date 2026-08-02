"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Property } from "@/types/property"
import { createRentalRequest } from "@/app/(publicRoute)/properties/_actions/rental-request.actions"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  CalendarIcon,
  ShieldCheckIcon,
  HeartIcon,
  CheckCircle2Icon,
  SparklesIcon,
  CreditCardIcon,
  InfoIcon,
  Loader2Icon,
  MapPinIcon,
  LockIcon,
  LogInIcon,
  XCircleIcon,
} from "lucide-react"

interface PropertyBookingSidebarProps {
  property: Property
  isLoggedIn?: boolean
}

/**
 * PropertyBookingSidebar Component
 * 
 * Why this file exists:
 * Displays the price breakdown sidebar and manages the Booking Request Dialog modal.
 * 
 * What it handles:
 * 1. If user is NOT logged in: Opens a dialog telling them "You are not logged in" with a "Log In Now" button.
 * 2. If user IS logged in: Opens the booking form dialog to pick a move-in date and submit the application.
 */
export function PropertyBookingSidebar({
  property,
  isLoggedIn = false,
}: PropertyBookingSidebarProps) {
  const router = useRouter()

  // Local component state
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [moveInDate, setMoveInDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false)

  // Extract resolved property ID
  const propertyId = (property as any)._id || property.id || ""

  /**
   * Handle Click on "Request Booking Now" button
   */
  const handleOpenBookingDialog = () => {
    if (!property.isAvailable) {
      toast.error("This property is currently not available for booking.")
      return
    }

    // 1. If already submitted and pending approval, inform the user
    if (isBookingSubmitted) {
      toast.info("Your booking request is pending landlord approval.")
      return
    }

    // 2. Open the Dialog modal (works for both logged-in and logged-out users)
    setIsBookingOpen(true)
  }

  /**
   * Handle Submission of Booking Request Form (Logged-in users)
   */
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!moveInDate) {
      toast.error("Please select a move-in date.")
      return
    }

    setIsSubmitting(true)

    try {
      // Call Server Action to submit request to backend API (http://localhost:5000/api/rentals)
      const result = await createRentalRequest({
        propertyId,
        moveInDate,
      })

      // Handle 401 Unauthorized
      if (result.statusCode === 401 || result.message?.toLowerCase().includes("not logged in")) {
        toast.error("Session expired. Please log in again.")
        setIsBookingOpen(false)
        router.push("/auth/login")
        return
      }

      if (result.success) {
        // Show success notification
        toast.success("Booking request sent successfully. Please wait for landlord approval.")

        // Close dialog modal
        setIsBookingOpen(false)

        // Disable button and set text to "Pending Approval"
        setIsBookingSubmitted(true)
      } else {
        // Show error notification
        toast.error(result.message || "Failed to submit booking request. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting rental request:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const depositFormatted =
    property.overview?.depositAmount != null
      ? `$${property.overview.depositAmount.toLocaleString()}`
      : "N/A"

  return (
    <>
      <Card className="rounded-3xl border-border/80 bg-card/90 backdrop-blur-xl shadow-2xl shadow-black/10 sticky top-24 overflow-hidden">
        {/* Top Header Price Display */}
        <CardHeader className="p-6 pb-4 border-b border-border/50 bg-muted/20">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-foreground font-mono">
                ${property.price ? property.price.toLocaleString() : 0}
              </span>
              <span className="text-xs text-muted-foreground font-normal"> / month</span>
            </div>
            {property.isAvailable ? (
              <Badge variant="success" className="text-xs gap-1">
                <CheckCircle2Icon className="h-3.5 w-3.5" />
                Available
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs gap-1 bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold">
                <XCircleIcon className="h-3.5 w-3.5 text-rose-500" />
                Not Available
              </Badge>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
            <InfoIcon className="h-3 w-3" />
            Security Deposit: {depositFormatted} (Refundable)
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Rent Breakdown */}
          <div className="space-y-2.5 rounded-2xl bg-muted/30 p-3.5 border border-border/40 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Monthly Base Rent</span>
              <span className="font-mono text-foreground font-semibold">
                ${property.price ? property.price.toLocaleString() : 0}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Security Deposit</span>
              <span className="font-mono text-foreground font-semibold">
                {depositFormatted}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Lease Terms</span>
              <span className="font-semibold text-foreground">{property.overview?.leaseTerm || "12 Months"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
            <ShieldCheckIcon className="h-4 w-4 shrink-0" />
            <span>RentNest Verified Guarantee Included</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <Button
              onClick={handleOpenBookingDialog}
              disabled={!property.isAvailable || isBookingSubmitted}
              className={`w-full rounded-2xl h-12 text-sm font-bold gap-2 shadow-lg transition-all ${
                !property.isAvailable
                  ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 cursor-not-allowed opacity-80"
                  : isBookingSubmitted
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:shadow-xl"
              }`}
            >
              {!property.isAvailable ? (
                <>
                  <XCircleIcon className="h-4 w-4 text-rose-500" />
                  Not Available for Booking
                </>
              ) : isBookingSubmitted ? (
                <>
                  <CheckCircle2Icon className="h-4 w-4 text-amber-500" />
                  Pending Approval
                </>
              ) : (
                <>
                  <SparklesIcon className="h-4 w-4 text-amber-400 fill-amber-400" />
                  Request Booking Now
                </>
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-border/40">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`text-xs font-semibold gap-1.5 ${
              isWishlisted ? "text-rose-500" : "text-muted-foreground"
            }`}
          >
            <HeartIcon className={`h-4 w-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
            <span>{isWishlisted ? "Saved to Wishlist" : "Save Property"}</span>
          </Button>

          <span className="text-[10px] text-muted-foreground">No immediate charge</span>
        </CardFooter>
      </Card>

      {/* Shadcn Dialog Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="rounded-3xl max-w-md p-6">
          {!isLoggedIn ? (
            /* -------------------------------------------------------------
               CASE 1: USER IS NOT LOGGED IN
               Shows a dialog informing the user that login is required.
               ------------------------------------------------------------- */
            <div className="py-4 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center border border-amber-500/20">
                <LockIcon className="h-8 w-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-foreground">You Are Not Logged In</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  You must be logged in to your RentNest account to submit a rental request for this property.
                </p>
              </div>

              {/* Selected Property Preview */}
              <div className="flex gap-3 p-3 rounded-2xl bg-muted/40 border border-border/50 items-center text-left">
                <div className="relative h-14 w-16 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={property.mainImage || "/placeholder.jpg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-foreground line-clamp-1">{property.title}</h4>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5 line-clamp-1">
                    <MapPinIcon className="h-3 w-3 text-primary shrink-0" />
                    {property.location}
                  </p>
                </div>
              </div>

              {/* Modal Buttons for Logged Out User */}
              <div className="flex flex-row gap-2 pt-2 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBookingOpen(false)}
                  className="flex-1 rounded-xl h-11 text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsBookingOpen(false)
                    router.push("/auth/login")
                  }}
                  className="flex-1 rounded-xl h-11 text-xs font-bold gap-1.5 bg-primary text-primary-foreground"
                >
                  <LogInIcon className="h-4 w-4" />
                  Log In Now
                </Button>
              </div>
            </div>
          ) : (
            /* -------------------------------------------------------------
               CASE 2: USER IS LOGGED IN
               Shows the move-in date booking form dialog.
               ------------------------------------------------------------- */
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                  <CreditCardIcon className="h-5 w-5 text-primary" />
                  Request Rental Booking
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Complete your move-in request for landlord review.
                </DialogDescription>
              </DialogHeader>

              {/* Selected Property Preview */}
              <div className="flex gap-3.5 p-3 rounded-2xl bg-muted/40 border border-border/50 items-center">
                <div className="relative h-16 w-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={property.mainImage || "/placeholder.jpg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-foreground line-clamp-1">{property.title}</h4>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5 line-clamp-1">
                    <MapPinIcon className="h-3 w-3 text-primary shrink-0" />
                    {property.location}
                  </p>
                  <div className="text-xs font-extrabold text-foreground font-mono mt-1">
                    ${property.price ? property.price.toLocaleString() : 0} <span className="text-[10px] font-normal text-muted-foreground">/ month</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-1">
                {/* Move-in Date Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                    Select Move-in Date
                  </label>
                  <Input
                    required
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="rounded-xl h-11 text-xs"
                  />
                </div>

                {/* Price Summary */}
                <div className="rounded-2xl bg-muted/30 p-3 text-xs space-y-1.5 border border-border/40 font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Monthly Rent</span>
                    <span className="font-semibold text-foreground">${property.price ? property.price.toLocaleString() : 0}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Security Deposit</span>
                    <span className="font-semibold text-foreground">{depositFormatted}</span>
                  </div>
                </div>

                {/* Action Buttons: Cancel and Confirm */}
                <DialogFooter className="flex flex-row gap-2 pt-2 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsBookingOpen(false)}
                    className="flex-1 rounded-xl h-11 text-xs font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl h-11 text-xs font-bold gap-1.5 bg-primary text-primary-foreground"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle2Icon className="h-4 w-4" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
