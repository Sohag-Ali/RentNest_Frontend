'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PaymentItem } from '../_actions/tenant-payment.actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreditCard, DollarSign } from 'lucide-react';

interface TenantPaymentHistoryChartProps {
  payments: PaymentItem[];
}

export function TenantPaymentHistoryChart({ payments }: TenantPaymentHistoryChartProps) {
  // Filter completed/paid items and format data for chart
  const completedPayments = (payments || []).filter(
    (p) => p.status === 'COMPLETED' || p.status === 'paid'
  );

  const chartData = completedPayments.map((p) => {
    const rawDate = p.paidAt || p.createdAt || '';
    let formattedDate = rawDate;
    try {
      if (rawDate) {
        formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
      }
    } catch {
      formattedDate = rawDate;
    }

    return {
      date: formattedDate,
      fullDate: rawDate,
      amount: p.amount || 0,
      provider: p.provider || 'Stripe',
      propertyTitle: p.rentalRequest?.property?.title || 'Rental Payment',
    };
  });

  const hasData = chartData.length > 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-popover border border-border/80 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-semibold text-foreground">{item.propertyTitle}</p>
          <p className="text-[11px] text-muted-foreground">{label}</p>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold pt-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Paid: {formatCurrency(item.amount)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-border/60 bg-card shadow-sm h-full flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-500" />
          Payment History
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Track your completed rental transaction payments over time
        </p>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50 my-auto">
            <DollarSign className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No payment history available.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              When your rental applications are approved and paid, transaction details will appear here.
            </p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="tenantPaymentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
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
                  tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  stroke="currentColor"
                  className="text-muted-foreground text-xs"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#tenantPaymentGradient)"
                  activeDot={{ r: 6, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
