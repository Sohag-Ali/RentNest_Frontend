import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export const wishlistApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

wishlistApiClient.interceptors.request.use((config) => {
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

export const wishlistService = {
  // GET /api/wishlist
  getWishlist: async () => {
    const response = await wishlistApiClient.get("/api/wishlist");
    return response.data;
  },

  // POST /api/wishlist
  addToWishlist: async (propertyId: string) => {
    const response = await wishlistApiClient.post("/api/wishlist", { propertyId });
    return response.data;
  },

  // DELETE /api/wishlist/:propertyId
  removeFromWishlist: async (propertyId: string) => {
    const response = await wishlistApiClient.delete(`/api/wishlist/${propertyId}`);
    return response.data;
  },

  // POST /api/wishlist/toggle
  toggleWishlist: async (propertyId: string) => {
    const response = await wishlistApiClient.post("/api/wishlist/toggle", { propertyId });
    return response.data;
  },

  // GET /api/wishlist/check/:propertyId
  checkWishlist: async (propertyId: string) => {
    const response = await wishlistApiClient.get(`/api/wishlist/check/${propertyId}`);
    return response.data;
  },
};
