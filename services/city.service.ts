import axios from "axios";
import { CityData, CitiesApiResponse } from "@/types/city";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "https://rentnest-backend-ezd1.onrender.com";

export const cityApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const cityService = {
  /**
   * Fetches cities list dynamically from backend API.
   * Endpoint: GET /api/cities
   */
  getCities: async (): Promise<CityData[]> => {
    try {
      const response = await cityApiClient.get<CitiesApiResponse>("/api/cities");

      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }

      if (Array.isArray(response.data)) {
        return response.data;
      }

      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
    } catch (error) {
      console.warn("Direct API call to cities failed, attempting relative proxy endpoint...", error);
      try {
        const res = await fetch("/api/cities", {
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.data)) {
            return data.data;
          }
          if (Array.isArray(data)) {
            return data;
          }
          if (data?.data && Array.isArray(data.data)) {
            return data.data;
          }
        }
      } catch (proxyError) {
        console.error("Proxy fetch for cities also failed:", proxyError);
      }
    }

    return [];
  },
};

