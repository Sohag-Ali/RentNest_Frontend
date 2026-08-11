"use server"

import { cookies } from "next/headers"

// Define the base backend API URL from environment variables or fallback to localhost
const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000"

/**
 * Server Action: Fetch all properties from the backend API
 * Endpoint: GET http://localhost:5000/api/properties
 */
export const getProperties = async () => {
  try {
    // Read the user's cookies from the server
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    // Prepare HTTP headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    // If an access token exists, include it in the headers for authentication
    if (accessToken) {
      headers["Cookie"] = `accessToken=${accessToken}`
    }

    // Perform the HTTP GET request to backend
    const res = await fetch(`${API_URL}/api/properties`, {
      headers,
      cache: "no-store", // Fetch fresh data on every request
    })

    // Check if response was successful
    if (!res.ok) {
      console.error(`Failed to fetch properties. Status: ${res.status}`)
      return []
    }

    // Parse JSON response
    const result = await res.json()

    // If backend wraps response in { success: true, data: [...] }
    if (result && result.data && Array.isArray(result.data)) {
      return result.data
    }

    // If backend returns array directly [...]
    if (Array.isArray(result)) {
      return result
    }

    // Fallback empty array if data structure is unexpected
    return []
  } catch (error) {
    console.error("Error fetching properties in server action:", error)
    return []
  }
}

/**
 * Server Action: Fetch a single property by its ID from backend API
 * Endpoint: GET http://localhost:5000/api/properties/:id
 */
export const getProperty = async (id: string) => {
  try {
    // Return early if no ID is provided
    if (!id) {
      return null
    }

    // Read the user's cookies from the server
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    // Prepare HTTP headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    // If an access token exists, include it in headers
    if (accessToken) {
      headers["Cookie"] = `accessToken=${accessToken}`
    }

    // Perform HTTP GET request for single property
    const res = await fetch(`${API_URL}/api/properties/${id}`, {
      headers,
      cache: "no-store", // Fetch fresh data on every request
    })

    // Check if response was successful
    if (!res.ok) {
      console.error(`Failed to fetch property ${id}. Status: ${res.status}`)
      return null
    }

    // Parse JSON response
    const result = await res.json()

    // If backend wraps response in { success: true, data: {...} }
    if (result && result.data) {
      return result.data
    }

    // Return result object directly if not wrapped
    return result || null
  } catch (error) {
    console.error(`Error fetching property ${id} in server action:`, error)
    return null
  }
}