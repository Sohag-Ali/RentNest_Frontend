'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Property } from '@/types/property';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface LandlordAvailabilityChartProps {
  properties: Property[];
}

export function LandlordAvailabilityChart({ properties }: LandlordAvailabilityChartProps) {
  const availableCount = (properties || []).filter(
    (p) => p.isAvailable !== false
  ).length;

  const rentedCount = (properties || []).filter(
    (p) => p.isAvailable === false
  ).length;

  const total = (properties || []).length;
  const hasData = total > 0;

  const chartData = [
    { name: 'Available', value: availableCount, color: '#10b981' },
    { name: 'Rented / Occupied', value: rentedCount, color: '#8b5cf6' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
      return (
        <div className="bg-popover border border-border/80 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-foreground" style={{ color: item.color }}>
            {item.name}
          </p>
          <p className="text-muted-foreground">
            Properties: <span className="font-bold text-foreground">{item.value}</span> ({percentage}%)
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
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Property Availability
          </CardTitle>
          {total > 0 && (
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border/40">
              Total: {total}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Active available listings vs currently occupied properties
        </p>
      </CardHeader>

      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50 my-auto">
            <CheckCircle2 className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No property data available.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              List your properties to view real-time availability ratios.
            </p>
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
