"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface HoverCardProps {
  content: React.ReactNode
  children: React.ReactNode
  className?: string
}

function HoverCard({ content, children, className }: HoverCardProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-64 rounded-2xl border border-border bg-popover p-4 text-popover-foreground shadow-xl outline-none animate-in fade-in-0 zoom-in-95 mt-2 left-0",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export { HoverCard }
