"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { createPayment } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-payment.actions"
import { ArrowRightIcon, Loader2Icon } from "lucide-react"
import { toast } from "sonner"

interface PayCheckoutButtonProps {
  rentalRequestId: string
}

/**
 * PayCheckoutButton Component (Client Component)
 * 
 * Why this file exists:
 * Client-side button component for triggering Stripe payment checkout creation.
 * Displays loading spinner during server action request and handles automatic Stripe redirection.
 */
export function PayCheckoutButton({ rentalRequestId }: PayCheckoutButtonProps) {
  // Local state to track payment request loading status
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * Handler invoked when tenant clicks "Proceed to Payment"
   */
  const handlePayment = async () => {
    try {
      setIsLoading(true)

      // Call Server Action to initiate payment checkout session
      const response = await createPayment(rentalRequestId)

      if (response.success && response.data?.url) {
        toast.success("Redirecting to secure Stripe checkout...")
        // Automatically redirect tenant browser to Stripe Checkout URL
        window.location.href = response.data.url
      } else {
        toast.error(response.message || "Failed to initiate payment. Please try again.")
        setIsLoading(false)
      }
    } catch (error: any) {
      console.error("Payment initiation error:", error)
      toast.error(error?.message || "An unexpected error occurred.")
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full rounded-2xl h-12 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-75"
    >
      {isLoading ? (
        <>
          <Loader2Icon className="h-4 w-4 animate-spin" />
          <span>Initiating Checkout...</span>
        </>
      ) : (
        <>
          <span>Proceed to Payment</span>
          <ArrowRightIcon className="h-4 w-4" />
        </>
      )}
    </Button>
  )
}
