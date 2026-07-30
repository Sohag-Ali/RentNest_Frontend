'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaymentRow } from './payment-row';


const mockPayments = [
  {
    id: '1',
    invoiceId: 'INV-2024-001',
    property: 'Modern Apartment Downtown',
    amount: 1200,
    date: 'Dec 1, 2024',
    status: 'paid' as const,
  },
  {
    id: '2',
    invoiceId: 'INV-2024-002',
    property: 'Cozy Studio Beach House',
    amount: 850,
    date: 'Dec 15, 2024',
    status: 'paid' as const,
  },
  {
    id: '3',
    invoiceId: 'INV-2024-003',
    property: 'Luxury Villa Mountain View',
    amount: 2800,
    date: 'Jan 5, 2025',
    status: 'pending' as const,
  },
  {
    id: '4',
    invoiceId: 'INV-2024-004',
    property: 'Downtown Loft',
    amount: 1500,
    date: 'Nov 28, 2024',
    status: 'overdue' as const,
  },
];

export function RecentPaymentsSection() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Recent Payments
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayments.map((payment) => (
              <PaymentRow key={payment.id} {...payment} />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
