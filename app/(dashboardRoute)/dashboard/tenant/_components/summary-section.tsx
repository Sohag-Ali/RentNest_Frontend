'use client';

import { Activity, BookOpen, Heart, CreditCard } from 'lucide-react';
import { SummaryCard } from './summary-card';
;

export function SummarySection() {
  const summaryData = [
    {
      icon: BookOpen,
      label: 'Active Bookings',
      value: '3',
      trend: { value: 12, isPositive: true },
      color: 'blue' as const,
    },
    {
      icon: Activity,
      label: 'Pending Requests',
      value: '2',
      trend: { value: 5, isPositive: false },
      color: 'purple' as const,
    },
    {
      icon: Heart,
      label: 'Favorites',
      value: '24',
      trend: { value: 8, isPositive: true },
      color: 'green' as const,
    },
    {
      icon: CreditCard,
      label: 'Total Payments',
      value: '$4,850',
      trend: { value: 15, isPositive: true },
      color: 'orange' as const,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <SummaryCard key={index} {...item} />
      ))}
    </section>
  );
}
