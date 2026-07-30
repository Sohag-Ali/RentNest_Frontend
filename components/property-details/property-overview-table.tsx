"use client"

import React from "react"
import { PropertyOverview } from "@/types/property"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPinIcon, CalendarIcon, FileTextIcon, ShieldAlertIcon, CarIcon, DogIcon, HomeIcon } from "lucide-react"

interface PropertyOverviewTableProps {
  overview: PropertyOverview
}

export function PropertyOverviewTable({ overview }: PropertyOverviewTableProps) {
  const overviewRows = [
    {
      icon: <MapPinIcon className="h-4 w-4 text-primary shrink-0" />,
      label: "Full Address",
      value: overview.address || "N/A",
    },
    {
      icon: <HomeIcon className="h-4 w-4 text-primary shrink-0" />,
      label: "Property Category",
      value: typeof overview.category === "object" ? (overview.category as any)?.name || "N/A" : overview.category || "N/A",
    },
    {
      icon: <CalendarIcon className="h-4 w-4 text-primary shrink-0" />,
      label: "Available From",
      value: overview.availableFrom || "N/A",
    },
    {
      icon: <FileTextIcon className="h-4 w-4 text-primary shrink-0" />,
      label: "Lease Duration",
      value: overview.leaseTerm || "N/A",
    },
    {
      icon: <ShieldAlertIcon className="h-4 w-4 text-primary shrink-0" />,
      label: "Security Deposit",
      value: overview.depositAmount != null ? `$${overview.depositAmount.toLocaleString()}` : "N/A",
    },
    {
      icon: <DogIcon className="h-4 w-4 text-primary shrink-0" />,
      label: "Pet Policy",
      value: overview.petPolicy || "N/A",
    },
    {
      icon: <CarIcon className="h-4 w-4 text-primary shrink-0" />,
      label: "Parking Spaces",
      value: overview.parkingType || "N/A",
    },
  ]

  return (
    <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md shadow-black/5">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-xl font-bold font-heading">Property Overview & Terms</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-2 space-y-3">
        {overviewRows.map((row, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1.5 gap-1">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                {row.icon}
                <span>{row.label}</span>
              </div>
              <span className="font-semibold text-foreground sm:text-right font-mono">
                {row.value}
              </span>
            </div>
            {index < overviewRows.length - 1 && <Separator className="opacity-40" />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  )
}
