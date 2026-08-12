"use server"

import { cookies } from "next/headers"

const API_URL = process.env.BACKEND_API_URL || "https://rentnest-backend-ezd1.onrender.com"

export interface AdminRentalTenant {
  id: string
  name: string
  email: string
  role?: string
  status?: string
}

export interface AdminRentalProperty {
  id: string
  title: string
  location: string
  price: number
  isAvailable?: boolean
}

export interface AdminRentalLandlord {
  id: string
  name: string
}

export interface AdminRentalCategory {
  id: string
  name: string
}

export interface AdminRentalPayment {
  id: string
  transactionId?: string
  amount: number
  provider?: string
  status?: string
  paidAt?: string
}

export interface AdminRental {
  id: string
  status: "PENDING" | "APPROVED" | "COMPLETED" | "REJECTED" | string
  moveInDate?: string
  createdAt: string
  tenant?: AdminRentalTenant
  property?: AdminRentalProperty
  landlord?: AdminRentalLandlord
  category?: AdminRentalCategory
  payment?: AdminRentalPayment | null
}

export interface AdminRentalMeta {
  page?: number
  limit?: number
  total?: number
  totalPages?: number
}

/**
 * Server Action: Fetch all rental requests for Admin Rental Management
 * Endpoint: GET /api/admin/rentals
 */
export async function getAllAdminRentals() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Admin authentication required.",
        data: [] as AdminRental[],
        meta: null as AdminRentalMeta | null,
      }
    }

    const res = await fetch(`${API_URL}/api/admin/rentals`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`Failed to fetch admin rentals. Status: ${res.status}`)
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to fetch rental list.",
        data: [] as AdminRental[],
        meta: null as AdminRentalMeta | null,
      }
    }

    const result = await res.json()
    const rentalList: AdminRental[] = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : []

    const metaData: AdminRentalMeta | null = result.meta || null

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "Rentals successfully fetched",
      data: rentalList,
      meta: metaData,
    }
  } catch (error: any) {
    console.error("Error in getAllAdminRentals server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Error fetching admin rentals.",
      data: [] as AdminRental[],
      meta: null as AdminRentalMeta | null,
    }
  }
}
