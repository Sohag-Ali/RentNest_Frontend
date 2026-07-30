"use server"

import { cookies } from "next/headers"

// Define backend API base URL from environment variable or fallback to localhost
const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000"

// TypeScript interface defining payload received by the server action
interface CreateRentalRequestPayload {
  propertyId: string
  moveInDate: string
}

/**
 * Server Action: Create a new rental request booking
 * 
 * Why this function exists:
 * Handles sending rental application data securely from the server to the backend API.
 * 
 * Target Endpoint: POST http://localhost:5000/api/rentals
 */
export const createRentalRequest = async (payload: CreateRentalRequestPayload) => {
  try {
    // Step 1: Read the user's accessToken from server cookies
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    // If no access token exists, return unauthorized status
    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "User not logged in. Please sign in to request a booking.",
      }
    }

    // Step 2: Validate payload data
    if (!payload.propertyId || !payload.moveInDate) {
      return {
        success: false,
        statusCode: 400,
        message: "Property ID and Move-in Date are required.",
      }
    }

    // Step 3: Send POST request to backend API (Endpoint: /api/rentals)
    const res = await fetch(`${API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        propertyId: payload.propertyId,
        moveInDate: payload.moveInDate,
      }),
      cache: "no-store",
    })

    // Step 4: Parse JSON response from backend
    const result = await res.json()

    // Return the response object to the client component caller
    return {
      success: result.success ?? res.ok,
      statusCode: result.statusCode ?? res.status,
      message: result.message || (res.ok ? "Rental request created successfully" : "Failed to create request"),
      data: result.data || null,
    }
  } catch (error: any) {
    console.error("Error in createRentalRequest server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Internal server error. Please try again later.",
    }
  }
}
