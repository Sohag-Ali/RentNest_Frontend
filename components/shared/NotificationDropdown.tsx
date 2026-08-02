'use client';

import { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Building2,
  CreditCard,
  MessageSquare,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'payment' | 'system' | 'message';
}

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Rental Request Approved 🎉',
    message: 'Your booking request for Modern Gulshan Apartment was accepted by the landlord.',
    time: '10m ago',
    read: false,
    type: 'booking',
  },
  {
    id: '2',
    title: 'Payment Received 💳',
    message: 'Rent payment of ৳25,000 for August 2026 was successfully processed.',
    time: '2h ago',
    read: false,
    type: 'payment',
  },
  {
    id: '3',
    title: 'New Listing Alert 🏠',
    message: 'A luxury 3-bedroom apartment in Banani matching your wishlist was published.',
    time: '1d ago',
    read: false,
    type: 'system',
  },
  {
    id: '4',
    title: 'New Landlord Message 💬',
    message: 'Host Sohag Ali replied: "Keys will be ready for handover tomorrow morning."',
    time: '2d ago',
    read: true,
    type: 'message',
  },
];

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    toast.success('All notifications marked as read! ✨');
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'booking':
        return <Building2 className="h-4 w-4 text-emerald-500" />;
      case 'payment':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative flex items-center justify-center h-9 w-9 rounded-full cursor-pointer hover:bg-muted transition-colors outline-none text-foreground">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 sm:w-96 p-2 rounded-3xl shadow-xl border-border/80 bg-card">
        {/* Header */}
        <DropdownMenuLabel className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-foreground font-heading">Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-2 py-0.5 text-xs font-semibold">
                {unreadCount} New
              </Badge>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:underline flex items-center gap-1 font-medium transition-colors"
            >
              <CheckCheck className="h-3.5 w-3.5" /> Mark all read
            </button>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto space-y-1 py-1 pr-1">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => toggleRead(item.id)}
                className={`p-3 rounded-2xl cursor-pointer transition-all flex items-start gap-3 ${
                  item.read ? 'bg-transparent opacity-75 hover:bg-muted/50' : 'bg-primary/5 hover:bg-primary/10'
                }`}
              >
                <div className="h-9 w-9 rounded-xl bg-muted/80 flex items-center justify-center shrink-0 mt-0.5">
                  {getNotificationIcon(item.type)}
                </div>

                <div className="flex-1 space-y-1 overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{item.message}</p>
                </div>

                {!item.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-muted-foreground">No notifications available</div>
          )}
        </div>

        <DropdownMenuSeparator className="my-1" />

        {/* Footer */}
        <div className="p-1">
          <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground rounded-xl justify-center gap-1 h-8">
            View All Notifications <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
