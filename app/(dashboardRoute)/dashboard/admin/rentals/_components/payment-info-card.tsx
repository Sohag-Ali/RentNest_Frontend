"use client"

import React from "react"
import { AdminRentalPayment } from "../../_actions/admin-rental.actions"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCardIcon, HashIcon, CalendarIcon, DollarSignIcon, ShieldCheckIcon } from "lucide-react"

interface PaymentInfoCardProps {
  payment?: AdminRentalPayment | null
}

/**
 * PaymentInfoCard Component
 * 
 * Why this file exists:
 * Component displaying detailed payment transaction logs (Transaction ID, Amount, Provider, Status, Paid At)
 * or a clean fallback message if no payment has been submitted.
 */
export function PaymentInfoCard({ payment }: PaymentInfoCardProps) {
  if (!payment) {
    return (
      <Card className="p-4 rounded-2xl bg-muted/20 border border-border/40 text-center">
        <p className="text-xs text-muted-foreground italic">No payment has been made.</p>
      </Card>
    )
  }

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(payment.amount || 0)

  const paidAtFormatted = payment.paidAt
    ? new Date(payment.paidAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A"

  return (
    <Card className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCardIcon className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-bold text-foreground">Payment Details</span>
        </div>
        <Badge variant="success" className="text-[10px]">
          {payment.status || "COMPLETED"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
        <div>
          <span className="text-[10px] text-muted-foreground block flex items-center gap-1">
            <HashIcon className="h-3 w-3" /> Payment ID
          </span>
          <span className="font-mono font-bold text-foreground text-[11px]">
            {payment.id.slice(0, 12)}...
          </span>
        </div>

        <div>
          <span className="text-[10px] text-muted-foreground block flex items-center gap-1">
            <ShieldCheckIcon className="h-3 w-3" /> Transaction ID
          </span>
          <span className="font-mono font-bold text-foreground text-[11px] truncate block">
            {payment.transactionId || "N/A"}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-muted-foreground block">Provider</span>
          <span className="font-bold text-foreground capitalize">{payment.provider || "Stripe"}</span>
        </div>

        <div>
          <span className="text-[10px] text-muted-foreground block flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" /> Paid At
          </span>
          <span className="font-medium text-foreground text-[11px]">{paidAtFormatted}</span>
        </div>

        <div className="col-span-2 pt-2 border-t border-border/30 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
            <DollarSignIcon className="h-3.5 w-3.5 text-emerald-500" /> Total Paid
          </span>
          <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {formattedAmount}
          </span>
        </div>
      </div>
    </Card>
  )
}
