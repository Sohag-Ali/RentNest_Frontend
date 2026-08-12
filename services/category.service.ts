import axios from "axios";
import { Category, CategoriesApiResponse } from "@/types/category";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "https://rentnest-backend-ezd1.onrender.com";

export const categoryApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const DEFAULT_FALLBACK_CATEGORIES: Category[] = [
  { id: "apartment", name: "Apartment", propertiesCount: 0 },
  { id: "flat", name: "Flat", propertiesCount: 0 },
  { id: "family-house", name: "Family House", propertiesCount: 0 },
  { id: "studio-apartment", name: "Studio Apartment", propertiesCount: 0 },
  { id: "bachelor-mess", name: "Bachelor Mess", propertiesCount: 0 },
  { id: "sublet", name: "Sublet", propertiesCount: 0 },
  { id: "duplex", name: "Duplex", propertiesCount: 0 },
  { id: "villa", name: "Villa", propertiesCount: 0 },
  { id: "penthouse", name: "Penthouse", propertiesCount: 0 },
  { id: "office-space", name: "Office Space", propertiesCount: 0 },
  { id: "shop-showroom", name: "Shop / Showroom", propertiesCount: 0 },
  { id: "warehouse", name: "Warehouse", propertiesCount: 0 },
];

export const categoryService = {
  /**
   * Fetches all rental categories from the backend API.
   * Endpoint: GET /api/categories
   */
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await categoryApiClient.get<CategoriesApiResponse>("/api/categories");

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
      console.warn("Direct API call to backend categories failed, attempting relative proxy endpoint...", error);

      try {
        const res = await fetch("/api/categories", {
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
        console.error("Proxy fetch for categories also failed:", proxyError);
      }
    }

    // Default fallback if server is unreachable or CORS blocked
    return DEFAULT_FALLBACK_CATEGORIES;
  },
};

