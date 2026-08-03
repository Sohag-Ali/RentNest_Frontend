'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TenantRentalItem } from '../_actions/tenant-rental.actions';
import { Calendar, MapPin, ArrowRight, CreditCard, ShieldCheck, Hourglass, XCircle, Building2 } from 'lucide-react';

interface RecentBookingsSectionProps {
  rentals?: TenantRentalItem[];
}

const DEFAULT_PROPERTY_IMAGE =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';

const getPropertyImageUrl = (property: any): string => {
  if (!property) return DEFAULT_PROPERTY_IMAGE;
  if (typeof property.mainImage === 'string' && property.mainImage.trim() !== '') return property.mainImage.trim();
  if (typeof property.main_image === 'string' && property.main_image.trim() !== '') return property.main_image.trim();
  if (typeof property.image === 'string' && property.image.trim() !== '') return property.image.trim();
  if (Array.isArray(property.images) && property.images.length > 0 && typeof property.images[0] === 'string') return property.images[0].trim();
  return DEFAULT_PROPERTY_IMAGE;
};

export function RecentBookingsSection({ rentals = [] }: RecentBookingsSectionProps) {
  const displayRentals = rentals.slice(0, 4);

  return (
    <Card className="p-6 rounded-3xl border border-border/70 bg-card shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground font-heading">
            Recent Applications & Bookings
          </h2>
          <p className="text-xs text-muted-foreground">
            Overview of your latest requested properties and lease statuses.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/tenant/requests" />}
          variant="ghost"
          className="rounded-2xl text-xs font-bold text-primary hover:bg-primary/10 gap-1"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {displayRentals.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-border/80 rounded-2xl bg-muted/20 space-y-3">
          <Building2 className="h-10 w-10 text-muted-foreground/50 mx-auto" />
          <p className="text-sm font-semibold text-foreground">No rental applications yet</p>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Browse available properties and submit booking requests to see your applications here.
          </p>
          <Button
            render={<Link href="/properties" />}
            className="rounded-2xl text-xs font-bold px-5 h-9 bg-primary text-primary-foreground shadow-sm"
          >
            Explore Properties
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {displayRentals.map((rental) => {
            const property = rental.property;
            const propertyImage = getPropertyImageUrl(property);
            const isCompleted = rental.status === 'COMPLETED';
            const isApproved = rental.status === 'APPROVED';
            const isRejected = rental.status === 'REJECTED';

            const moveInDateFormatted = rental.moveInDate
              ? new Date(rental.moveInDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'N/A';

            return (
              <div
                key={rental.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50 gap-4 hover:border-border/80 hover:bg-muted/50 transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative h-16 w-20 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/60 shadow-xs">
                    <Image
                      src={propertyImage}
                      alt={property?.title || 'Property'}
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {property?.title || 'Rental Property'}
                    </h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 line-clamp-1">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      {property?.location || 'Location N/A'}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Calendar className="h-3 w-3 text-primary shrink-0" />
                      <span>Move-in: {moveInDateFormatted}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-sm font-extrabold text-foreground font-mono">
                      ${property?.price ? property.price.toLocaleString() : 0}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">/ month</span>
                  </div>

                  {/* Status Badge & Action */}
                  {isCompleted ? (
                    <Badge variant="success" className="px-3 py-1 text-xs gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Confirmed
                    </Badge>
                  ) : isApproved ? (
                    <Button
                      render={<Link href={`/dashboard/tenant/requests/${rental.id}/pay`} />}
                      className="rounded-2xl px-4 h-9 text-xs font-bold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Pay Now</span>
                    </Button>
                  ) : isRejected ? (
                    <Badge variant="destructive" className="px-3 py-1 text-xs gap-1">
                      <XCircle className="h-3.5 w-3.5" />
                      Declined
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="px-3 py-1 text-xs bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 gap-1">
                      <Hourglass className="h-3.5 w-3.5" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
