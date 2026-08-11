'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  CheckCheck,
  Trash2,
  Building2,
  CreditCard,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  Inbox,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/providers/notification-provider';
import { NotificationType, NotificationItem } from '@/types/notification.type';

type FilterTab = 'all' | 'unread' | 'read';

function formatFullTime(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    meta,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    handleNotificationClick,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    let isReadParam: boolean | undefined = undefined;
    if (activeTab === 'unread') isReadParam = false;
    if (activeTab === 'read') isReadParam = true;

    fetchNotifications({
      page: currentPage,
      limit: 10,
      isRead: isReadParam,
    });
  }, [activeTab, currentPage, fetchNotifications]);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'RENTAL_REQUEST':
      case 'NEW_PROPERTY':
      case 'PROPERTY_UPDATED':
        return <Building2 className="h-5 w-5 text-emerald-500" />;
      case 'RENTAL_APPROVED':
        return <ShieldCheck className="h-5 w-5 text-green-500" />;
      case 'RENTAL_REJECTED':
      case 'RENTAL_CANCELLED':
      case 'PAYMENT_FAILED':
        return <XCircle className="h-5 w-5 text-rose-500" />;
      case 'PAYMENT_SUCCESS':
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case 'NEW_REVIEW':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      default:
        return <Sparkles className="h-5 w-5 text-amber-500" />;
    }
  };

  const getBadgeStyle = (type: NotificationType) => {
    switch (type) {
      case 'RENTAL_APPROVED':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'RENTAL_REJECTED':
      case 'PAYMENT_FAILED':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'PAYMENT_SUCCESS':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'RENTAL_REQUEST':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const totalPages = meta?.totalPage || 1;

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-white rounded-full px-3 py-1 text-xs font-semibold">
                {unreadCount} Unread
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Stay updated with real-time alerts regarding your rentals, payments, and account activity.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="outline"
            className="rounded-full gap-2 border-primary/30 text-primary hover:bg-primary/10 self-start sm:self-auto cursor-pointer"
          >
            <CheckCheck className="h-4 w-4" />
            <span>Mark all as read</span>
          </Button>
        )}
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 p-1.5 bg-muted/60 dark:bg-slate-900/60 rounded-full border border-border/60 mb-6 w-fit">
        {(['all', 'unread', 'read'] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full capitalize transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 mb-6 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-between">
          <p className="text-sm font-medium">{error}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fetchNotifications({ page: currentPage, limit: 10 })}
            className="gap-2 text-destructive hover:bg-destructive/20 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Retry
          </Button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-5 rounded-3xl bg-card border border-border/80 shadow-sm animate-pulse flex items-start gap-4"
            >
              <div className="h-10 w-10 rounded-2xl bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-card border border-border/80 shadow-luxury space-y-4 my-8">
          <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Inbox className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">No notifications found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {activeTab === 'unread'
                ? "You've read all your notifications! Great job keeping up to date."
                : "You don't have any notifications at the moment."}
            </p>
          </div>
        </div>
      ) : (
        /* Notification List */
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {notifications.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`group p-4 sm:p-5 rounded-3xl border transition-all duration-200 flex items-start gap-4 ${
                  item.isRead
                    ? 'bg-card border-border/60 hover:border-border'
                    : 'bg-primary/5 dark:bg-primary/10 border-primary/30 hover:border-primary/50 shadow-sm'
                }`}
              >
                {/* Type Icon */}
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-muted/80 flex items-center justify-center shrink-0 shadow-inner mt-0.5">
                  {getNotificationIcon(item.type)}
                </div>

                {/* Content */}
                <div
                  onClick={() => handleNotificationClick(item)}
                  className="flex-1 cursor-pointer space-y-1.5 overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      {!item.isRead && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <Badge variant="outline" className={`text-[10px] capitalize ${getBadgeStyle(item.type)}`}>
                      {item.type.replace('_', ' ').toLowerCase()}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.message}
                  </p>

                  <span className="text-[11px] text-muted-foreground block font-medium">
                    {formatFullTime(item.createdAt)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {!item.isRead && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Mark as read"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(item.id);
                      }}
                      className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    title="Delete notification"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(item.id);
                    }}
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages} ({meta?.total || 0} total)
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="rounded-full gap-1 text-xs cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="rounded-full gap-1 text-xs cursor-pointer"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
