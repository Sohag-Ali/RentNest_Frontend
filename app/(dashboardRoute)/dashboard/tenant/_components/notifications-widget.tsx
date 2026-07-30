'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { NotificationItem } from './notification-item';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  title: string;
  message: string;
  timestamp: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Booking Confirmed',
    message: 'Your booking for Modern Apartment Downtown is confirmed for Dec 15-22.',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'info',
    title: 'New Message',
    message: 'You have a new message from the property owner.',
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Payment Due Soon',
    message: 'Your payment for the Mountain Villa is due in 3 days.',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    type: 'alert',
    title: 'Price Drop Alert',
    message: 'The Beach House in your wishlist dropped $50 for your dates.',
    timestamp: '2 days ago',
  },
];

export function NotificationsWidget() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Notifications
        </h2>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </div>
      <div className="space-y-2">
        {notifications.slice(0, 4).map((notification) => (
          <NotificationItem
            key={notification.id}
            {...notification}
            onDismiss={() => handleDismiss(notification.id)}
          />
        ))}
      </div>
    </Card>
  );
}
