import React from "react"
import { getPaymentHistory, PaymentItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-payment.actions"
import { TenantPaymentsList } from "../_components/tenant-payments-list"

/**
 * TenantPaymentsPage Component (Server Component)
 * 
 * Why this file exists:
 * Top-level route component for viewing tenant payment history (/dashboard/tenant/payments).
 * 
 * Why Server Component:
 * Fetches tenant payment transaction records directly on the server for security and performance.
 */
export default async function TenantPaymentsPage() {
  // Fetch tenant payment records via Server Action (GET /api/payments)
  const response = await getPaymentHistory()
  const payments: PaymentItem[] = response.data || []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          Payment History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review your completed lease transactions, verify payment receipts, and track payment history.
        </p>
      </div>

      {/* Interactive Client Component for Stats, Search, Sorting, Table & Mobile Cards */}
      <TenantPaymentsList initialPayments={payments} />
    </div>
  )
}
