"use server"

// Import Next.js cookies helper to read authentication tokens on the server
import { cookies } from "next/headers"

// Define backend API base URL from environment variables or fallback to localhost:5000
const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000"

/**
 * Interface defining the response structure when creating a payment session
 */
export interface CreatePaymentResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: {
    url: string
    sessionId: string
  }
}

/**
 * Server Action: Initiate Stripe Payment Checkout Session
 * 
 * Target Endpoint: POST /api/payments/create
 * Body: { rentalRequestId: string }
 * 
 * @param rentalRequestId The unique ID of the approved rental application request
 */
export async function createPayment(rentalRequestId: string): Promise<CreatePaymentResponse> {
  try {
    // 1. Retrieve tenant access token securely from server cookies
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "You must be logged in to initiate payment.",
      }
    }

    // 2. Send POST request to backend to create Stripe Checkout session
    const res = await fetch(`${API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      // Backend expects strictly { rentalRequestId: string }
      body: JSON.stringify({ rentalRequestId }),
      cache: "no-store", // Do not cache payment session creation
    })

    const result = await res.json()

    // 3. Handle unsuccessful response statuses from backend
    if (!res.ok || result.success === false) {
      // Safely extract message or nested validation error details from backend
      const errorMessage =
        result.message ||
        (Array.isArray(result.errorSources) && result.errorSources[0]?.message) ||
        (Array.isArray(result.errors) && result.errors[0]?.message) ||
        "Failed to create payment session."

      return {
        success: false,
        statusCode: res.status,
        message: errorMessage,
      }
    }

    // 4. Safely parse payment URL and session ID from backend payload
    const paymentUrl = result.data?.url || result.url
    const sessionId = result.data?.sessionId || result.sessionId

    if (!paymentUrl) {
      return {
        success: false,
        message: "Payment checkout URL was not returned by server.",
      }
    }

    return {
      success: true,
      statusCode: result.statusCode || 200,
      message: result.message || "Payment checkout session created successfully.",
      data: {
        url: paymentUrl,
        sessionId: sessionId || "",
      },
    }
  } catch (error: any) {
    console.error("Error in createPayment server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "An unexpected error occurred while initiating payment.",
    }
  }
}

/**
 * Interface defining complete structure of a payment history item
 */
export interface PaymentItem {
  id: string
  rentalRequestId: string
  userId?: string
  transactionId: string
  amount: number
  provider: string
  status: "COMPLETED" | "PENDING" | "FAILED" | string
  paidAt?: string
  createdAt?: string
  rentalRequest?: {
    id: string
    status: string
    moveInDate?: string
    property?: {
      id: string
      title: string
      slug?: string
      mainImage?: string
      location: string
      city?: string
      state?: string
      price: number
      images?: string[]
      landlord?: {
        id: string
        name: string
        email?: string
      }
      category?: {
        id?: string
        name?: string
      } | string
    }
  }
}

/**
 * Server Action: Fetch payment history list for tenant
 * Endpoint: GET /api/payments
 */
export async function getPaymentHistory() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "User not logged in.",
        data: [] as PaymentItem[],
      }
    }

    const res = await fetch(`${API_URL}/api/payments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`Failed to fetch payment history. Status: ${res.status}`)
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to fetch payment history.",
        data: [] as PaymentItem[],
      }
    }

    const result = await res.json()
    const paymentList: PaymentItem[] = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
      ? result
      : []

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "Payment history successfully fetched",
      data: paymentList,
    }
  } catch (error: any) {
    console.error("Error in getPaymentHistory server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Error fetching payment history.",
      data: [] as PaymentItem[],
    }
  }
}

/**
 * Server Action: Fetch details for a specific payment
 * Endpoint: GET /api/payments/:paymentId
 */
export async function getPaymentDetails(paymentId: string) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "User not logged in.",
        data: null,
      }
    }

    const res = await fetch(`${API_URL}/api/payments/${paymentId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`Failed to fetch payment details. Status: ${res.status}`)
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to fetch payment details.",
        data: null,
      }
    }

    const result = await res.json()
    const paymentData: PaymentItem | null = result.data || result || null

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "Payment details successfully fetched",
      data: paymentData,
    }
  } catch (error: any) {
    console.error("Error in getPaymentDetails server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Error fetching payment details.",
      data: null,
    }
  }
}

