'use client';

import React from 'react';
import Image from 'next/image';
import { RecentRental, RentalStatus } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { FileText, Calendar, Building, User } from 'lucide-react';

interface RecentRentalsTableProps {
  data: RecentRental[];
}

const STATUS_BADGE_VARIANTS: Record<
  RentalStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  },
  APPROVED: {
    label: 'Approved',
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
  },
  REJECTED: {
    label: 'Rejected',
    className: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  },
};

export function RecentRentalsTable({ data }: RecentRentalsTableProps) {
  const hasData = Array.isArray(data) && data.length > 0;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <Card className="border border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Recent Rental Activity
          </CardTitle>
          {hasData && (
            <span className="text-xs text-muted-foreground font-medium">
              Showing last {data.length} requests
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Latest rental applications and booking status updates
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <FileText className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No recent rental activity.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="border-border/60">
                  <TableHead className="w-[280px] font-bold text-xs">Property</TableHead>
                  <TableHead className="font-bold text-xs">Tenant</TableHead>
                  <TableHead className="font-bold text-xs">Landlord</TableHead>
                  <TableHead className="font-bold text-xs">Price</TableHead>
                  <TableHead className="font-bold text-xs">Status</TableHead>
                  <TableHead className="font-bold text-xs">Move-in Date</TableHead>
                  <TableHead className="font-bold text-xs text-right">Created Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => {
                  const statusInfo = STATUS_BADGE_VARIANTS[item.status] || {
                    label: item.status,
                    className: 'bg-muted text-muted-foreground',
                  };
                  return (
                    <TableRow key={item.id} className="hover:bg-muted/30 border-border/40 transition-colors">
                      {/* Property */}
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-border/60 bg-muted">
                            {item.propertyMainImage ? (
                              <Image
                                src={item.propertyMainImage}
                                alt={item.propertyTitle || 'Property image'}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                                <Building className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-bold text-foreground line-clamp-2 max-w-[200px]">
                            {item.propertyTitle || 'Untitled Property'}
                          </span>
                        </div>
                      </TableCell>

                      {/* Tenant */}
                      <TableCell>
                        <div className="flex flex-col text-xs">
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <User className="w-3 h-3 text-muted-foreground" />
                            {item.tenantName || 'N/A'}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {item.tenantEmail}
                          </span>
                        </div>
                      </TableCell>

                      {/* Landlord */}
                      <TableCell className="text-xs font-medium text-foreground">
                        {item.landlordName || 'N/A'}
                      </TableCell>

                      {/* Price */}
                      <TableCell className="text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                        {formatCurrency(item.propertyPrice)}
                        <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[11px] px-2.5 py-0.5 font-bold border ${statusInfo.className}`}
                        >
                          {statusInfo.label}
                        </Badge>
                      </TableCell>

                      {/* Move-in Date */}
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{formatDate(item.moveInDate)}</span>
                        </div>
                      </TableCell>

                      {/* Created Date */}
                      <TableCell className="text-xs text-muted-foreground text-right whitespace-nowrap">
                        {formatDate(item.createdAt)}
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
