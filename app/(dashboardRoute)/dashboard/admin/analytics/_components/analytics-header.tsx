'use client';

import React from 'react';
import { Calendar, RefreshCw } from 'lucide-react';
import { AnalyticsPeriod } from '@/types/analytics';
import { Button } from '@/components/ui/button';

interface AnalyticsHeaderProps {
  period: AnalyticsPeriod;
  onPeriodChange: (period: AnalyticsPeriod) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const PERIOD_OPTIONS: { label: string; value: AnalyticsPeriod }[] = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
  { label: 'All Time', value: 'all' },
];

export function AnalyticsHeader({
  period,
  onPeriodChange,
  onRefresh,
  isLoading,
}: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/60 pb-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading flex items-center gap-2">
          Analytics & Insights 📈
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor Thikana's properties, users, rentals and revenue performance.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Period Selector */}
        <div className="inline-flex items-center rounded-xl bg-muted/70 p-1 border border-border/50 text-xs font-medium">
          <span className="px-2 text-muted-foreground hidden sm:flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Period:
          </span>
          {PERIOD_OPTIONS.map((opt) => {
            const isSelected = period === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onPeriodChange(opt.value)}
                disabled={isLoading}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 text-xs font-semibold select-none cursor-pointer ${
                  isSelected
                    ? 'bg-background text-foreground shadow-sm font-bold border border-border/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="rounded-xl gap-2 font-semibold text-xs border-border/60 hover:bg-muted/80"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>
    </div>
  );
}
