export type NotificationType =
  | 'RENTAL_REQUEST'
  | 'RENTAL_APPROVED'
  | 'RENTAL_REJECTED'
  | 'RENTAL_CANCELLED'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'NEW_REVIEW'
  | 'NEW_PROPERTY'
  | 'PROPERTY_UPDATED'
  | 'SYSTEM';

export interface NotificationItem {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  entityId?: string | null;
  entityType?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface NotificationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: NotificationItem[];
  meta: NotificationMeta;
}

export interface UnreadCountResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    count: number;
  };
}

export interface NotificationQueryParams {
  page?: number;
  limit?: number;
  isRead?: boolean | string;
  type?: NotificationType;
}
