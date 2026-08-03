import axios from "axios";
import { CityData, CitiesApiResponse } from "@/types/city";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
    const response = await cityApiClient.get<CitiesApiResponse>("/api/cities");

    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data?.data || [];
  },
};
