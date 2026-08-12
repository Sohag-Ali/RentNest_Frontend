"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

const API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://rentnest-backend-ezd1.onrender.com"

export interface WishlistItem {
  id: string
  tenantId?: string
  propertyId: string
  createdAt?: string
  property?: {
    id: string
    _id?: string
    title: string
    description?: string
    location: string
    city?: string
    state?: string
    price: number
    rating?: number
    averageRating?: number
    reviewCount?: number
    reviewsCount?: number
    bedrooms?: number
    bathrooms?: number
    areaSqFt?: number
    isAvailable?: boolean
    isFeatured?: boolean
    mainImage?: string
    images?: string[]
    landlord?: {
      id?: string
      name?: string
      email?: string
      image?: string
    }
    category?: {
      id?: string
      name?: string
    } | string
  }
}

/**
 * Server Action: Get tenant's saved properties in wishlist
 * Target Endpoint: GET https://rentnest-backend-ezd1.onrender.com/api/wishlist
 */
export const getWishlistAction = async () => {
  try {
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

    const res = await fetch(`${API_URL}/api/wishlist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`Failed to fetch wishlist. Status: ${res.status}`)
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to fetch wishlist properties.",
        data: [],
      }
    }

    const result = await res.json()

    // Handle various response wrappers
    const items: WishlistItem[] = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : result?.data?.wishlist || []

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "Wishlist properties fetched successfully.",
      data: items,
    }
  } catch (error: any) {
    console.error("Error in getWishlistAction:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Error fetching wishlist.",
      data: [],
    }
  }
}

/**
 * Server Action: Check if a property is saved in tenant's wishlist
 * Target Endpoint: GET https://rentnest-backend-ezd1.onrender.com/api/wishlist/check/:propertyId
 */
export const checkWishlistAction = async (propertyId: string) => {
  try {
    if (!propertyId) {
      return { success: false, isWishlisted: false }
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return { success: false, isWishlisted: false }
    }

    const res = await fetch(`${API_URL}/api/wishlist/check/${propertyId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return { success: false, isWishlisted: false }
    }

    const result = await res.json()

    // Extract isWishlisted boolean safely
    const isWishlisted = Boolean(
      result.isWishlisted ??
      result.data?.isWishlisted ??
      result.data ??
      result.saved ??
      false
    )

    return {
      success: result.success ?? true,
      isWishlisted,
    }
  } catch (error: any) {
    console.error("Error in checkWishlistAction:", error)
    return { success: false, isWishlisted: false }
  }
}

/**
 * Server Action: Save a property to tenant wishlist
 * Target Endpoint: POST https://rentnest-backend-ezd1.onrender.com/api/wishlist
 */
export const addToWishlistAction = async (propertyId: string) => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Please log in as a tenant to save properties to your wishlist.",
      }
    }

    const res = await fetch(`${API_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ propertyId }),
      cache: "no-store",
    })

    const result = await res.json()

    if (result.success ?? res.ok) {
      revalidatePath("/dashboard/tenant")
      revalidatePath("/dashboard/tenant/wishlist")
    }

    return {
      success: result.success ?? res.ok,
      statusCode: result.statusCode ?? res.status,
      message: result.message || (res.ok ? "Property added to wishlist" : "Failed to add to wishlist"),
      data: result.data || null,
    }
  } catch (error: any) {
    console.error("Error in addToWishlistAction:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Internal server error.",
    }
  }
}

/**
 * Server Action: Remove a property from tenant wishlist
 * Target Endpoint: DELETE https://rentnest-backend-ezd1.onrender.com/api/wishlist/:propertyId
 */
export const removeFromWishlistAction = async (propertyId: string) => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Please log in to manage your wishlist.",
      }
    }

    const res = await fetch(`${API_URL}/api/wishlist/${propertyId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    const result = await res.json()

    if (result.success ?? res.ok) {
      revalidatePath("/dashboard/tenant")
      revalidatePath("/dashboard/tenant/wishlist")
    }

    return {
      success: result.success ?? res.ok,
      statusCode: result.statusCode ?? res.status,
      message: result.message || (res.ok ? "Property removed from wishlist" : "Failed to remove from wishlist"),
      data: result.data || null,
    }
  } catch (error: any) {
    console.error("Error in removeFromWishlistAction:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Internal server error.",
    }
  }
}

/**
 * Server Action: Toggle property in tenant wishlist (add if not saved, remove if saved)
 * Target Endpoint: POST https://rentnest-backend-ezd1.onrender.com/api/wishlist/toggle
 */
export const toggleWishlistAction = async (propertyId: string) => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Please log in to add or remove properties from your wishlist.",
        isWishlisted: false,
      }
    }

    const res = await fetch(`${API_URL}/api/wishlist/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ propertyId }),
      cache: "no-store",
    })

    const result = await res.json()

    // Determine wishlist boolean state returned by backend
    const isWishlisted = Boolean(
      result.isWishlisted ??
      result.data?.isWishlisted ??
      (result.message?.toLowerCase().includes("added") || result.message?.toLowerCase().includes("saved"))
    )

    if (result.success ?? res.ok) {
      revalidatePath("/dashboard/tenant")
      revalidatePath("/dashboard/tenant/wishlist")
    }

    return {
      success: result.success ?? res.ok,
      statusCode: result.statusCode ?? res.status,
      message: result.message || (isWishlisted ? "Property added to wishlist" : "Property removed from wishlist"),
      isWishlisted,
      data: result.data || null,
    }
  } catch (error: any) {
    console.error("Error in toggleWishlistAction:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Internal server error.",
      isWishlisted: false,
    }
  }
}
