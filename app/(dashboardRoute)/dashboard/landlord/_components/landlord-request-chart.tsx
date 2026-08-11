'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { LandlordRequestItem } from '@/app/(dashboardRoute)/_action/landlord-request.actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Inbox } from 'lucide-react';

interface LandlordRequestChartProps {
  requests: LandlordRequestItem[];
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string }
> = {
  PENDING: { label: 'Pending', color: '#f59e0b' },
  APPROVED: { label: 'Approved', color: '#3b82f6' },
  REJECTED: { label: 'Rejected', color: '#ef4444' },
  CANCELLED: { label: 'Cancelled', color: '#64748b' },
  COMPLETED: { label: 'Completed', color: '#10b981' },
};

export function LandlordRequestChart({ requests }: LandlordRequestChartProps) {
  // Aggregate request counts by status
  const statusCounts: Record<string, number> = {
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
    CANCELLED: 0,
    COMPLETED: 0,
  };

  (requests || []).forEach((r) => {
    const s = (r.status || 'PENDING').toUpperCase();
    if (statusCounts[s] !== undefined) {
      statusCounts[s] += 1;
    } else {
      statusCounts[s] = 1;
    }
  });

  const chartData = Object.keys(statusCounts).map((statusKey) => ({
    statusKey,
    label: STATUS_CONFIG[statusKey]?.label || statusKey,
    count: statusCounts[statusKey],
    color: STATUS_CONFIG[statusKey]?.color || '#2563eb',
  }));

  const totalRequests = (requests || []).length;
  const hasData = totalRequests > 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-popover border border-border/80 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-foreground">{item.label} Applications</p>
          <p className="text-muted-foreground">
            Total Count: <span className="font-bold text-foreground">{item.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-border/60 bg-card shadow-sm h-full flex flex-col justify-between">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
            <Inbox className="w-5 h-5 text-sky-500" />
            Rental Request Overview
          </CardTitle>
          {totalRequests > 0 && (
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border/40">
              Total: {totalRequests}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Distribution of tenant application statuses for your listings
        </p>
      </CardHeader>

      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50 my-auto">
            <Inbox className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No rental requests yet.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              When tenants submit applications for your properties, counts will show here.
            </p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/40" />
                <XAxis
                  dataKey="label"
                  stroke="currentColor"
                  className="text-muted-foreground text-xs"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="currentColor"
                  className="text-muted-foreground text-xs"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
