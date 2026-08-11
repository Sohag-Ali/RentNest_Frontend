'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Compass,
  Home,
  FileText,
  CreditCard,
  Heart,
  Star,
  Zap,
} from 'lucide-react';

export function TenantQuickActions() {
  const actions = [
    {
      title: 'Explore Properties',
      description: 'Find your next rental home',
      href: '/properties',
      icon: Compass,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'My Bookings',
      description: 'Active lease contracts',
      href: '/dashboard/tenant/bookings',
      icon: Home,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Rental Requests',
      description: 'Track application statuses',
      href: '/dashboard/tenant/requests',
      icon: FileText,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Payment History',
      description: 'Transactions & receipts',
      href: '/dashboard/tenant/payments',
      icon: CreditCard,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Saved Wishlist',
      description: 'Favorite property listings',
      href: '/dashboard/tenant/wishlist',
      icon: Heart,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    },
    {
      title: 'My Reviews',
      description: 'Ratings & property feedback',
      href: '/dashboard/tenant/reviews',
      icon: Star,
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    },
  ];

  return (
    <Card className="border border-border/60 bg-card shadow-sm h-full flex flex-col justify-between">
      <CardHeader className="pb-3 border-b border-border/40">
        <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500 shrink-0" />
          <span>Quick Actions</span>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Frequently accessed tenant navigation shortcuts
        </p>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="group flex items-center gap-3 p-3 rounded-2xl border border-border/60 bg-card hover:bg-muted/40 hover:border-primary/40 hover:shadow-xs transition-all duration-200"
              >
                <div className={`p-2.5 rounded-xl border shrink-0 ${action.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {action.title}
                  </h5>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
