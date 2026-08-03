import axios from "axios";
import { Category, CategoriesApiResponse } from "@/types/category";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://rentnest-backend-ezd1.onrender.com";

export const categoryApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const categoryService = {
  /**
   * Fetches all rental categories from the backend API.
   * Endpoint: GET /api/categories
   */
  getCategories: async (): Promise<Category[]> => {
    const response = await categoryApiClient.get<CategoriesApiResponse>("/api/categories");
    
    // Robustly extract categories list from standard or raw API response payloads
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    return response.data?.data || [];
  },
};
