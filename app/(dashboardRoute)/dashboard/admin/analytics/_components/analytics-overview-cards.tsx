'use client';

import React from 'react';
import {
  Building2,
  Users,
  UserCheck,
  FileText,
  DollarSign,
  Heart,
} from 'lucide-react';
import { OverviewStats } from '@/types/analytics';
import { Card, CardContent } from '@/components/ui/card';

interface AnalyticsOverviewCardsProps {
  overview: OverviewStats;
}

export function AnalyticsOverviewCards({ overview }: AnalyticsOverviewCardsProps) {
  // Format numbers and currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val || 0);
  };

  const cards = [
    {
      title: 'Total Properties',
      value: formatNumber(overview.totalProperties),
      description: 'Active platform listings',
      icon: Building2,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Total Tenants',
      value: formatNumber(overview.totalTenants),
      description: 'Registered tenant accounts',
      icon: Users,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Total Landlords',
      value: formatNumber(overview.totalLandlords),
      description: 'Verified property owners',
      icon: UserCheck,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20',
    },
    {
      title: 'Rental Requests',
      value: formatNumber(overview.totalRentalRequests),
      description: 'Total tenant applications',
      icon: FileText,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(overview.totalRevenue),
      description: 'Gross completed payments',
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Total Wishlists',
      value: formatNumber(overview.totalWishlists),
      description: 'Saved favorite properties',
      icon: Heart,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 border border-border/60 bg-card"
          >
            <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl border ${card.bg} ${card.color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-black tracking-tight text-foreground font-heading">
                  {card.value}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {card.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
