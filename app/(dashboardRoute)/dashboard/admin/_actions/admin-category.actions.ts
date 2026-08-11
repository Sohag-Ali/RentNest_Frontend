"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { Category, CategoryActionResult } from "@/types/category"

const API_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000"

/**
 * Server Action: Fetch all categories for Admin Category Management
 * Endpoint: GET /api/categories
 */
export async function getAdminCategories(): Promise<CategoryActionResult<Category[]>> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`
      headers["Cookie"] = `accessToken=${accessToken}`
    }

    const res = await fetch(`${API_URL}/api/categories`, {
      method: "GET",
      headers,
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`Failed to fetch admin categories. Status: ${res.status}`)
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to load categories.",
        data: [],
      }
    }

    const result = await res.json()

    // Handle flexible backend response envelope format
    const categoryList: Category[] = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
      ? result
      : result?.data?.data && Array.isArray(result.data.data)
      ? result.data.data
      : []

    return {
      success: result.success ?? true,
      statusCode: result.statusCode ?? 200,
      message: result.message || "Categories fetched successfully.",
      data: categoryList,
    }
  } catch (error: any) {
    console.error("Error in getAdminCategories server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Failed to load categories.",
      data: [],
    }
  }
}

/**
 * Server Action: Create a new category (Admin Protected)
 * Endpoint: POST /api/categories
 * Body: { "name": "Apartment" }
 */
export async function createAdminCategory(name: string): Promise<CategoryActionResult<Category | null>> {
  try {
    const trimmedName = name ? name.trim() : ""

    if (!trimmedName) {
      return {
        success: false,
        statusCode: 400,
        message: "Category name is required.",
        data: null,
      }
    }

    if (trimmedName.length > 100) {
      return {
        success: false,
        statusCode: 400,
        message: "Category name cannot exceed 100 characters.",
        data: null,
      }
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Admin authentication required. Please log in again.",
        data: null,
      }
    }

    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ name: trimmedName }),
      cache: "no-store",
    })

    const result = await res.json()

    if (!res.ok || result.success === false) {
      // Extract detailed backend error message if available
      const errorMsg =
        result.message ||
        (Array.isArray(result.errorSources) && result.errorSources[0]?.message) ||
        (Array.isArray(result.errors) && result.errors[0]?.message) ||
        "Failed to create category."

      return {
        success: false,
        statusCode: res.status || result.statusCode || 400,
        message: errorMsg,
        data: null,
      }
    }

    // Revalidate categories page cache
    revalidatePath("/dashboard/admin/categories")

    const createdCategory: Category = result.data || {
      id: result.id || result.data?.id || "",
      name: trimmedName,
      propertiesCount: 0,
    }

    return {
      success: true,
      statusCode: result.statusCode || 201,
      message: result.message || "Category created successfully.",
      data: createdCategory,
    }
  } catch (error: any) {
    console.error("Error in createAdminCategory server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "An unexpected error occurred while creating category.",
      data: null,
    }
  }
}
