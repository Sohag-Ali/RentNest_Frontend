"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2Icon, CreditCardIcon } from "lucide-react"

interface PaymentStatusBadgeProps {
  hasPayment: boolean
  status?: string
  className?: string
}

/**
 * PaymentStatusBadge Component
 * 
 * Why this file exists:
 * Displays payment status badges:
 * - Paid = Green badge with Check icon
 * - Unpaid = Gray badge with CreditCard icon
 */
export function PaymentStatusBadge({ hasPayment, status, className }: PaymentStatusBadgeProps) {
  const isPaid = hasPayment && (!status || status.toUpperCase() === "COMPLETED" || status.toUpperCase() === "SUCCEEDED" || status.toUpperCase() === "PAID")

  if (isPaid) {
    return (
      <Badge variant="success" className={`gap-1 text-xs px-2.5 py-0.5 ${className || ""}`}>
        <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-500" />
        <span>Paid</span>
      </Badge>
    )
  }

  return (
    <Badge
      variant="secondary"
      className={`gap-1 text-xs px-2.5 py-0.5 bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30 ${
        className || ""
      }`}
    >
      <CreditCardIcon className="h-3.5 w-3.5" />
      <span>Unpaid</span>
    </Badge>
  )
}
