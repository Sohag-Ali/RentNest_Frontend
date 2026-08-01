import React from "react"
import { getPaymentDetails, PaymentItem } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/tenant-payment.actions"
import { PaymentReceiptView } from "../../_components/payment-receipt-view"

interface TenantPaymentDetailsPageProps {
  params: Promise<{ id: string }>
}

/**
 * TenantPaymentDetailsPage Component (Server Component)
 * 
 * Why this file exists:
 * Route component for displaying detailed receipt for a specific payment (/dashboard/tenant/payments/[id]).
 * 
 * Why Server Component:
 * Validates dynamic payment parameter `id` and fetches receipt data directly on the server.
 */
export default async function TenantPaymentDetailsPage({ params }: TenantPaymentDetailsPageProps) {
  // 1. Resolve dynamic route parameter `id` (Next.js 15 standard)
  const resolvedParams = await params
  const paymentId = resolvedParams.id

  // 2. Fetch payment details using Server Action (GET /api/payments/:paymentId)
  const response = await getPaymentDetails(paymentId)
  const paymentData: PaymentItem | null = response.data || null

  return <PaymentReceiptView payment={paymentData} />
}
