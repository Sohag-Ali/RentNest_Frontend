'use client';

import { Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface NotificationItemProps {
  id: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  onDismiss?: () => void;
}

const typeConfig = {
  info: { icon: Info, color: 'text-blue-600 dark:text-blue-400' },
  success: { icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
  warning: { icon: AlertCircle, color: 'text-yellow-600 dark:text-yellow-400' },
  alert: { icon: AlertCircle, color: 'text-red-600 dark:text-red-400' },
};

export function NotificationItem({
  id,
  type,
  title,
  message,
  timestamp,
  onDismiss,
}: NotificationItemProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors group">
      <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.color}`} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onDismiss}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
