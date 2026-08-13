'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LandlordRequestItem } from '@/app/(dashboardRoute)/_action/landlord-request.actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Inbox,
  Calendar,
  Building,
  User,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface LandlordRecentRequestsProps {
  requests: LandlordRequestItem[];
}

const STATUS_BADGE_VARIANTS: Record<
  string,
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

export function LandlordRecentRequests({ requests }: LandlordRecentRequestsProps) {
  const displayRequests = (requests || []).slice(0, 5);
  const hasRequests = displayRequests.length > 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const formatDate = (dateStr: string) => {
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
            <Inbox className="w-5 h-5 text-sky-500" />
            Recent Rental Requests
          </CardTitle>
          {hasRequests && (
            <Link href="/dashboard/landlord/requests">
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1 font-semibold hover:bg-primary/10">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Latest tenant booking applications requiring your review or status check
        </p>
      </CardHeader>

      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {!hasRequests ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50 my-auto">
            <Inbox className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No rental requests yet.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              When prospective tenants apply to rent your properties, applications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayRequests.map((req) => {
              const property = req.property;
              const tenant = req.tenant;
              const statusInfo = STATUS_BADGE_VARIANTS[req.status?.toUpperCase()] || {
                label: req.status,
                className: 'bg-muted text-muted-foreground',
              };

              const tenantAvatarUrl =
                tenant?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

              return (
                <div
                  key={req.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-card hover:bg-muted/30 hover:border-primary/40 transition-all duration-200 gap-3"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Property Image */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-border/60 bg-muted">
                      {property?.mainImage ? (
                        <Image
                          src={property.mainImage}
                          alt={property.title || 'Property'}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Building className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {property?.title || 'Rental Application'}
                      </h4>

                      {/* Tenant Info */}
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
                        <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 bg-muted">
                          <Image src={tenantAvatarUrl} alt={tenant?.name || 'Tenant'} fill sizes="16px" className="object-cover" />
                        </div>
                        <span className="font-semibold text-foreground line-clamp-1">
                          {tenant?.name || tenant?.email || 'Applicant Tenant'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-border/40">
                    <div className="text-left sm:text-right">
                      <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(property?.price || 0)}
                        <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>Move-in: {formatDate(req.moveInDate)}</span>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2.5 py-0.5 font-bold border ${statusInfo.className}`}
                    >
                      {statusInfo.label}
                    </Badge>

                    <Link href="/dashboard/landlord/requests">
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-[11px] font-semibold text-primary hover:bg-primary/10">
                        <span>View</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
