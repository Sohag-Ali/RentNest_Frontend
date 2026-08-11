"use client"

import React, { useEffect, useState, useRef, useCallback, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import {
  getPaymentByRentalRequestId,
  PaymentItem,
} from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-payment.actions"
import { revalidateTenantRentals } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-rental.actions"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2Icon,
  Building2Icon,
  CreditCardIcon,
  HashIcon,
  ShieldCheckIcon,
  LayoutDashboardIcon,
  MapPinIcon,
  Loader2Icon,
  ClockIcon,
  RefreshCwIcon,
  XCircleIcon,
  CalendarIcon,
  ReceiptIcon,
} from "lucide-react"

/**
 * Verification state types for payment success page
 */
type VerificationStatus = "verifying" | "success" | "delayed" | "failed"

/**
 * Polling delays (in milliseconds) between retry attempts.
 * Asynchronous webhook processing is polled dynamically over ~25 seconds maximum.
 */
const POLL_DELAYS = [0, 1000, 2000, 3000, 4000, 5000, 5000, 5000]
const MAX_ATTEMPTS = POLL_DELAYS.length

/**
 * Payment Success Content Component (Client Component)
 * 
 * Why this file exists:
 * Displayed when Stripe redirects back after payment.
 * Asynchronously verifies the Payment database record exists with status COMPLETED
 * before displaying payment confirmation.
 */
