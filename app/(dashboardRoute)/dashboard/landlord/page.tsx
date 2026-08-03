import React from "react"
import Link from "next/link"
import Image from "next/image"
import { getLandlordRequests, LandlordRequestItem } from "@/app/(dashboardRoute)/_action/landlord-request.actions"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InboxIcon,
  CheckCircle2Icon,
  XCircleIcon,
  DollarSignIcon,
  ArrowRightIcon,
  CalendarIcon,
  MapPinIcon,
  Building2Icon,
} from "lucide-react"

export default async function LandlordDashboardHome() {
  const response = await getLandlordRequests()
  const requests: LandlordRequestItem[] = response.data || []

  const pendingCount = requests.filter((r) => r.status === "PENDING").length
  const approvedCount = requests.filter((r) => r.status === "APPROVED").length
  const rejectedCount = requests.filter((r) => r.status === "REJECTED").length

  const monthlyEarnings = requests
    .filter((r) => r.status === "APPROVED")
    .reduce((sum, r) => sum + (r.property?.price || 0), 0)

  const getPropertyImageUrl = (property: any) => {
    if (property?.mainImage && typeof property.mainImage === "string" && property.mainImage.trim() !== "") {
      return property.mainImage
    }
    if (property?.image && typeof property.image === "string" && property.image.trim() !== "") {
      return property.image
    }
    if (Array.isArray(property?.images) && property.images.length > 0 && typeof property.images[0] === "string" && property.images[0].trim() !== "") {
      return property.images[0]
    }
    return "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
            Landlord Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track incoming tenant applications, active bookings, and monthly earnings.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/landlord/requests" />}
          className="rounded-2xl gap-2 font-bold text-xs bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all"
        >
          <span>View All Requests</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Pending Requests */}
        <Card className="rounded-3xl border-border/70 bg-card p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Pending Requests
              </p>
              <h3 className="text-3xl font-extrabold text-foreground mt-1 font-mono">
                {pendingCount}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <InboxIcon className="h-6 w-6" />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1">
            Requires your approval
          </p>
        </Card>

        {/* Card 2: Approved Bookings */}
        <Card className="rounded-3xl border-border/70 bg-card p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Approved Bookings
              </p>
              <h3 className="text-3xl font-extrabold text-foreground mt-1 font-mono">
                {approvedCount}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2Icon className="h-6 w-6" />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1">
            Active tenant agreements
          </p>
        </Card>

        {/* Card 3: Rejected Requests */}
        <Card className="rounded-3xl border-border/70 bg-card p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Rejected Requests
              </p>
              <h3 className="text-3xl font-extrabold text-foreground mt-1 font-mono">
                {rejectedCount}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
              <XCircleIcon className="h-6 w-6" />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1">
            Declined applications
          </p>
        </Card>

        {/* Card 4: Monthly Earnings */}
        <Card className="rounded-3xl border-border/70 bg-card p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Monthly Earnings
              </p>
              <h3 className="text-3xl font-extrabold text-foreground mt-1 font-mono">
                ${monthlyEarnings.toLocaleString()}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <DollarSignIcon className="h-6 w-6" />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1">
            Estimated monthly revenue
          </p>
        </Card>
      </div>

      {/* Recent Requests Section */}
      <Card className="rounded-3xl border-border/70 bg-card p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground font-heading">
            Recent Booking Requests
          </h2>
          <Link
            href="/dashboard/landlord/requests"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>Manage All Requests</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="py-12 text-center space-y-3 border border-dashed border-border/80 rounded-2xl bg-muted/20">
            <Building2Icon className="h-10 w-10 text-muted-foreground/50 mx-auto" />
            <p className="text-sm font-semibold text-foreground">No booking requests yet</p>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              When tenants submit application requests for your listed properties, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.slice(0, 5).map((req) => {
              const imgUrl = getPropertyImageUrl(req.property)

              return (
                <div
                  key={req.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/40 gap-4 hover:border-border/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-20 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/60 shadow-sm">
                      <Image
                        src={imgUrl}
                        alt={req.property?.title || "Property"}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground line-clamp-1">
                        {req.property?.title || "Rental Property"}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPinIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                        {req.property?.location}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Tenant: <span className="font-semibold text-foreground">{req.tenant?.name || req.tenant?.email}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-foreground font-mono">
                        ${req.property?.price ? req.property.price.toLocaleString() : 0} <span className="text-[10px] text-muted-foreground font-normal">/ mo</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1 justify-end mt-0.5">
                        <CalendarIcon className="h-3 w-3" />
                        Move-in: {req.moveInDate ? new Date(req.moveInDate).toLocaleDateString() : "N/A"}
                      </div>
                    </div>

                    {/* Status Badge */}
                    {req.status === "APPROVED" ? (
                      <Badge variant="success" className="text-xs px-2.5 py-1">Approved</Badge>
                    ) : req.status === "REJECTED" ? (
                      <Badge variant="destructive" className="text-xs px-2.5 py-1">Rejected</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}