'use client';

import React from 'react';
import {
  Building2,
  CheckCircle2,
  Home,
  Inbox,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LandlordOverviewCardsProps {
  totalProperties: number;
  availableProperties: number;
  rentedProperties: number;
  totalRequests: number;
  pendingRequests: number;
  totalRevenue: number;
}

export function LandlordOverviewCards({
  totalProperties,
  availableProperties,
  rentedProperties,
  totalRequests,
  pendingRequests,
  totalRevenue,
}: LandlordOverviewCardsProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val || 0);
  };

  const cards = [
    {
      title: 'Total Properties',
      value: formatNumber(totalProperties),
      description: 'Listed portfolio properties',
      icon: Building2,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Available Properties',
      value: formatNumber(availableProperties),
      description: 'Active for tenant booking',
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Rented Properties',
      value: formatNumber(rentedProperties),
      description: 'Currently occupied listings',
      icon: Home,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Rental Requests',
      value: formatNumber(totalRequests),
      description: 'Total tenant applications',
      icon: Inbox,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Pending Requests',
      value: formatNumber(pendingRequests),
      description: 'Requires landlord action',
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      description: 'Gross completed earnings',
      icon: DollarSign,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20',
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
