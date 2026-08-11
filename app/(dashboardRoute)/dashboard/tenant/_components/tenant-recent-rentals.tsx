'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TenantRentalItem } from '../_actions/tenant-rental.actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, MapPin, Calendar, Building, ArrowRight, ExternalLink } from 'lucide-react';

interface TenantRecentRentalsProps {
  rentals: TenantRentalItem[];
}

const STATUS_BADGE_VARIANTS: Record<
  string,
  { label: string; className: string }
> = {
  PENDING: {
    label: 'Pending Review',
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
    label: 'Active Lease',
    className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  },
};

export function TenantRecentRentals({ rentals }: TenantRecentRentalsProps) {
  const displayRentals = (rentals || []).slice(0, 4);
  const hasRentals = displayRentals.length > 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
            <Home className="w-5 h-5 text-primary" />
            Recent Rentals
          </CardTitle>
          {hasRentals && (
            <Link href="/dashboard/tenant/requests">
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1 font-semibold hover:bg-primary/10">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Your recent rental applications and active lease contracts
        </p>
      </CardHeader>

      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {!hasRentals ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50 my-auto">
            <Home className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No rentals yet.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Start exploring platform properties and apply for your ideal home.
            </p>
            <Link href="/properties">
              <Button size="sm" className="mt-4 gap-1.5 rounded-xl text-xs font-semibold">
                <span>Explore Properties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayRentals.map((item) => {
              const property = item.property;
              const statusInfo = STATUS_BADGE_VARIANTS[item.status?.toUpperCase()] || {
                label: item.status,
                className: 'bg-muted text-muted-foreground',
              };

              return (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between p-3.5 rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200"
                >
                  {/* Property Image & Status Header */}
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-muted mb-3">
                    {property?.mainImage ? (
                      <Image
                        src={property.mainImage}
                        alt={property.title || 'Property image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Building className="w-8 h-8" />
                      </div>
                    )}

                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0.5 backdrop-blur-md shadow-xs ${statusInfo.className}`}>
                        {statusInfo.label}
                      </Badge>
                    </div>

                    {property?.price && (
                      <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-xs font-extrabold text-emerald-600 dark:text-emerald-400 border border-border/40">
                        {formatCurrency(property.price)}
                        <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Details */}
                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {property?.title || 'Property Application'}
                      </h4>
                      {property?.location && (
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5 line-clamp-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{property.location}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px]">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Move-in: {formatDate(item.moveInDate)}</span>
                      </div>

                      {property?.id && (
                        <Link href={`/properties/${property.id}`}>
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-[11px] font-semibold text-primary hover:bg-primary/10">
                            <span>View</span>
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
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
