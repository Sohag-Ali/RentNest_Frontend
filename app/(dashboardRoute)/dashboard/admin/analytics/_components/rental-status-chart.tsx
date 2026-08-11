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
import { RentalStatusCount, RentalStatus } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface RentalStatusChartProps {
  data: RentalStatusCount[];
}

const STATUS_CONFIG: Record<
  RentalStatus,
  { label: string; color: string }
> = {
  PENDING: { label: 'Pending', color: '#f59e0b' },
  APPROVED: { label: 'Approved', color: '#3b82f6' },
  REJECTED: { label: 'Rejected', color: '#ef4444' },
  CANCELLED: { label: 'Cancelled', color: '#64748b' },
  COMPLETED: { label: 'Completed', color: '#10b981' },
};

export function RentalStatusChart({ data }: RentalStatusChartProps) {
  const hasData = Array.isArray(data) && data.length > 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as RentalStatusCount;
      const config = STATUS_CONFIG[item.status] || {
        label: item.status,
        color: '#2563eb',
      };
      return (
        <div className="bg-popover border border-border/80 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-foreground">{config.label} Requests</p>
          <p className="text-muted-foreground">
            Count: <span className="font-bold text-foreground">{item.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
          <FileText className="w-5 h-5 text-secondary" />
          Rental Request Overview
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Distribution of tenant rental application statuses
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50">
            <FileText className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No rental request data available.</p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/40" />
                <XAxis
                  dataKey="status"
                  tickFormatter={(val: RentalStatus) => STATUS_CONFIG[val]?.label || val}
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
                  {data.map((entry, index) => {
                    const color = STATUS_CONFIG[entry.status]?.color || '#2563eb';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
