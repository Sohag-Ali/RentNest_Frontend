import React from "react"
import { Card } from "@/components/ui/card"
import { StarIcon } from "lucide-react"

export default function LandlordReviewsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          Tenant Reviews
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Read ratings and feedback left by tenants for your properties.
        </p>
      </div>

      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <div className="h-16 w-16 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
            <StarIcon className="h-8 w-8 fill-current" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Property Reviews & Ratings</h3>
          <p className="text-xs text-muted-foreground">
            Tenant feedback and property performance ratings will be collected here.
          </p>
        </div>
      </Card>
    </div>
  )
}
