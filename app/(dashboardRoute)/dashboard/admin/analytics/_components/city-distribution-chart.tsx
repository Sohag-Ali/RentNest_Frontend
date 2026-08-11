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
import { CityCount } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface CityDistributionChartProps {
  data: CityCount[];
}

const CITY_BAR_COLORS = [
  '#2563eb',
  '#0ea5e9',
  '#14b8a6',
  '#10b981',
  '#8b5cf6',
  '#f59e0b',
];

export function CityDistributionChart({ data }: CityDistributionChartProps) {
  const hasData = Array.isArray(data) && data.length > 0;

  // Dynamic height calculation based on item count for optimal readability
  const chartHeight = hasData ? Math.max(260, data.length * 36) : 260;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as CityCount;
      return (
        <div className="bg-popover border border-border/80 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-foreground">{item.city}</p>
          <p className="text-muted-foreground">
            Properties: <span className="font-bold text-foreground">{item.count}</span>
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
          <MapPin className="w-5 h-5 text-blue-500" />
          Properties by City
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Geographic distribution of property listings across cities
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50">
            <MapPin className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No city data available.</p>
          </div>
        ) : (
          <div className="w-full overflow-y-auto max-h-80 pr-2">
            <div style={{ height: `${chartHeight}px`, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={data}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/40" />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    stroke="currentColor"
                    className="text-muted-foreground text-xs"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="city"
                    width={90}
                    stroke="currentColor"
                    className="text-foreground font-medium text-xs"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {data.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CITY_BAR_COLORS[index % CITY_BAR_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
