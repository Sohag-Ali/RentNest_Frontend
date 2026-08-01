"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { ClockIcon, CheckCircle2Icon, CheckCheckIcon, XCircleIcon } from "lucide-react"

interface RentalStatusBadgeProps {
  status: string
  className?: string
}

/**
 * RentalStatusBadge Component
 * 
 * Why this file exists:
 * Displays rental request status badges:
 * - PENDING = Yellow badge
 * - APPROVED = Blue badge
 * - COMPLETED = Green badge
 * - REJECTED = Red badge
 */
export function RentalStatusBadge({ status, className }: RentalStatusBadgeProps) {
  const upperStatus = (status || "PENDING").toUpperCase()

  if (upperStatus === "APPROVED") {
    return (
      <Badge
        variant="outline"
        className={`gap-1 text-xs px-2.5 py-0.5 border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10 font-bold ${
          className || ""
        }`}
      >
        <CheckCircle2Icon className="h-3.5 w-3.5 text-blue-500" />
        <span>APPROVED</span>
      </Badge>
    )
  }

  if (upperStatus === "COMPLETED") {
    return (
      <Badge variant="success" className={`gap-1 text-xs px-2.5 py-0.5 ${className || ""}`}>
        <CheckCheckIcon className="h-3.5 w-3.5 text-emerald-500" />
        <span>COMPLETED</span>
      </Badge>
    )
  }

  if (upperStatus === "REJECTED") {
    return (
      <Badge variant="destructive" className={`gap-1 text-xs px-2.5 py-0.5 ${className || ""}`}>
        <XCircleIcon className="h-3.5 w-3.5" />
        <span>REJECTED</span>
      </Badge>
    )
  }

  // Fallback: PENDING (Yellow)
  return (
    <Badge
      variant="secondary"
      className={`gap-1 text-xs px-2.5 py-0.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold ${
        className || ""
      }`}
    >
      <ClockIcon className="h-3.5 w-3.5 text-amber-500" />
      <span>PENDING</span>
    </Badge>
  )
}
