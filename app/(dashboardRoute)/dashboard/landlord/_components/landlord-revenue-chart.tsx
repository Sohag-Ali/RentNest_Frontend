'use client';

import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { LandlordRequestItem } from '@/app/(dashboardRoute)/_action/landlord-request.actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

interface LandlordRevenueChartProps {
  requests: LandlordRequestItem[];
}

type Period = '7d' | '30d' | '90d' | 'all';

const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
  { label: 'All Time', value: 'all' },
];

export function LandlordRevenueChart({ requests }: LandlordRevenueChartProps) {
  const [period, setPeriod] = useState<Period>('30d');

  // Filter requests by period and format for revenue line chart
  const filteredData = useMemo(() => {
    const approvedRequests = (requests || []).filter(
      (r) => r.status === 'APPROVED' || r.status === 'COMPLETED'
    );

    const now = new Date().getTime();

    const dateMap: Record<string, number> = {};

    approvedRequests.forEach((req) => {
      const dateStr = req.createdAt || req.moveInDate || new Date().toISOString();
      const reqTime = new Date(dateStr).getTime();

      // Check period filter
      if (period === '7d' && now - reqTime > 7 * 24 * 60 * 60 * 1000) return;
      if (period === '30d' && now - reqTime > 30 * 24 * 60 * 60 * 1000) return;
      if (period === '90d' && now - reqTime > 90 * 24 * 60 * 60 * 1000) return;

      const formattedKey = new Date(dateStr).toISOString().split('T')[0];
      const amount = req.payment?.amount || req.property?.price || 0;

      dateMap[formattedKey] = (dateMap[formattedKey] || 0) + amount;
    });

    const sortedDates = Object.keys(dateMap).sort();

    return sortedDates.map((dateKey) => {
      let label = dateKey;
      try {
        label = new Date(dateKey).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
      } catch {
        label = dateKey;
      }
      return {
        rawDate: dateKey,
        date: label,
        revenue: dateMap[dateKey],
      };
    });
  }, [requests, period]);

  const hasData = filteredData.length > 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border/80 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-semibold text-foreground">{label}</p>
          <div className="flex items-center gap-2 text-primary font-bold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Revenue: {formatCurrency(payload[0].value)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-border/60 bg-card shadow-sm w-full">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-border/40">
        <div className="space-y-1">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Revenue Overview
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Track rental revenue earnings generated across your properties
          </p>
        </div>

        {/* Period Selector */}
        <div className="inline-flex items-center rounded-xl bg-muted/70 p-1 border border-border/50 text-xs font-medium self-start sm:self-auto">
          <span className="px-2 text-muted-foreground hidden md:flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Period:
          </span>
          {PERIOD_OPTIONS.map((opt) => {
            const isSelected = period === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPeriod(opt.value)}
                className={`px-2.5 py-1 rounded-lg transition-all text-xs font-semibold select-none cursor-pointer ${
                  isSelected
                    ? 'bg-background text-foreground shadow-xs font-bold border border-border/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[260px] text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50">
            <DollarSign className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No revenue data available yet.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              When tenants book your properties, revenue details will be charted here.
            </p>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="landlordRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/40" />
                <XAxis
                  dataKey="date"
                  stroke="currentColor"
                  className="text-muted-foreground text-xs"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={(val) => `৳${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  stroke="currentColor"
                  className="text-muted-foreground text-xs"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#landlordRevenueGradient)"
                  activeDot={{ r: 6, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
