import React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileTextIcon, ChevronLeftIcon } from "lucide-react"

/**
 * AdminRentalsPage Placeholder Component
 * 
 * Why this file exists:
 * Route placeholder for Rental Requests Management (/dashboard/admin/rentals).
 */
export default function AdminRentalsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link
        href="/dashboard/admin"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to Admin Dashboard
      </Link>

      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-20 w-20 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/20">
            <FileTextIcon className="h-10 w-10" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              Rental Requests Management
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              System-wide lease application tracking, landlord approvals, and tenant booking status oversight.
            </p>
          </div>
          <Button
            render={<Link href="/dashboard/admin/users" />}
            className="rounded-2xl px-6 h-11 text-xs font-bold bg-primary text-primary-foreground shadow-md"
          >
            Manage Users Instead
          </Button>
        </div>
      </Card>
    </div>
  )
}
