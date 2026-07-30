import React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2Icon, PlusIcon } from "lucide-react"

export default function LandlordPropertiesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
            My Properties
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your active rental property listings and post new residences.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/landlord/properties/new" />}
          className="rounded-2xl gap-2 font-bold text-xs bg-primary text-primary-foreground shadow-md"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add New Property</span>
        </Button>
      </div>

      <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <div className="h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <Building2Icon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Property Listings Hub</h3>
          <p className="text-xs text-muted-foreground">
            All your listed rental units and residences are managed from this dashboard.
          </p>
        </div>
      </Card>
    </div>
  )
}
