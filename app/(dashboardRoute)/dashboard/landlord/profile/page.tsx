import React from "react"
import { Card } from "@/components/ui/card"
import { UserIcon } from "lucide-react"

export default function LandlordProfilePage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          Landlord Profile
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your host profile, contact information, and verification status.
        </p>
      </div>

      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <div className="h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <UserIcon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Host Profile Details</h3>
          <p className="text-xs text-muted-foreground">
            Your landlord bio, avatar, and contact preferences are managed here.
          </p>
        </div>
      </Card>
    </div>
  )
}
