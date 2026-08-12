"use server"

import { cookies } from "next/headers"

const API_URL = process.env.BACKEND_API_URL || "https://rentnest-backend-ezd1.onrender.com"

export interface AdminPropertyLandlord {
  id: string
  name: string
  email?: string
}

export interface AdminPropertyCategory {
  id: string
  name: string
}

export interface AdminProperty {
  id: string
  title: string
  description?: string
  location: string
  price: number
  amenities?: string[]
  isAvailable: boolean
  createdAt: string
  landlord?: AdminPropertyLandlord
  category?: AdminPropertyCategory
  images?: string[]
}

export interface AdminPropertyMeta {
  page?: number
  limit?: number
  total?: number
  totalPages?: number
}

/**
 * Server Action: Fetch all properties for Admin Property Management
 * Endpoint: GET /api/admin/properties
 */
export async function getAllAdminProperties() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Admin authentication required.",
        data: [] as AdminProperty[],
        meta: null as AdminPropertyMeta | null,
      }
    }

    const res = await fetch(`${API_URL}/api/admin/properties`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`Failed to fetch admin properties. Status: ${res.status}`)
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to fetch property list.",
        data: [] as AdminProperty[],
        meta: null as AdminPropertyMeta | null,
      }
    }

    const result = await res.json()
    const propertyList: AdminProperty[] = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : []

    const metaData: AdminPropertyMeta | null = result.meta || null

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "Properties successfully fetched",
      data: propertyList,
      meta: metaData,
    }
  } catch (error: any) {
    console.error("Error in getAllAdminProperties server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Error fetching admin properties.",
      data: [] as AdminProperty[],
      meta: null as AdminPropertyMeta | null,
    }
  }
}
