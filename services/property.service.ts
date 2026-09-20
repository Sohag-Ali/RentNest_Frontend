import axios from "axios";
import { CreatePropertyInput, PropertyResponse, Property } from "@/types/property";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export const propertyApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically attach authorization token
propertyApiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };
    const token = getCookie("accessToken") || localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const propertyService = {
  createProperty: async (payload: CreatePropertyInput): Promise<PropertyResponse> => {
    const response = await propertyApiClient.post<PropertyResponse>(
      "/api/landlord/properties",
      payload
    );
    return response.data;
  },

  updateProperty: async (id: string, payload: CreatePropertyInput): Promise<PropertyResponse> => {
    try {
      const response = await propertyApiClient.put<PropertyResponse>(
        `/api/landlord/properties/${id}`,
        payload
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 405) {
        const patchRes = await propertyApiClient.patch<PropertyResponse>(
          `/api/landlord/properties/${id}`,
          payload
        );
        return patchRes.data;
      }
      throw error;
    }
  },

  getPropertyById: async (id: string): Promise<PropertyResponse> => {
    const response = await propertyApiClient.get<PropertyResponse>(
      `/api/properties/${id}`
    );
    return response.data;
  },

  getFeaturedProperties: async (): Promise<Property[]> => {
    try {
      const response = await propertyApiClient.get("/api/properties/featured");
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
      console.warn("Direct API call to featured properties failed, attempting relative proxy endpoint...", error);
      try {
        const res = await fetch("/api/properties/featured", {
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
        console.error("Proxy fetch for featured properties also failed:", proxyError);
      }
    }
    return [];
  },
};

