"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { PaymentItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-payment.actions"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CreditCardIcon,
  SearchIcon,
  ArrowUpDownIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  CopyIcon,
  CheckIcon,
  Building2Icon,
  MapPinIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  DollarSignIcon,
  ReceiptIcon,
  CalendarIcon,
  ImageOffIcon,
} from "lucide-react"
import { toast } from "sonner"

interface TenantPaymentsListProps {
  initialPayments: PaymentItem[]
}

/**
 * Format category name cleanly from object or raw string
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
 * Shorten raw transaction ID string for display
 */
const shortenTxId = (txId: string): string => {
  if (!txId) return "N/A"
  if (txId.length <= 12) return txId
  return `${txId.substring(0, 9)}...`
}

/**
 * Default fallback property image URL
 */
const DEFAULT_PROPERTY_IMAGE =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"

/**
 * Extracts real property image URL from property object dynamically
 */
const getPropertyImageUrl = (property: any): string => {
  if (!property) return DEFAULT_PROPERTY_IMAGE

  if (typeof property.mainImage === "string" && property.mainImage.trim() !== "") {
    return property.mainImage.trim()
  }
  if (typeof property.main_image === "string" && property.main_image.trim() !== "") {
    return property.main_image.trim()
  }
  if (typeof property.image === "string" && property.image.trim() !== "") {
    return property.image.trim()
  }
  if (typeof property.imageUrl === "string" && property.imageUrl.trim() !== "") {
    return property.imageUrl.trim()
  }
  if (typeof property.featuredImage === "string" && property.featuredImage.trim() !== "") {
    return property.featuredImage.trim()
  }
  if (Array.isArray(property.images) && property.images.length > 0) {
    const firstImg = property.images[0]
    if (typeof firstImg === "string" && firstImg.trim() !== "") {
      return firstImg.trim()
    }
    if (typeof firstImg === "object" && firstImg?.url && typeof firstImg.url === "string") {
      return firstImg.url.trim()
    }
  }
  return DEFAULT_PROPERTY_IMAGE
}

const ITEMS_PER_PAGE = 5