function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id") || searchParams.get("sessionId") || ""
  const rentalRequestId = searchParams.get("rentalRequestId") || ""

  const [status, setStatus] = useState<VerificationStatus>("verifying")
  const [payment, setPayment] = useState<PaymentItem | null>(null)
  const [attemptCount, setAttemptCount] = useState<number>(0)

  const isMountedRef = useRef<boolean>(true)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Core Payment Verification & Polling Logic
   */
  const verifyPayment = useCallback(
    async (currentAttempt: number) => {
      if (!rentalRequestId) {
        if (isMountedRef.current) {
          setStatus("delayed")
        }
        return
      }

      try {
        // Call backend server action to check payment by rentalRequestId
        const res = await getPaymentByRentalRequestId(rentalRequestId)

        if (!isMountedRef.current) return

        if (res.success && res.data) {
          const paymentRecord = res.data

          // Verification Success Condition: status === "COMPLETED" AND matching rentalRequestId
          if (
            paymentRecord.status === "COMPLETED" &&
            paymentRecord.rentalRequestId === rentalRequestId
          ) {
            setPayment(paymentRecord)
            setStatus("success")

            // Revalidate server cache for tenant requests & refresh router
            try {
              await revalidateTenantRentals()
            } catch (e) {
              console.error("Revalidation error:", e)
            }
            router.refresh()
            return
          } else if (paymentRecord.status === "FAILED") {
            setPayment(paymentRecord)
            setStatus("failed")
            return
          }
        }

        // Webhook incomplete or record not found yet -> retry if under MAX_ATTEMPTS
        const nextAttempt = currentAttempt + 1
        if (nextAttempt < MAX_ATTEMPTS) {
          setAttemptCount(nextAttempt)
          const delay = POLL_DELAYS[nextAttempt] || 5000
          timeoutIdRef.current = setTimeout(() => {
            verifyPayment(nextAttempt)
          }, delay)
        } else {
          // Max attempts reached without COMPLETED confirmation
          setStatus("delayed")
        }
      } catch (err) {
        console.error("Error verifying payment:", err)
        const nextAttempt = currentAttempt + 1
        if (nextAttempt < MAX_ATTEMPTS) {
          setAttemptCount(nextAttempt)
          const delay = POLL_DELAYS[nextAttempt] || 5000
          timeoutIdRef.current = setTimeout(() => {
            verifyPayment(nextAttempt)
          }, delay)
        } else {
          setStatus("delayed")
        }
      }
    },
    [rentalRequestId, router]
  )

  useEffect(() => {
    isMountedRef.current = true
    setStatus("verifying")
    setAttemptCount(0)

    verifyPayment(0)

    return () => {
      isMountedRef.current = false
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [verifyPayment])

  /**
   * User manual retry handler for delayed or failed verification states
   */
  const handleRetry = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    setStatus("verifying")
    setAttemptCount(0)
    verifyPayment(0)
  }

  // -------------------------------------------------------------
  // STATE 1: VERIFYING PAYMENT (LOADING / POLLING)
  // -------------------------------------------------------------
  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="max-w-md w-full rounded-3xl border-border/80 bg-card p-8 sm:p-10 text-center shadow-xl space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20 shadow-sm">
            <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-heading">
              Verifying Payment...
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Payment received. We are verifying your payment with our servers...
            </p>
            {attemptCount > 0 && (
              <p className="text-[11px] text-muted-foreground/80 font-mono pt-1">
                Checking backend status (Attempt {attemptCount + 1} of {MAX_ATTEMPTS})...
              </p>
            )}
          </div>
        </Card>
      </div>
    )
  }

  // -------------------------------------------------------------
  // STATE 2: PAYMENT VERIFICATION DELAYED
  // -------------------------------------------------------------
  if (status === "delayed") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="max-w-md w-full rounded-3xl border-border/80 bg-card p-8 sm:p-10 text-center shadow-xl space-y-6">
          <div className="h-20 w-20 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center border border-amber-500/20 shadow-sm">
            <ClockIcon className="h-10 w-10 text-amber-500" />
          </div>

          <div className="space-y-2">
            <Badge variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs px-3 py-0.5 font-semibold">
              Pending Confirmation
            </Badge>
            <h2 className="text-xl font-bold tracking-tight text-foreground font-heading pt-1">
              Payment Verification Delayed
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Payment verification is taking longer than expected. Your payment was submitted, but backend confirmation is still processing.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleRetry}
              className="rounded-2xl px-6 h-11 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all"
            >
              <RefreshCwIcon className="h-4 w-4" />
              <span>Try Again</span>
            </Button>
            <Button
              render={<Link href="/dashboard/tenant" />}
              variant="outline"
              className="rounded-2xl px-6 h-11 text-xs font-bold gap-2 border-border/80"
            >
              <LayoutDashboardIcon className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // -------------------------------------------------------------
  // STATE 3: PAYMENT FAILED
  // -------------------------------------------------------------
  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="max-w-md w-full rounded-3xl border-border/80 bg-card p-8 sm:p-10 text-center shadow-xl space-y-6">
          <div className="h-20 w-20 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center border border-rose-500/20 shadow-sm">
            <XCircleIcon className="h-10 w-10 text-rose-500" />
          </div>

          <div className="space-y-2">
            <Badge variant="outline" className="border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs px-3 py-0.5 font-semibold">
              Payment Error
            </Badge>
            <h2 className="text-xl font-bold tracking-tight text-foreground font-heading pt-1">
              Payment Failed
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The system confirmed that this payment was not completed or was declined.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleRetry}
              className="rounded-2xl px-6 h-11 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all"
            >
              <RefreshCwIcon className="h-4 w-4" />
              <span>Try Again</span>
            </Button>
            <Button
              render={<Link href="/dashboard/tenant" />}
              variant="outline"
              className="rounded-2xl px-6 h-11 text-xs font-bold gap-2 border-border/80"
            >
              <LayoutDashboardIcon className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // -------------------------------------------------------------
  // STATE 4: PAYMENT SUCCESSFUL (VERIFIED BACKEND RECORD)
  // -------------------------------------------------------------
  const propertyTitle = payment?.rentalRequest?.property?.title
  const propertyLocation = payment?.rentalRequest?.property?.location
  const amountPaid = payment?.amount
  const transactionId = payment?.transactionId
  const paymentStatus = payment?.status || "COMPLETED"
  const paidAtDate = payment?.paidAt || payment?.createdAt
  const formattedPaidAt = paidAtDate
    ? new Date(paidAtDate).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-2xl w-full rounded-3xl border-border/80 bg-card p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Success Header Icon & Title */}
        <div className="text-center space-y-3">
          <div className="h-20 w-20 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-sm">
            <CheckCircle2Icon className="h-10 w-10" />
          </div>

          <div className="space-y-1">
            <Badge variant="success" className="px-3.5 py-1 text-xs font-bold gap-1.5">
              <ShieldCheckIcon className="h-3.5 w-3.5" />
              Verified
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading pt-1">
              ✓ Payment Successful
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your payment has been verified.
            </p>
          </div>
        </div>

        {/* Payment Summary Details */}
        <div className="rounded-2xl bg-muted/40 border border-border/60 p-5 space-y-4 text-xs">
          <h3 className="font-bold text-foreground text-sm font-heading border-b border-border/40 pb-2.5 flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4 text-primary" />
            Payment Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {propertyTitle && (
              <div className="space-y-1">
                <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                  <Building2Icon className="h-3.5 w-3.5 text-primary" />
                  Property Title
                </span>
                <p className="font-bold text-foreground line-clamp-1">{propertyTitle}</p>
                {propertyLocation && (
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 line-clamp-1">
                    <MapPinIcon className="h-3 w-3 shrink-0" />
                    {propertyLocation}
                  </p>
                )}
              </div>
            )}

            {amountPaid !== undefined && (
              <div className="space-y-1">
                <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                  <CreditCardIcon className="h-3.5 w-3.5 text-primary" />
                  Amount Paid
                </span>
                <p className="font-mono font-extrabold text-lg text-emerald-600 dark:text-emerald-400">
                  ${amountPaid.toLocaleString()}
                </p>
              </div>
            )}

            {(rentalRequestId || payment?.rentalRequestId) && (
              <div className="space-y-1">
                <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                  <HashIcon className="h-3.5 w-3.5 text-primary" />
                  Rental Request ID
                </span>
                <p className="font-mono font-semibold text-foreground text-[11px] break-all select-all bg-background/60 p-1.5 rounded-lg border border-border/40">
                  {payment?.rentalRequestId || rentalRequestId}
                </p>
              </div>
            )}

            {transactionId && (
              <div className="space-y-1">
                <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                  <ReceiptIcon className="h-3.5 w-3.5 text-primary" />
                  Transaction ID
                </span>
                <p className="font-mono font-semibold text-foreground text-[11px] break-all select-all bg-background/60 p-1.5 rounded-lg border border-border/40">
                  {transactionId}
                </p>
              </div>
            )}

            {paymentStatus && (
              <div className="space-y-1">
                <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                  <ShieldCheckIcon className="h-3.5 w-3.5 text-primary" />
                  Payment Status
                </span>
                <div>
                  <Badge variant="success" className="text-[10px] font-bold">
                    {paymentStatus}
                  </Badge>
                </div>
              </div>
            )}

            {formattedPaidAt && (
              <div className="space-y-1">
                <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                  <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                  Paid At
                </span>
                <p className="font-semibold text-foreground text-[11px]">
                  {formattedPaidAt}
                </p>
              </div>
            )}

            {sessionId && (
              <div className="space-y-1 sm:col-span-2">
                <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
                  <HashIcon className="h-3.5 w-3.5 text-primary" />
                  Session Reference
                </span>
                <p className="font-mono font-semibold text-muted-foreground text-[11px] break-all select-all bg-background/60 p-1.5 rounded-lg border border-border/40">
                  {sessionId}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <div className="pt-2 flex justify-center">
          <Button
            render={<Link href="/dashboard/tenant" />}
            className="w-full sm:w-auto rounded-2xl px-8 h-12 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          >
            <LayoutDashboardIcon className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <Card className="max-w-md w-full rounded-3xl border-border/80 bg-card p-8 text-center shadow-xl space-y-4">
            <Loader2Icon className="h-10 w-10 animate-spin text-primary mx-auto" />
            <p className="text-xs text-muted-foreground font-medium">Loading...</p>
          </Card>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
