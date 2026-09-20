"use server"

import { cookies } from "next/headers"
import { AdminAnalyticsResponse, AnalyticsPeriod } from "@/types/analytics"

const API_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000"

/**
 * Server Action: Fetch Admin Analytics Data
 * Endpoint: GET /api/admin/analytics?period={period}
 * Protected for ADMIN users
 */
export async function getAdminAnalytics(
  period: AnalyticsPeriod = "30d"
): Promise<AdminAnalyticsResponse> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Admin authentication required. Please log in again.",
        data: {
          overview: {
            totalProperties: 0,
            totalTenants: 0,
            totalLandlords: 0,
            totalRentalRequests: 0,
            totalRevenue: 0,
            totalWishlists: 0,
          },
          revenueOverview: [],
          rentalRequests: [],
          propertiesByCategory: [],
          propertiesByCity: [],
          userGrowth: [],
          availability: { available: 0, unavailable: 0 },
          recentRentals: [],
          topProperties: [],
        },
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Cookie: `accessToken=${accessToken}`,
    }

    const res = await fetch(`${API_URL}/api/admin/analytics?period=${period}`, {
      method: "GET",
      headers,
      cache: "no-store",
    })

    const result = await res.json()

    if (!res.ok || result.success === false) {
      let errorMessage = "Something went wrong while fetching analytics data."
      if (res.status === 401) {
        errorMessage = "Your session has expired. Please log in again."
      } else if (res.status === 403) {
        errorMessage = "You do not have permission to view admin analytics."
      } else if (result?.message) {
        errorMessage = result.message
      }

      return {
        success: false,
        statusCode: res.status || result.statusCode || 500,
        message: errorMessage,
        data: {
          overview: {
            totalProperties: 0,
            totalTenants: 0,
            totalLandlords: 0,
            totalRentalRequests: 0,
            totalRevenue: 0,
            totalWishlists: 0,
          },
          revenueOverview: [],
          rentalRequests: [],
          propertiesByCategory: [],
          propertiesByCity: [],
          userGrowth: [],
          availability: { available: 0, unavailable: 0 },
          recentRentals: [],
          topProperties: [],
        },
      }
    }

    return {
      success: true,
      statusCode: result.statusCode || 200,
      message: result.message || "Analytics data fetched successfully.",
      data: {
        overview: result.data?.overview || {
          totalProperties: 0,
          totalTenants: 0,
          totalLandlords: 0,
          totalRentalRequests: 0,
          totalRevenue: 0,
          totalWishlists: 0,
        },
        revenueOverview: Array.isArray(result.data?.revenueOverview)
          ? result.data.revenueOverview
          : [],
        rentalRequests: Array.isArray(result.data?.rentalRequests)
          ? result.data.rentalRequests
          : [],
        propertiesByCategory: Array.isArray(result.data?.propertiesByCategory)
          ? result.data.propertiesByCategory
          : [],
        propertiesByCity: Array.isArray(result.data?.propertiesByCity)
          ? result.data.propertiesByCity
          : [],
        userGrowth: Array.isArray(result.data?.userGrowth)
          ? result.data.userGrowth
          : [],
        availability: result.data?.availability || {
          available: 0,
          unavailable: 0,
        },
        recentRentals: Array.isArray(result.data?.recentRentals)
          ? result.data.recentRentals
          : [],
        topProperties: Array.isArray(result.data?.topProperties)
          ? result.data.topProperties
          : [],
      },
    }
  } catch (error: any) {
    console.error("Error in getAdminAnalytics server action:", error)
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Unable to load analytics. Please try again.",
      data: {
        overview: {
          totalProperties: 0,
          totalTenants: 0,
          totalLandlords: 0,
          totalRentalRequests: 0,
          totalRevenue: 0,
          totalWishlists: 0,
        },
        revenueOverview: [],
        rentalRequests: [],
        propertiesByCategory: [],
        propertiesByCity: [],
        userGrowth: [],
        availability: { available: 0, unavailable: 0 },
        recentRentals: [],
        topProperties: [],
      },
    }
  }
}
