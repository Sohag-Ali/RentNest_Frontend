"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

const API_URL = process.env.BACKEND_API_URL || "https://rentnest-backend-ezd1.onrender.com"

export interface AdminUserMeta {
  page?: number
  limit?: number
  total?: number
  totalPages?: number
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: "ADMIN" | "LANDLORD" | "TENANT" | string
  status: "ACTIVE" | "INACTIVE" | "BANNED" | string
  createdAt: string
  updatedAt?: string
  meta?: AdminUserMeta
}

/**
 * Server Action: Fetch user accounts list and pagination metadata
 * Endpoint: GET /api/admin/users
 */
export async function getAdminUsers() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Admin authentication required.",
        data: [] as AdminUser[],
        meta: null as AdminUserMeta | null,
      }
    }

    const res = await fetch(`${API_URL}/api/admin/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`Failed to fetch admin users. Status: ${res.status}`)
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to fetch user list.",
        data: [] as AdminUser[],
        meta: null as AdminUserMeta | null,
      }
    }

    const result = await res.json()
    const userList: AdminUser[] = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : []

    const metaData: AdminUserMeta | null = result.meta || null

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "Users successfully fetched",
      data: userList,
      meta: metaData,
    }
  } catch (error: any) {
    console.error("Error in getAdminUsers server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Error fetching admin users.",
      data: [] as AdminUser[],
      meta: null as AdminUserMeta | null,
    }
  }
}

/**
 * Server Action: Update user status
 * Endpoint: PATCH /api/admin/users/:id
 * Body: { status: "ACTIVE" | "INACTIVE" | "BANNED" }
 */
export async function updateUserStatus(userId: string, newStatus: string) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Unauthorized request.",
      }
    }

    // Call PATCH /api/admin/users/:id with body { status: newStatus }
    const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
      cache: "no-store",
    })

    const result = await res.json()

    if (!res.ok || result.success === false) {
      const errorMsg =
        result.message ||
        (Array.isArray(result.errorSources) && result.errorSources[0]?.message) ||
        (Array.isArray(result.errors) && result.errors[0]?.message) ||
        "Failed to update user status."

      return {
        success: false,
        statusCode: res.status,
        message: errorMsg,
      }
    }

    // Revalidate server cache for admin users page
    revalidatePath("/dashboard/admin/users")

    return {
      success: true,
      statusCode: result.statusCode || 200,
      message: result.message || `User status updated to ${newStatus}`,
      data: result.data || null,
    }
  } catch (error: any) {
    console.error("Error in updateUserStatus server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "An unexpected error occurred while updating status.",
    }
  }
}

/**
 * Server Action: Fetch specific user profile details
 * Endpoint: GET /api/admin/users/:id
 */
export async function getAdminUserById(userId: string) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Unauthorized request.",
        data: null,
      }
    }

    const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: "User not found.",
        data: null,
      }
    }

    const result = await res.json()
    const userData: AdminUser | null = result.data || result || null

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "User details fetched",
      data: userData,
    }
  } catch (error: any) {
    console.error("Error in getAdminUserById server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Error fetching user details.",
      data: null,
    }
  }
}
