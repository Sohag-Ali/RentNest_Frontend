import React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { XCircleIcon, LayoutDashboardIcon, ArrowLeftIcon } from "lucide-react"

/**
 * Payment Cancel Page (Server Component)
 * 
 * Why this file exists:
 * Displayed when a tenant cancels or abandons a Stripe checkout session (/payment/cancel).
 * Renders the cancellation status UI without making any backend API calls.
 */
export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-md w-full rounded-3xl border-border/80 bg-card p-8 sm:p-10 text-center shadow-xl space-y-6">
        {/* Warning / Cancel Badge Icon */}
        <div className="h-20 w-20 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center border border-amber-500/20 shadow-sm">
          <XCircleIcon className="h-10 w-10" />
        </div>

        {/* Heading & Information */}
        <div className="space-y-2">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30">
            Payment Cancelled
          </Badge>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-heading">
            Payment Cancelled
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You canceled the payment session or returned to checkout. No funds were charged to your account. You can resume checkout anytime from your rental requests.
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            render={<Link href="/dashboard/tenant/requests" />}
            className="w-full sm:w-auto rounded-2xl px-6 h-11 text-xs font-bold bg-primary text-primary-foreground shadow-md gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Return to Requests</span>
          </Button>

          <Button
            render={<Link href="/dashboard/tenant" />}
            className="w-full sm:w-auto rounded-2xl px-6 h-11 text-xs font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-2"
          >
            <LayoutDashboardIcon className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}