export function TenantPaymentsList({ initialPayments }: TenantPaymentsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<"latest" | "oldest" | "highest" | "lowest">("latest")
  const [currentPage, setCurrentPage] = useState(1)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // -------------------------------------------------------------
  // CALCULATE STATISTIC CARDS METRICS
  // -------------------------------------------------------------
  const totalPaymentsCount = initialPayments.length

  const totalAmountPaid = useMemo(() => {
    return initialPayments.reduce((acc, curr) => {
      if (curr.status === "COMPLETED" || curr.status === "paid") {
        return acc + (curr.amount || 0)
      }
      return acc
    }, 0)
  }, [initialPayments])

  const completedCount = useMemo(() => {
    return initialPayments.filter(
      (p) => p.status === "COMPLETED" || p.status === "paid"
    ).length
  }, [initialPayments])

  const latestPaymentDate = useMemo(() => {
    if (initialPayments.length === 0) return "N/A"
    const sorted = [...initialPayments].sort((a, b) => {
      const dateA = new Date(a.paidAt || a.createdAt || 0).getTime()
      const dateB = new Date(b.paidAt || b.createdAt || 0).getTime()
      return dateB - dateA
    })
    const latest = sorted[0]?.paidAt || sorted[0]?.createdAt
    return latest
      ? new Date(latest).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "N/A"
  }, [initialPayments])

  // -------------------------------------------------------------
  // SEARCH & SORT FILTERING LOGIC
  // -------------------------------------------------------------
  const filteredPayments = useMemo(() => {
    return initialPayments
      .filter((item) => {
        const title = item.rentalRequest?.property?.title || ""
        const txId = item.transactionId || ""
        const query = searchQuery.toLowerCase().trim()
        return title.toLowerCase().includes(query) || txId.toLowerCase().includes(query)
      })
      .sort((a, b) => {
        const dateA = new Date(a.paidAt || a.createdAt || 0).getTime()
        const dateB = new Date(b.paidAt || b.createdAt || 0).getTime()
        const amountA = a.amount || 0
        const amountB = b.amount || 0

        if (sortOption === "latest") return dateB - dateA
        if (sortOption === "oldest") return dateA - dateB
        if (sortOption === "highest") return amountB - amountA
        if (sortOption === "lowest") return amountA - amountB
        return 0
      })
  }, [initialPayments, searchQuery, sortOption])

  // -------------------------------------------------------------
  // PAGINATION LOGIC
  // -------------------------------------------------------------
  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / ITEMS_PER_PAGE))
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredPayments.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredPayments, currentPage])

  const handleCopyTxId = (txId: string) => {
    navigator.clipboard.writeText(txId)
    setCopiedId(txId)
    toast.success("Transaction ID copied to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. STATISTIC CARDS HEADER SECTION                              */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Payments */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Payments</span>
            <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <ReceiptIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-foreground font-mono">{totalPaymentsCount}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Recorded transactions</p>
          </div>
        </Card>

        {/* Total Amount Paid */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Amount Paid</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <DollarSignIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              ${totalAmountPaid.toLocaleString()}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Successful lease payments</p>
          </div>
        </Card>

        {/* Latest Payment Date */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Latest Payment Date</span>
            <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-bold text-foreground font-heading truncate">{latestPaymentDate}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Most recent activity</p>
          </div>
        </Card>

        {/* Completed Payment Count */}
        <Card className="p-5 rounded-3xl border-border/70 bg-card shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Completed Payments</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2Icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-foreground font-mono">{completedCount}</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
              Verified by backend
            </p>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SEARCH & SORT CONTROLS BAR                                 */}
      {/* ------------------------------------------------------------- */}
      <Card className="p-4 rounded-3xl border-border/70 bg-card shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by property title or transaction ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 h-10 text-xs rounded-2xl border-border/60 bg-muted/30 focus-visible:ring-primary"
          />
        </div>

        {/* Sort Select Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <ArrowUpDownIcon className="h-3.5 w-3.5" />
            Sort:
          </span>
          <select
            value={sortOption}
            onChange={(e: any) => {
              setSortOption(e.target.value)
              setCurrentPage(1)
            }}
            className="h-10 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-3 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </Card>

      {/* ------------------------------------------------------------- */}
      {/* 3. MAIN TABLE & RESPONSIVE MOBILE CARDS                       */}
      {/* ------------------------------------------------------------- */}
      {paginatedPayments.length === 0 ? (
        /* EMPTY STATE */
        <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
              <CreditCardIcon className="h-10 w-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                No payment history found
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {searchQuery
                  ? `No payment records matched "${searchQuery}". Try searching with a different term.`
                  : "You haven't completed any lease payments yet."}
              </p>
            </div>
            {searchQuery ? (
              <Button
                onClick={() => setSearchQuery("")}
                variant="outline"
                className="rounded-2xl px-6 h-10 text-xs font-bold"
              >
                Clear Search Filter
              </Button>
            ) : (
              <Button
                render={<Link href="/properties" />}
                className="rounded-2xl px-6 h-11 text-xs font-bold bg-primary text-primary-foreground shadow-md"
              >
                Browse Properties
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <>
          {/* DESKTOP TABLE VIEW (Visible on lg screens and up) */}
          <div className="hidden lg:block">
            <Card className="rounded-3xl border-border/70 bg-card shadow-sm overflow-hidden p-0">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-foreground py-4 pl-6">Property</TableHead>
                    <TableHead className="text-xs font-bold text-foreground py-4">Amount</TableHead>
                    <TableHead className="text-xs font-bold text-foreground py-4">Provider</TableHead>
                    <TableHead className="text-xs font-bold text-foreground py-4">Transaction ID</TableHead>
                    <TableHead className="text-xs font-bold text-foreground py-4">Paid Date</TableHead>
                    <TableHead className="text-xs font-bold text-foreground py-4">Status</TableHead>
                    <TableHead className="text-xs font-bold text-foreground py-4 pr-6 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedPayments.map((payment) => {
                    const property = payment.rentalRequest?.property
                    const landlord = property?.landlord
                    const categoryName = formatCategoryName(property?.category)
                    const propertyImage = getPropertyImageUrl(property)

                    const isCompleted = payment.status === "COMPLETED" || payment.status === "paid"
                    const isFailed = payment.status === "FAILED" || payment.status === "failed"

                    const formattedDate = payment.paidAt || payment.createdAt
                      ? new Date(payment.paidAt || payment.createdAt!).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"

                    return (
                      <TableRow key={payment.id} className="border-border/50 hover:bg-muted/30 transition-colors group">
                        {/* Property Info Cell with Real Image */}
                        <TableCell className="py-4 pl-6">
                          <div className="flex items-center gap-3.5">
                            <div className="relative h-14 w-20 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/60 shadow-xs group-hover:shadow-md transition-shadow">
                              {propertyImage ? (
                                <Image
                                  src={propertyImage}
                                  alt={property?.title || "Property"}
                                  fill
                                  unoptimized
                                  sizes="80px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                                  <ImageOffIcon className="h-5 w-5" />
                                </div>
                              )}
                            </div>
                            <div className="space-y-0.5 min-w-0">
                              <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                {categoryName}
                              </span>
                              <h4 className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                {property?.title || "Rental Property"}
                              </h4>
                              <p className="text-[11px] text-muted-foreground flex items-center gap-1 line-clamp-1">
                                <MapPinIcon className="h-3 w-3 text-primary shrink-0" />
                                {property?.location || "Location N/A"}
                              </p>
                              {landlord?.name && (
                                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                  <UserIcon className="h-2.5 w-2.5 shrink-0" />
                                  Host: {landlord.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        {/* Amount Cell */}
                        <TableCell className="py-4 font-mono font-extrabold text-foreground text-sm">
                          ${payment.amount ? payment.amount.toLocaleString() : 0}
                        </TableCell>

                        {/* Provider Cell */}
                        <TableCell className="py-4">
                          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
                            {payment.provider || "STRIPE"}
                          </Badge>
                        </TableCell>

                        {/* Transaction ID Cell */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                            <span>{shortenTxId(payment.transactionId)}</span>
                            <button
                              onClick={() => handleCopyTxId(payment.transactionId)}
                              title="Copy full Transaction ID"
                              className="p-1 hover:text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer"
                            >
                              {copiedId === payment.transactionId ? (
                                <CheckIcon className="h-3 w-3 text-emerald-500" />
                              ) : (
                                <CopyIcon className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </TableCell>

                        {/* Paid Date Cell */}
                        <TableCell className="py-4 text-xs text-muted-foreground">
                          {formattedDate}
                        </TableCell>

                        {/* Status Badge Cell */}
                        <TableCell className="py-4">
                          {isCompleted ? (
                            <Badge variant="success" className="gap-1 text-[11px]">
                              <CheckCircle2Icon className="h-3 w-3" />
                              Completed
                            </Badge>
                          ) : isFailed ? (
                            <Badge variant="destructive" className="gap-1 text-[11px]">
                              <XCircleIcon className="h-3 w-3" />
                              Failed
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="gap-1 text-[11px] bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
                            >
                              <ClockIcon className="h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                        </TableCell>

                        {/* Action Button Cell */}
                        <TableCell className="py-4 pr-6 text-right">
                          <Button
                            render={<Link href={`/dashboard/tenant/payments/${payment.id}`} />}
                            variant="outline"
                            size="sm"
                            className="rounded-xl h-8 px-3 text-xs font-bold gap-1.5 hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            <EyeIcon className="h-3.5 w-3.5" />
                            <span>View Details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* MOBILE CARDS VIEW (Visible on screens below lg) */}
          <div className="block lg:hidden space-y-4">
            {paginatedPayments.map((payment) => {
              const property = payment.rentalRequest?.property
              const landlord = property?.landlord
              const categoryName = formatCategoryName(property?.category)
              const propertyImage = getPropertyImageUrl(property)

              const isCompleted = payment.status === "COMPLETED" || payment.status === "paid"
              const isFailed = payment.status === "FAILED" || payment.status === "failed"

              const formattedDate = payment.paidAt || payment.createdAt
                ? new Date(payment.paidAt || payment.createdAt!).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"

              return (
                <Card key={payment.id} className="p-5 rounded-3xl border-border/70 bg-card shadow-sm space-y-4">
                  {/* Card Header: Property Image & Details */}
                  <div className="flex gap-3.5">
                    <div className="relative h-20 w-24 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/60 shadow-xs">
                      {propertyImage ? (
                        <Image
                          src={propertyImage}
                          alt={property?.title || "Property"}
                          fill
                          unoptimized
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                          <ImageOffIcon className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {categoryName}
                        </span>
                        {isCompleted ? (
                          <Badge variant="success" className="gap-1 text-[10px]">
                            <CheckCircle2Icon className="h-3 w-3" />
                            Completed
                          </Badge>
                        ) : isFailed ? (
                          <Badge variant="destructive" className="gap-1 text-[10px]">
                            <XCircleIcon className="h-3 w-3" />
                            Failed
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="gap-1 text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400"
                          >
                            <ClockIcon className="h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-foreground line-clamp-1">
                        {property?.title || "Rental Property"}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 line-clamp-1">
                        <MapPinIcon className="h-3 w-3 text-primary shrink-0" />
                        {property?.location || "Location N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-muted/40 border border-border/40">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Amount</span>
                      <span className="font-mono font-extrabold text-foreground text-sm">
                        ${payment.amount ? payment.amount.toLocaleString() : 0}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground block">Paid Date</span>
                      <span className="font-medium text-foreground text-xs">{formattedDate}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground block">Provider</span>
                      <span className="font-bold text-foreground text-xs">{payment.provider || "STRIPE"}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground block">Transaction Ref</span>
                      <span className="font-mono text-[11px] text-foreground flex items-center gap-1">
                        {shortenTxId(payment.transactionId)}
                        <button onClick={() => handleCopyTxId(payment.transactionId)}>
                          <CopyIcon className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </span>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <Button
                    render={<Link href={`/dashboard/tenant/payments/${payment.id}`} />}
                    className="w-full rounded-2xl h-10 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-md"
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span>View Details</span>
                  </Button>
                </Card>
              )
            })}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* 4. PAGINATION CONTROLS                                        */}
          {/* ------------------------------------------------------------- */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground font-medium">
                Showing Page <span className="font-bold text-foreground">{currentPage}</span> of{" "}
                <span className="font-bold text-foreground">{totalPages}</span>
              </p>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="rounded-xl h-9 text-xs font-bold gap-1"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                <Button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="rounded-xl h-9 text-xs font-bold gap-1"
                >
                  <span>Next</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
