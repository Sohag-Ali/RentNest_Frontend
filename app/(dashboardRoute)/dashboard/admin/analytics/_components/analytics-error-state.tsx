'use client';

import React from 'react';
import { AlertTriangle, ShieldAlert, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AnalyticsErrorStateProps {
  statusCode?: number;
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function AnalyticsErrorState({
  statusCode,
  message,
  onRetry,
  isRetrying = false,
}: AnalyticsErrorStateProps) {
  const isForbidden = statusCode === 403;
  const isUnauthorized = statusCode === 401;

  let title = 'Unable to load analytics';
  let description =
    message || 'Something went wrong while fetching analytics data.';

  if (isForbidden) {
    title = 'Access Restricted';
    description = 'You do not have permission to view admin analytics.';
  } else if (isUnauthorized) {
    title = 'Session Expired';
    description = 'Your session has expired. Please log in again as an Administrator.';
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="max-w-md w-full border border-border/80 shadow-luxury bg-card text-center overflow-hidden">
        <CardContent className="p-8 space-y-6 flex flex-col items-center">
          <div className="p-4 rounded-full bg-destructive/10 text-destructive border border-destructive/20 animate-bounce">
            {isForbidden || isUnauthorized ? (
              <ShieldAlert className="w-10 h-10" />
            ) : (
              <AlertTriangle className="w-10 h-10" />
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground font-heading">
              {title}
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
              {description}
            </p>
          </div>

          {!isForbidden && !isUnauthorized && (
            <Button
              onClick={onRetry}
              disabled={isRetrying}
              className="gap-2 font-semibold text-xs rounded-xl shadow-md cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>Try Again</span>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
