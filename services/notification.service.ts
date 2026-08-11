import axios from "axios";
import {
  NotificationQueryParams,
  NotificationResponse,
  UnreadCountResponse,
  NotificationItem,
} from "@/types/notification.type";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export const notificationApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

notificationApiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const notificationService = {
  // GET /api/notifications
  getNotifications: async (params?: NotificationQueryParams): Promise<NotificationResponse> => {
    const response = await notificationApiClient.get("/api/notifications", {
      params,
    });
    return response.data;
  },

  // GET /api/notifications/unread-count
  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const response = await notificationApiClient.get("/api/notifications/unread-count");
    return response.data;
  },

  // PATCH /api/notifications/:id/read
  markAsRead: async (id: string): Promise<{ success: boolean; data: NotificationItem }> => {
    const response = await notificationApiClient.patch(`/api/notifications/${id}/read`);
    return response.data;
  },

  // PATCH /api/notifications/read-all
  markAllAsRead: async (): Promise<{ success: boolean; data: { count: number } }> => {
    const response = await notificationApiClient.patch("/api/notifications/read-all");
    return response.data;
  },

  // DELETE /api/notifications/:id
  deleteNotification: async (id: string): Promise<{ success: boolean; data: NotificationItem }> => {
    const response = await notificationApiClient.delete(`/api/notifications/${id}`);
    return response.data;
  },
};
