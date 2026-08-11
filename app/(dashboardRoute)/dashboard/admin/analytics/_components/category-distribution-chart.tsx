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
import { CategoryCount } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FolderTree } from 'lucide-react';

interface CategoryDistributionChartProps {
  data: CategoryCount[];
}

const CATEGORY_COLORS = [
  '#2563eb', // Blue
  '#0ea5e9', // Sky
  '#14b8a6', // Teal
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#6366f1', // Indigo
];

export function CategoryDistributionChart({ data }: CategoryDistributionChartProps) {
  const hasData = Array.isArray(data) && data.length > 0 && data.some((d) => d.count > 0);
  const totalCount = hasData ? data.reduce((acc, curr) => acc + curr.count, 0) : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as CategoryCount;
      const percentage = totalCount > 0 ? ((item.count / totalCount) * 100).toFixed(1) : '0';
      return (
        <div className="bg-popover border border-border/80 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-foreground">{item.category}</p>
          <p className="text-muted-foreground">
            Properties: <span className="font-bold text-foreground">{item.count}</span> ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-accent-foreground" />
            Properties by Category
          </CardTitle>
          {totalCount > 0 && (
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border/40">
              Total: {totalCount}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Listings categorized by property structure type
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50">
            <FolderTree className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No category data available.</p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="category"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs font-medium text-foreground">{value}</span>
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
