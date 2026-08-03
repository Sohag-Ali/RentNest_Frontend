import axios from "axios";
import { LandlordBookingsResponse, LandlordBookingsParams } from "@/types/booking";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const bookingApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically attach authorization token
bookingApiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };
    const token =
      getCookie("accessToken") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const bookingService = {
  /**
   * Fetches landlord rented properties & bookings summary from backend.
   * GET https://rentnest-backend-ezd1.onrender.com/api/landlord/rented-properties
   */
  getLandlordBookings: async (params?: LandlordBookingsParams): Promise<LandlordBookingsResponse> => {
    // Build clean query params object with non-empty values
    const cleanParams: Record<string, any> = {};

    if (params) {
      if (typeof params.page === "number" && params.page > 1) {
        cleanParams.page = params.page;
      }
      if (typeof params.limit === "number" && params.limit !== 10) {
        cleanParams.limit = params.limit;
      }
      if (params.searchTerm && params.searchTerm.trim() !== "") {
        cleanParams.searchTerm = params.searchTerm.trim();
        cleanParams.search = params.searchTerm.trim(); // Also include search alias if backend expects search
      }
      if (params.category && params.category.trim() !== "" && params.category !== "ALL") {
        cleanParams.category = params.category.trim();
      }
      if (params.city && params.city.trim() !== "" && params.city !== "ALL") {
        cleanParams.city = params.city.trim();
      }
      if (params.paymentStatus && params.paymentStatus.trim() !== "" && params.paymentStatus !== "ALL") {
        cleanParams.paymentStatus = params.paymentStatus.trim();
        cleanParams.status = params.paymentStatus.trim();
      }
      if (params.startDate) {
        cleanParams.startDate = params.startDate;
      }
      if (params.endDate) {
        cleanParams.endDate = params.endDate;
      }
    }

    const hasQueryParams = Object.keys(cleanParams).length > 0;

    try {
      // Primary request with query parameters (if any)
      const response = await bookingApiClient.get<LandlordBookingsResponse>(
        "/api/landlord/rented-properties",
        hasQueryParams ? { params: cleanParams } : {}
      );
      return response.data;
    } catch (error: any) {
      // If HTTP 400 occurs when query parameters are sent, fallback to plain endpoint call without query params
      if (axios.isAxiosError(error) && error.response?.status === 400 && hasQueryParams) {
        console.warn("Backend returned 400 for query params. Retrying without query parameters...");
        const fallbackResponse = await bookingApiClient.get<LandlordBookingsResponse>(
          "/api/landlord/rented-properties"
        );
        return fallbackResponse.data;
      }

      // If plain call or other error, throw
      throw error;
    }
  },
};
