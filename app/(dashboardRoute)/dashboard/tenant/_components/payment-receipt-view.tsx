"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PaymentItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-payment.actions"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle2Icon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  Building2Icon,
  MapPinIcon,
  CalendarIcon,
  CreditCardIcon,
  HashIcon,
  UserIcon,
  PrinterIcon,
  DownloadIcon,
  ExternalLinkIcon,
  ClockIcon,
  XCircleIcon,
  CopyIcon,
  CheckIcon,
  AlertTriangleIcon,
} from "lucide-react"
import { toast } from "sonner"

interface PaymentReceiptViewProps {
  payment: PaymentItem | null
}

/**
 * Format category name cleanly
 */
const formatCategoryName = (category: any): string => {
  let name = ""
  if (typeof category === "object" && category?.name) {
    name = category.name
  } else if (typeof category === "string") {
    name = category
  }

  if (
    !name ||
    name.includes("YOUR_CATEGORY") ||
    name.length > 25 ||
    /^[0-9a-f-]{30,}$/i.test(name)
  ) {
    return "Apartment"
  }
  return name
}

/**
 * Default fallback property image URL
 */
const DEFAULT_PROPERTY_IMAGE =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"

export function PaymentReceiptView({ payment }: PaymentReceiptViewProps) {
  const [isCopied, setIsCopied] = useState(false)

  // -------------------------------------------------------------
  // ERROR / NOT FOUND STATE
  // -------------------------------------------------------------
  if (!payment) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <Link
          href="/dashboard/tenant/payments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Payments
        </Link>

        <Card className="rounded-3xl border-border/80 bg-card p-10 text-center shadow-md">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-16 w-16 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center border border-rose-500/20">
              <AlertTriangleIcon className="h-8 w-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                Payment Details Not Found
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The requested payment reference ID could not be located or you may not have permission to view it.
              </p>
            </div>

            <Button
              render={<Link href="/dashboard/tenant/payments" />}
              className="rounded-2xl px-6 h-11 text-xs font-bold bg-primary text-primary-foreground shadow-md"
            >
              Return to Payments History
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const rentalRequest = payment.rentalRequest
  const property = rentalRequest?.property
  const landlord = property?.landlord
  const categoryName = formatCategoryName(property?.category)
  const propertyImage =
    property?.mainImage ||
    (Array.isArray(property?.images) && property.images[0]) ||
    DEFAULT_PROPERTY_IMAGE

  const isCompleted = payment.status === "COMPLETED" || payment.status === "paid"
  const isFailed = payment.status === "FAILED" || payment.status === "failed"

  const formattedPaidAt = payment.paidAt || payment.createdAt
    ? new Date(payment.paidAt || payment.createdAt!).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "N/A"

  const formattedMoveInDate = rentalRequest?.moveInDate
    ? new Date(rentalRequest.moveInDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A"

  const handleCopyTxId = () => {
    if (payment.transactionId) {
      navigator.clipboard.writeText(payment.transactionId)
      setIsCopied(true)
      toast.success("Transaction ID copied to clipboard")
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    toast.info("Preparing PDF receipt for download...")
    window.print()
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Print Hide Back Navigation Header */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/dashboard/tenant/payments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Payments
        </Link>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2">
          {property?.id && (
            <Button
              render={<Link href={`/properties/${property.id}`} />}
              variant="outline"
              size="sm"
              className="rounded-2xl h-9 text-xs font-bold gap-1.5"
            >
              <ExternalLinkIcon className="h-3.5 w-3.5" />
              <span>View Property</span>
            </Button>
          )}

          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="rounded-2xl h-9 text-xs font-bold gap-1.5"
          >
            <PrinterIcon className="h-3.5 w-3.5" />
            <span>Print Receipt</span>
          </Button>

          <Button
            onClick={handleDownload}
            size="sm"
            className="rounded-2xl h-9 text-xs font-bold gap-1.5 bg-primary text-primary-foreground shadow-sm"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            <span>Download</span>
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                */}
      {/* ------------------------------------------------------------- */}
      <Card className="rounded-3xl border-border/80 bg-card p-8 sm:p-10 text-center shadow-xl space-y-6 relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="space-y-3">
          <div className="h-20 w-20 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-sm">
            {isCompleted ? (
              <CheckCircle2Icon className="h-10 w-10" />
            ) : isFailed ? (
              <XCircleIcon className="h-10 w-10 text-rose-500" />
            ) : (
              <ClockIcon className="h-10 w-10 text-amber-500" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-center">
              {isCompleted ? (
                <Badge variant="success" className="px-3.5 py-1 text-xs font-bold gap-1.5">
                  <ShieldCheckIcon className="h-3.5 w-3.5" />
                  Completed
                </Badge>
              ) : isFailed ? (
                <Badge variant="destructive" className="px-3.5 py-1 text-xs font-bold gap-1.5">
                  <XCircleIcon className="h-3.5 w-3.5" />
                  Failed
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="px-3.5 py-1 text-xs font-bold gap-1.5 bg-amber-500/20 text-amber-600 dark:text-amber-400"
                >
                  <ClockIcon className="h-3.5 w-3.5" />
                  Pending
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              {isCompleted ? "✓ Payment Successful" : "Payment Details"}
            </h1>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Paid on {formattedPaidAt} via {payment.provider || "STRIPE"}
            </p>
          </div>
        </div>

        {/* Large Amount Display */}
        <div className="pt-2">
          <span className="text-4xl sm:text-5xl font-extrabold text-foreground font-mono">
            ${payment.amount ? payment.amount.toLocaleString() : 0}
          </span>
          <span className="text-xs text-muted-foreground block mt-1 font-medium">
            Lease Authorization Payment
          </span>
        </div>
      </Card>

      {/* ------------------------------------------------------------- */}
      {/* 2. STEP-BY-STEP PROGRESS TIMELINE                              */}
      {/* ------------------------------------------------------------- */}
      <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md space-y-4">
        <h3 className="text-sm font-bold text-foreground font-heading flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-primary" />
          Lease Application Timeline
        </h3>

        <div className="grid grid-cols-3 gap-2 relative">
          {/* Step 1: Booking Request */}
          <div className="flex flex-col items-center text-center space-y-2 relative z-10">
            <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
              <CheckIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Booking Request</p>
              <p className="text-[10px] text-muted-foreground">Submitted</p>
            </div>
          </div>

          {/* Step 2: Approved */}
          <div className="flex flex-col items-center text-center space-y-2 relative z-10">
            <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
              <CheckIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Approved</p>
              <p className="text-[10px] text-muted-foreground">Landlord Accepted</p>
            </div>
          </div>

          {/* Step 3: Payment Completed */}
          <div className="flex flex-col items-center text-center space-y-2 relative z-10">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs shadow-md ${
                isCompleted
                  ? "bg-emerald-500 text-white"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {isCompleted ? <CheckIcon className="h-5 w-5" /> : "3"}
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Payment Completed</p>
              <p className="text-[10px] text-muted-foreground">
                {isCompleted ? "Verified & Paid" : "Pending Payment"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------- */}
      {/* 3. PAYMENT & RENTAL INFORMATION CARDS GRID                    */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Information Card */}
        <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md space-y-4">
          <h3 className="text-sm font-bold text-foreground font-heading border-b border-border/40 pb-3 flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4 text-primary" />
            Payment Transaction Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Transaction ID</span>
              <div className="flex items-center gap-1 font-mono font-bold text-foreground">
                <span className="break-all select-all text-[11px]">{payment.transactionId}</span>
                <button
                  onClick={handleCopyTxId}
                  className="p-1 hover:text-primary transition-colors"
                  title="Copy full transaction ID"
                >
                  {isCopied ? (
                    <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <CopyIcon className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Total Amount Paid</span>
              <span className="font-mono font-extrabold text-foreground text-sm">
                ${payment.amount ? payment.amount.toLocaleString() : 0}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Payment Provider</span>
              <Badge variant="outline" className="font-mono text-[10px] font-bold">
                {payment.provider || "STRIPE"}
              </Badge>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Payment Status</span>
              {isCompleted ? (
                <Badge variant="success" className="text-[10px]">
                  Completed
                </Badge>
              ) : isFailed ? (
                <Badge variant="destructive" className="text-[10px]">
                  Failed
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] bg-amber-500/20 text-amber-600">
                  Pending
                </Badge>
              )}
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground font-medium">Paid At</span>
              <span className="font-semibold text-foreground text-right">{formattedPaidAt}</span>
            </div>
          </div>
        </Card>

        {/* Rental & Landlord Information Card */}
        <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md space-y-4">
          <h3 className="text-sm font-bold text-foreground font-heading border-b border-border/40 pb-3 flex items-center gap-2">
            <Building2Icon className="h-4 w-4 text-primary" />
            Property & Host Details
          </h3>

          <div className="space-y-4">
            {/* Property Row */}
            <div className="flex gap-3">
              <div className="relative h-16 w-20 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/40">
                <Image
                  src={propertyImage}
                  alt={property?.title || "Property Photo"}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <Badge variant="glass" className="text-[10px]">
                  {categoryName}
                </Badge>
                <h4 className="text-xs font-bold text-foreground line-clamp-1">
                  {property?.title || "Rental Residence"}
                </h4>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 line-clamp-1">
                  <MapPinIcon className="h-3 w-3 text-primary shrink-0" />
                  {property?.location || "Location N/A"}
                </p>
              </div>
            </div>

            <Separator className="bg-border/40" />

            {/* Move In Date */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                Scheduled Move-In Date
              </span>
              <span className="font-bold text-foreground">{formattedMoveInDate}</span>
            </div>

            {/* Landlord Contact Box */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/40 text-xs">
              <Avatar className="h-8 w-8 border border-border shrink-0">
                <AvatarFallback>{landlord?.name ? landlord.name[0] : "L"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground line-clamp-1">
                  Host: {landlord?.name || "Landlord"}
                </p>
                <p className="text-[10px] text-muted-foreground line-clamp-1">
                  Contact ID: {landlord?.id ? `${landlord.id.substring(0, 16)}...` : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Print Footer Notice */}
      <div className="print:block hidden text-center text-[10px] text-muted-foreground pt-6 border-t border-border">
        <p>RentNest Verified Receipt • Payment Ref: {payment.id}</p>
        <p>Thank you for choosing RentNest Property Rentals.</p>
      </div>
    </div>
  )
}
