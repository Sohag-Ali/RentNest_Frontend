import React from "react"
import { Card } from "@/components/ui/card"
import { CreditCardIcon } from "lucide-react"

export default function LandlordPaymentsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          Rental Payments
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track rent payments, security deposits, and payout transactions.
        </p>
      </div>

      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <div className="h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <CreditCardIcon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Landlord Payment Overview</h3>
          <p className="text-xs text-muted-foreground">
            Monthly rental payments and payouts from tenants will be listed here.
          </p>
        </div>
      </Card>
    </div>
  )
}
