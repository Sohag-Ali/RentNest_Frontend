'use client';

import { Activity, BookOpen, CreditCard, CheckCircle2 } from 'lucide-react';
import { SummaryCard } from './summary-card';

interface SummarySectionProps {
  activeBookingsCount?: number;
  pendingRequestsCount?: number;
  approvedRequestsCount?: number;
  totalPaymentsSum?: number;
}

export function SummarySection({
  activeBookingsCount = 0,
  pendingRequestsCount = 0,
  approvedRequestsCount = 0,
  totalPaymentsSum = 0,
}: SummarySectionProps) {
  const summaryData = [
    {
      icon: BookOpen,
      label: 'Active Bookings',
      value: activeBookingsCount.toString(),
      trend: { value: 12, isPositive: true },
      color: 'blue' as const,
    },
    {
      icon: Activity,
      label: 'Pending Requests',
      value: pendingRequestsCount.toString(),
      trend: { value: 5, isPositive: false },
      color: 'purple' as const,
    },
    {
      icon: CheckCircle2,
      label: 'Approved Leases',
      value: approvedRequestsCount.toString(),
      trend: { value: 8, isPositive: true },
      color: 'green' as const,
    },
    {
      icon: CreditCard,
      label: 'Total Rent Paid',
      value: `৳${totalPaymentsSum.toLocaleString()}`,
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
