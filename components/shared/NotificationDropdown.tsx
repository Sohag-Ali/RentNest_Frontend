'use client';

import Link from 'next/link';
import {
  Bell,
  CheckCheck,
  Building2,
  CreditCard,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  XCircle,
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
import { useNotifications } from '@/providers/notification-provider';
import { NotificationType, NotificationItem } from '@/types/notification.type';

function formatRelativeTime(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(diffInSeconds) || diffInSeconds < 30) return 'Just now';
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function NotificationDropdown() {
  const { notifications, unreadCount, markAllAsRead, handleNotificationClick } =
    useNotifications();

  const displayNotifications = notifications.slice(0, 5);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'RENTAL_REQUEST':
      case 'NEW_PROPERTY':
      case 'PROPERTY_UPDATED':
        return <Building2 className="h-4 w-4 text-emerald-500" />;
      case 'RENTAL_APPROVED':
        return <ShieldCheck className="h-4 w-4 text-green-500" />;
      case 'RENTAL_REJECTED':
      case 'RENTAL_CANCELLED':
      case 'PAYMENT_FAILED':
        return <XCircle className="h-4 w-4 text-rose-500" />;
      case 'PAYMENT_SUCCESS':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'NEW_REVIEW':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Notifications"
        className="relative flex items-center justify-center h-9 w-9 rounded-full cursor-pointer hover:bg-muted transition-colors outline-none text-foreground"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-red-500 text-[10px] font-bold text-white px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 sm:w-96 p-2 rounded-3xl shadow-xl border-border/80 bg-card z-50">
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
          {displayNotifications.length > 0 ? (
            displayNotifications.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3 rounded-2xl cursor-pointer transition-all flex items-start gap-3 ${
                  item.isRead ? 'bg-transparent opacity-75 hover:bg-muted/50' : 'bg-primary/5 hover:bg-primary/10'
                }`}
              >
                <div className="h-9 w-9 rounded-xl bg-muted/80 flex items-center justify-center shrink-0 mt-0.5">
                  {getNotificationIcon(item.type)}
                </div>

                <div className="flex-1 space-y-1 overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {formatRelativeTime(item.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{item.message}</p>
                </div>

                {!item.isRead && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-muted-foreground">No notifications available</div>
          )}
        </div>

        <DropdownMenuSeparator className="my-1" />

        {/* Footer */}
        <div className="p-1">
          <Link href="/notifications">
            <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground rounded-xl justify-center gap-1 h-8 cursor-pointer">
              View All Notifications <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
