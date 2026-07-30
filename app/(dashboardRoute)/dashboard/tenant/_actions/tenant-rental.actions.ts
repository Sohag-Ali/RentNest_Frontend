"use server"

import { cookies } from "next/headers"

// Define backend API base URL from environment variable or fallback to localhost
const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000"

// Interface defining the structure of a tenant's rental request
export interface TenantRentalItem {
  id: string
  tenantId: string
  propertyId: string
  status: "PENDING" | "APPROVED" | "REJECTED" | string
  moveInDate: string
  createdAt: string
  property?: {
    id: string
    title: string
    description?: string
    location: string
    price: number
    isAvailable?: boolean
    mainImage?: string
    images?: string[]
    landlord?: {
      id: string
      name: string
      email: string
      role?: string
    }
    category?: {
      id?: string
      name?: string
    } | string
  }
  payment?: any
  review?: any
}

/**
 * Server Action: Fetch all rental requests for the currently logged-in tenant
 * Target Endpoint: GET http://localhost:5000/api/rentals
 */
export const getMyRentals = async () => {
  try {
    // Read the tenant's accessToken from server cookies
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "User not logged in.",
        data: [],
      }
    }

    // Execute HTTP GET request to backend API
    const res = await fetch(`${API_URL}/api/rentals`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store", // Ensure fresh data on every request
    })

    if (!res.ok) {
      console.error(`Failed to fetch tenant rentals. Status: ${res.status}`)
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to fetch tenant rentals.",
        data: [],
      }
    }

    const result = await res.json()

    // Safely extract request array if wrapped in { success: true, data: [...] }
    const rentalsList: TenantRentalItem[] = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
      ? result
      : []

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "Rental requests fetched successfully",
      data: rentalsList,
    }
  } catch (error: any) {
    console.error("Error in getMyRentals server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Error fetching tenant rentals.",
      data: [],
    }
  }
}
