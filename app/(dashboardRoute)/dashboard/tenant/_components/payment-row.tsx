'use client';

import { Download, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface PaymentRowProps {
  id: string;
  invoiceId: string;
  property: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

const statusConfig = {
  paid: {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
    label: 'Paid',
  },
  pending: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
    label: 'Pending',
  },
  overdue: {
    icon: Clock,
    color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400',
    label: 'Overdue',
  },
};

export function PaymentRow({
  id,
  invoiceId,
  property,
  amount,
  date,
  status,
}: PaymentRowProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <TableRow>
      <TableCell className="font-medium">{invoiceId}</TableCell>
      <TableCell>{property}</TableCell>
      <TableCell>৳{amount.toLocaleString()}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Badge className={config.color}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
