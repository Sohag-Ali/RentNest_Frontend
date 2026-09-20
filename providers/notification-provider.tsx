'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  NotificationItem,
  NotificationMeta,
  NotificationQueryParams,
} from '@/types/notification.type';
import { notificationService } from '@/services/notification.service';
import { getCurrentUser } from '@/service/getCurrentUser';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  'http://localhost:5000';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  meta: NotificationMeta | null;
  fetchNotifications: (params?: NotificationQueryParams) => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  handleNotificationClick: (item: NotificationItem) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const getCookieToken = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; accessToken=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<NotificationMeta | null>(null);
  const [userRole, setUserRole] = useState<string>('tenant');
  const router = useRouter();

  // Fetch initial unread count & user context
  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await notificationService.getUnreadCount();
      if (res?.success && res?.data) {
        setUnreadCount(res.data.count || 0);
      }
    } catch (err: any) {
      // Silent error for unread count if unauthenticated
    }
  }, []);

  const fetchNotifications = useCallback(async (params?: NotificationQueryParams) => {
    setLoading(true);
    setError(null);
    try {
      const res = await notificationService.getNotifications(params);
      if (res?.success) {
        setNotifications(res.data || []);
        if (res.meta) setMeta(res.meta);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync user info for routing logic
  useEffect(() => {
    getCurrentUser().then((res) => {
      if (res?.success && res?.data?.role) {
        setUserRole(res.data.role.toLowerCase());
      }
    });
  }, []);

  // Fetch notifications and unread count on mount
  useEffect(() => {
    fetchUnreadCount();
    fetchNotifications({ page: 1, limit: 10 });
  }, [fetchUnreadCount, fetchNotifications]);

  // Real-time Socket.IO Connection
  useEffect(() => {
    const token = getCookieToken();

    const socket: Socket = io(API_BASE_URL, {
      auth: token ? { token } : undefined,
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('[Socket.IO Notification Client] Connected to server');
    });

    socket.on('notification:new', (newNotif: NotificationItem) => {
      console.log('[Socket.IO] New real-time notification:', newNotif);

      setNotifications((prev) => {
        if (prev.some((item) => item.id === newNotif.id)) return prev;
        return [newNotif, ...prev];
      });

      setUnreadCount((prev) => prev + 1);

      toast.info(newNotif.title || 'New Notification', {
        description: newNotif.message,
        duration: 5000,
      });
    });

    socket.on('disconnect', () => {
      console.log('[Socket.IO Notification Client] Disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAsRead = async (id: string) => {
    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      await notificationService.markAsRead(id);
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    // Optimistic UI update
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    setUnreadCount(0);

    try {
      await notificationService.markAllAsRead();
      toast.success('All notifications marked as read! ✨');
    } catch (err: any) {
      toast.error('Failed to mark all as read');
    }
  };

  const deleteNotification = async (id: string) => {
    const target = notifications.find((n) => n.id === id);
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    if (target && !target.isRead) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }

    try {
      await notificationService.deleteNotification(id);
      toast.success('Notification deleted');
    } catch (err: any) {
      toast.error('Failed to delete notification');
    }
  };

  const handleNotificationClick = async (item: NotificationItem) => {
    if (!item.isRead) {
      await markAsRead(item.id);
    }

    let destination = '/notifications';

    switch (item.type) {
      case 'RENTAL_REQUEST':
      case 'RENTAL_APPROVED':
      case 'RENTAL_REJECTED':
      case 'RENTAL_CANCELLED':
        if (userRole === 'landlord') {
          destination = '/dashboard/landlord/requests';
        } else if (userRole === 'admin') {
          destination = '/dashboard/admin/rentals';
        } else {
          destination = '/dashboard/tenant/requests';
        }
        break;

      case 'PAYMENT_SUCCESS':
      case 'PAYMENT_FAILED':
        if (userRole === 'landlord') {
          destination = '/dashboard/landlord/payments';
        } else if (userRole === 'admin') {
          destination = '/dashboard/admin/payments';
        } else {
          destination = '/dashboard/tenant/payments';
        }
        break;

      case 'NEW_REVIEW':
        if (userRole === 'landlord') {
          destination = '/dashboard/landlord/reviews';
        } else if (userRole === 'tenant') {
          destination = '/dashboard/tenant/reviews';
        } else if (item.entityId && item.entityType === 'PROPERTY') {
          destination = `/properties/${item.entityId}`;
        }
        break;

      case 'NEW_PROPERTY':
      case 'PROPERTY_UPDATED':
        if (item.entityId) {
          destination = `/properties/${item.entityId}`;
        } else {
          destination = '/properties';
        }
        break;

      default:
        destination = '/notifications';
    }

    router.push(destination);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        meta,
        fetchNotifications,
        fetchUnreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        handleNotificationClick,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
