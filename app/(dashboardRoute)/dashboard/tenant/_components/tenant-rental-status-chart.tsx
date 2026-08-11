'use client';

import React from 'react';
import Link from 'next/link';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TenantRentalItem } from '../_actions/tenant-rental.actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TenantRentalStatusChartProps {
  rentals: TenantRentalItem[];
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string }
> = {
  PENDING: { label: 'Pending', color: '#f59e0b' },
  APPROVED: { label: 'Approved', color: '#3b82f6' },
  REJECTED: { label: 'Rejected', color: '#ef4444' },
  CANCELLED: { label: 'Cancelled', color: '#64748b' },
  COMPLETED: { label: 'Completed / Active', color: '#10b981' },
};

export function TenantRentalStatusChart({ rentals }: TenantRentalStatusChartProps) {
  // Aggregate rental status counts
  const statusCounts: Record<string, number> = {};
  (rentals || []).forEach((r) => {
    const s = (r.status || 'PENDING').toUpperCase();
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  });

  const chartData = Object.keys(statusCounts).map((status) => ({
    name: STATUS_CONFIG[status]?.label || status,
    statusKey: status,
    value: statusCounts[status],
    color: STATUS_CONFIG[status]?.color || '#2563eb',
  }));

  const totalRequests = (rentals || []).length;
  const hasData = totalRequests > 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = totalRequests > 0 ? ((item.value / totalRequests) * 100).toFixed(1) : '0';
      return (
        <div className="bg-popover border border-border/80 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-foreground" style={{ color: item.color }}>
            {item.name}
          </p>
          <p className="text-muted-foreground">
            Applications: <span className="font-bold text-foreground">{item.value}</span> ({percentage}%)
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
            <FileText className="w-5 h-5 text-primary" />
            Rental Request Status
          </CardTitle>
          {totalRequests > 0 && (
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border/40">
              Total: {totalRequests}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Current breakdown of your submitted property applications
        </p>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50 my-auto">
            <FileText className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No rental requests yet.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Explore available properties and submit an application to get started.
            </p>
            <Link href="/properties">
              <Button size="sm" className="mt-4 gap-1.5 rounded-xl text-xs font-semibold">
                <span>Browse Properties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs font-semibold text-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
