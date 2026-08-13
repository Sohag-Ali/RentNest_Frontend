'use client';

import React from 'react';
import Link from 'next/link';
import { LandlordRequestItem } from '@/app/(dashboardRoute)/_action/landlord-request.actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { CreditCard, Calendar, ArrowRight } from 'lucide-react';

interface LandlordRecentPaymentsProps {
  requests: LandlordRequestItem[];
}

export function LandlordRecentPayments({ requests }: LandlordRecentPaymentsProps) {
  // Extract completed / approved payment requests
  const paymentRequests = (requests || []).filter(
    (r) => r.status === 'APPROVED' || r.status === 'COMPLETED' || r.payment
  );

  const displayPayments = paymentRequests.slice(0, 5);
  const hasPayments = displayPayments.length > 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Card className="border border-border/60 bg-card shadow-sm h-full flex flex-col justify-between">
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-500" />
            Recent Payments
          </CardTitle>
          {hasPayments && (
            <Link href="/dashboard/landlord/payments">
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1 font-semibold hover:bg-primary/10">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Latest rental revenue transactions paid by your tenants
        </p>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col justify-center">
        {!hasPayments ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground p-6">
            <CreditCard className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No payment activity yet.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              When tenants complete booking payments for your properties, receipts will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="border-border/60">
                  <TableHead className="font-bold text-xs">Property</TableHead>
                  <TableHead className="font-bold text-xs">Tenant</TableHead>
                  <TableHead className="font-bold text-xs">Amount</TableHead>
                  <TableHead className="font-bold text-xs">Provider</TableHead>
                  <TableHead className="font-bold text-xs">Status</TableHead>
                  <TableHead className="font-bold text-xs text-right">Paid Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayPayments.map((item) => {
                  const propertyTitle = item.property?.title || 'Rental Listing';
                  const tenantName = item.tenant?.name || item.tenant?.email || 'Tenant';
                  const amount = item.payment?.amount || item.property?.price || 0;
                  const provider = item.payment?.provider || 'Stripe';
                  const isCompleted = item.status === 'COMPLETED' || item.status === 'APPROVED';

                  return (
                    <TableRow key={item.id} className="hover:bg-muted/30 border-border/40 transition-colors">
                      <TableCell className="font-semibold text-xs text-foreground line-clamp-1 max-w-[180px]">
                        {propertyTitle}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap font-medium">
                        {tenantName}
                      </TableCell>
                      <TableCell className="text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                        {formatCurrency(amount)}
                      </TableCell>
                      <TableCell className="text-xs font-medium text-muted-foreground capitalize">
                        {provider}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 py-0.5 font-bold border ${
                            isCompleted
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                          }`}
                        >
                          {isCompleted ? 'COMPLETED' : 'PENDING'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span>{formatDate(item.payment?.paidAt || item.createdAt)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
