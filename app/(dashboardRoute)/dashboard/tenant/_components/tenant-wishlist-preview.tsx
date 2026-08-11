'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WishlistItem } from '../_actions/wishlist.actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Building, ArrowRight, ExternalLink } from 'lucide-react';

interface TenantWishlistPreviewProps {
  wishlist: WishlistItem[];
}

export function TenantWishlistPreview({ wishlist }: TenantWishlistPreviewProps) {
  const displayItems = (wishlist || []).slice(0, 4);
  const hasItems = displayItems.length > 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <Card className="border border-border/60 bg-card shadow-sm h-full flex flex-col justify-between">
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
            Your Wishlist
          </CardTitle>
          {hasItems && (
            <Link href="/dashboard/tenant/wishlist">
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1 font-semibold hover:bg-primary/10">
                <span>View All ({wishlist.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Quick preview of your saved favorite properties
        </p>
      </CardHeader>

      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {!hasItems ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50 my-auto">
            <Heart className="w-10 h-10 mb-2 opacity-30 text-rose-500" />
            <p className="text-sm font-medium">Your wishlist is empty.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Save properties you love to quickly compare and apply later.
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
            {displayItems.map((item) => {
              const property = item.property;
              if (!property) return null;

              const categoryName =
                typeof property.category === 'object'
                  ? property.category?.name
                  : property.category || 'Rental';

              return (
                <div
                  key={item.id || property.id}
                  className="group flex flex-col justify-between p-3.5 rounded-2xl border border-border/60 bg-card hover:border-rose-500/40 hover:shadow-md transition-all duration-200"
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-full h-32 rounded-xl overflow-hidden bg-muted mb-3">
                    {property.mainImage ? (
                      <Image
                        src={property.mainImage}
                        alt={property.title || 'Wishlist property'}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Building className="w-8 h-8" />
                      </div>
                    )}

                    {categoryName && (
                      <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-foreground border border-border/40">
                        {categoryName}
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-xs font-extrabold text-emerald-600 dark:text-emerald-400 border border-border/40">
                      {formatCurrency(property.price)}
                      <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {property.title}
                      </h4>
                      {property.location && (
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5 line-clamp-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{property.location}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border/40 flex justify-end">
                      <Link href={`/properties/${property.id}`}>
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-[11px] font-semibold text-primary hover:bg-primary/10">
                          <span>View Property</span>
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
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
