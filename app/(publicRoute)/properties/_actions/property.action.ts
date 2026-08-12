"use server"

import { cookies } from "next/headers"

// Define the base backend API URL from environment variables or fallback to localhost
const API_URL = process.env.BACKEND_API_URL || "https://rentnest-backend-ezd1.onrender.com"

/**
 * Server Action: Fetch all properties from the backend API
 * Endpoint: GET https://rentnest-backend-ezd1.onrender.com/api/properties
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

    // If an access token exists, include it in headers for authentication
    if (accessToken) {
      headers["Cookie"] = `accessToken=${accessToken}`
    }

    let allProperties: any[] = []
    let page = 1
    let total = 0

    // Fetch all pages of properties from backend
    do {
      const res = await fetch(`${API_URL}/api/properties?page=${page}`, {
        headers,
        cache: "no-store", // Fetch fresh data on every request
      })

      if (!res.ok) {
        console.error(`Failed to fetch properties page ${page}. Status: ${res.status}`)
        break
      }

      const result = await res.json()
      const data =
        result && result.data && Array.isArray(result.data)
          ? result.data
          : Array.isArray(result)
            ? result
            : []

      if (data.length === 0) {
        break
      }

      allProperties.push(...data)
      total = result?.meta?.total || allProperties.length
      page++
    } while (allProperties.length < total && page <= 50)

    return allProperties
  } catch (error) {
    console.error("Error fetching properties in server action:", error)
    return []
  }
}

/**
 * Server Action: Fetch a single property by its ID from backend API
 * Endpoint: GET https://rentnest-backend-ezd1.onrender.com/api/properties/:id
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