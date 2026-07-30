import React from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle2Icon } from "lucide-react"

export default function LandlordApprovedBookingsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          Approved Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage active tenant rental agreements and leases.
        </p>
      </div>

      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
            <CheckCircle2Icon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Approved Bookings Hub</h3>
          <p className="text-xs text-muted-foreground">
            All approved tenant bookings and active lease agreements appear here.
          </p>
        </div>
      </Card>
    </div>
  )
}
