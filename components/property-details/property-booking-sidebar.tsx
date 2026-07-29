"use client"

import React, { useState } from "react"
import { Property } from "@/lib/mock-data/properties"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
} from "lucide-react"

interface PropertyBookingSidebarProps {
  property: Property
}

export function PropertyBookingSidebar({ property }: PropertyBookingSidebarProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [moveInDate, setMoveInDate] = useState("")
  const [tenantName, setTenantName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsBookingOpen(false)
    }, 2500)
  }

  return (
    <>
      <Card className="rounded-3xl border-border/80 bg-card/90 backdrop-blur-xl shadow-2xl shadow-black/10 sticky top-24 overflow-hidden">
        {/* Top Header */}
        <CardHeader className="p-6 pb-4 border-b border-border/50 bg-muted/20">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-foreground font-mono">
                ${property.price.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground font-normal"> / month</span>
            </div>
            <Badge variant="success" className="text-xs gap-1">
              <CheckCircle2Icon className="h-3.5 w-3.5" />
              Available
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
            <InfoIcon className="h-3 w-3" />
            Security Deposit: ${property.overview.depositAmount.toLocaleString()} (Fully Refundable)
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Quick breakdown list */}
          <div className="space-y-2.5 rounded-2xl bg-muted/30 p-3.5 border border-border/40 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Monthly Base Rent</span>
              <span className="font-mono text-foreground font-semibold">
                ${property.price.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Security Deposit</span>
              <span className="font-mono text-foreground font-semibold">
                ${property.overview.depositAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Lease Terms</span>
              <span className="font-semibold text-foreground">{property.overview.leaseTerm}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
            <ShieldCheckIcon className="h-4 w-4 shrink-0" />
            <span>RentNest Verified Guarantee Included</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <Button
              onClick={() => setIsBookingOpen(true)}
              className="w-full rounded-2xl h-12 text-sm font-bold gap-2 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              <SparklesIcon className="h-4 w-4 text-amber-400 fill-amber-400" />
              Request Booking Now
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsBookingOpen(true)}
              className="w-full rounded-2xl h-11 text-xs font-semibold gap-2 border-input hover:bg-muted/70"
            >
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              Schedule In-Person Tour
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

      {/* Booking Request Dialog Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCardIcon className="h-5 w-5 text-primary" />
              Request Lease Application
            </DialogTitle>
            <DialogDescription>
              Submit your move-in request for {property.title}.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2Icon className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-foreground">Application Request Sent!</h4>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                The landlord ({property.landlord.name}) has received your booking inquiry and will issue lease documents shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                <Input
                  required
                  placeholder="e.g. Alex Johnson"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="rounded-xl h-10 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Preferred Move-in Date</label>
                <Input
                  required
                  type="date"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="rounded-xl h-10 text-xs"
                />
              </div>

              <div className="rounded-2xl bg-muted/40 p-3 text-xs space-y-1 border border-border/40 font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Rent</span>
                  <span>${property.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Refundable Security Deposit</span>
                  <span>${property.overview.depositAmount.toLocaleString()}</span>
                </div>
              </div>

              <Button type="submit" className="w-full rounded-xl h-11 font-bold gap-2">
                <CheckCircle2Icon className="h-4 w-4" />
                Confirm & Submit Application
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
