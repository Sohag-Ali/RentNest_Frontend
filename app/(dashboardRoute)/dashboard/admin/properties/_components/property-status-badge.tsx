"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2Icon, XCircleIcon } from "lucide-react"

interface PropertyStatusBadgeProps {
  isAvailable: boolean
  className?: string
}

/**
 * PropertyStatusBadge Component
 * 
 * Why this file exists:
 * Displays availability status badges for property listings:
 * - Available = Green badge with Check icon
 * - Unavailable = Red badge with X icon
 */
export function PropertyStatusBadge({ isAvailable, className }: PropertyStatusBadgeProps) {
  if (isAvailable) {
    return (
      <Badge variant="success" className={`gap-1 text-xs px-2.5 py-0.5 ${className || ""}`}>
        <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-500" />
        <span>Available</span>
      </Badge>
    )
  }

  return (
    <Badge variant="destructive" className={`gap-1 text-xs px-2.5 py-0.5 ${className || ""}`}>
      <XCircleIcon className="h-3.5 w-3.5" />
      <span>Unavailable</span>
    </Badge>
  )
}
