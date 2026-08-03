"use server"

import { cookies } from "next/headers"

// Define backend API base URL from environment variables or fallback to localhost
const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000"

// Interface defining the structure of a single landlord rental request item
export interface LandlordRequestItem {
  id: string
  status: "PENDING" | "APPROVED" | "REJECTED" | string
  moveInDate: string
  createdAt: string
  tenant?: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  property?: {
    id: string
    title: string
    mainImage?: string
    category?: { id?: string; name?: string } | string
    location: string
    price: number
  }
  payment?: any
  review?: any
}

/**
 * Server Action: Fetch all incoming rental requests for the logged-in Landlord
 * Target Endpoint: GET https://rentnest-backend-ezd1.onrender.com/api/landlord/requests
 */
export const getLandlordRequests = async () => {
  try {
    // Read the user's cookies from the server
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
    const res = await fetch(`${API_URL}/api/landlord/requests`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store", // Ensure fresh data on every fetch
    })

    if (!res.ok) {
      console.error(`Failed to fetch landlord requests. Status: ${res.status}`)
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to fetch landlord requests.",
        data: [],
      }
    }

    const result = await res.json()

    // Safely extract request array if wrapped in { success: true, data: [...] }
    const requestsList: LandlordRequestItem[] = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
      ? result
      : []

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "Fetched requests successfully",
      data: requestsList,
    }
  } catch (error: any) {
    console.error("Error in getLandlordRequests server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Error fetching landlord requests.",
      data: [],
    }
  }
}

/**
 * Server Action: Approve or Reject a specific booking request
 * Target Endpoint: PATCH https://rentnest-backend-ezd1.onrender.com/api/landlord/requests/:requestId
 * Body: { "status": "APPROVED" | "REJECTED" }
 */
export const updateLandlordRequestStatus = async (
  requestId: string,
  status: "APPROVED" | "REJECTED"
) => {
  try {
    if (!requestId || !status) {
      return {
        success: false,
        statusCode: 400,
        message: "Request ID and status are required.",
      }
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "User not logged in.",
      }
    }

    // Execute HTTP PATCH request to update request status
    const res = await fetch(`${API_URL}/api/landlord/requests/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status }),
      cache: "no-store",
    })

    const result = await res.json()

    return {
      success: result.success ?? res.ok,
      statusCode: result.statusCode ?? res.status,
      message:
        result.message ||
        `Booking request ${status.toLowerCase()} successfully.`,
      data: result.data || null,
    }
  } catch (error: any) {
    console.error("Error in updateLandlordRequestStatus server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Failed to update request status.",
    }
  }
}
