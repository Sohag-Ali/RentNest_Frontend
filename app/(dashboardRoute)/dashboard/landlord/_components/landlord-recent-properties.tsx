'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  ArrowRight,
  ExternalLink,
  Plus,
  Edit,
  Sparkles,
} from 'lucide-react';

interface LandlordRecentPropertiesProps {
  properties: Property[];
}

export function LandlordRecentProperties({ properties }: LandlordRecentPropertiesProps) {
  const displayProperties = (properties || []).slice(0, 4);
  const hasProperties = displayProperties.length > 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <Card className="border border-border/60 bg-card shadow-sm w-full">
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground font-heading flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary shrink-0" />
            <span>My Recent Properties</span>
          </CardTitle>
          {hasProperties && (
            <Link href="/dashboard/landlord/properties">
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1 font-semibold hover:bg-primary/10">
                <span>View All ({properties.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Quick overview of your latest added property listings
        </p>
      </CardHeader>

      <CardContent className="pt-5">
        {!hasProperties ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground p-6 rounded-xl border border-dashed border-border/50">
            <Building2 className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No properties listed yet.</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Add your first property listing to start receiving tenant applications.
            </p>
            <Link href="/dashboard/landlord/properties/new">
              <Button size="sm" className="mt-4 gap-1.5 rounded-xl text-xs font-semibold">
                <Plus className="w-4 h-4" />
                <span>Add Your First Property</span>
              </Button>
            </Link>
          </div>
        ) : (
          /* Responsive 4-Column Card Grid with ample card width */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayProperties.map((property) => {
              const isAvailable = property.isAvailable !== false;
              const categoryName =
                typeof property.category === 'object'
                  ? property.category?.name
                  : property.category || 'Rental';

              return (
                <div
                  key={property.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Image Banner */}
                  <div className="relative w-full h-44 bg-muted overflow-hidden">
                    {property.mainImage ? (
                      <Image
                        src={property.mainImage}
                        alt={property.title || 'Property'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Building2 className="w-10 h-10" />
                      </div>
                    )}

                    {/* Gradient Overlay for high text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                    {/* Top-Left Featured Badge */}
                    {property.isFeatured && (
                      <div className="absolute top-2.5 left-2.5 bg-amber-500 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md z-10 border border-amber-400/30">
                        <Sparkles className="w-3 h-3 fill-white" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Top-Right Availability Badge (Separated on opposite corner) */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-bold px-2.5 py-0.5 backdrop-blur-md shadow-xs ${
                          isAvailable
                            ? 'bg-emerald-500/80 text-white border-emerald-400/30'
                            : 'bg-rose-500/80 text-white border-rose-400/30'
                        }`}
                      >
                        {isAvailable ? 'Available' : 'Rented'}
                      </Badge>
                    </div>

                    {/* Bottom-Right Price Tag Overlay */}
                    <div className="absolute bottom-2.5 right-2.5 bg-background/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-black text-emerald-600 dark:text-emerald-400 border border-border/60 shadow-md z-10">
                      {formatCurrency(property.price)}
                      <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                    <div>
                      <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                        {categoryName}
                      </div>
                      <h4 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {property.title}
                      </h4>
                      {property.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1 line-clamp-1">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span>{property.location}</span>
                        </p>
                      )}
                    </div>

                    {/* Features Row */}
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground pt-2.5 border-t border-border/40">
                      {property.bedrooms !== undefined && (
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{property.bedrooms} Beds</span>
                        </div>
                      )}
                      {property.bathrooms !== undefined && (
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons Row with ample spacing */}
                    <div className="flex items-center justify-between gap-2.5 pt-2.5 border-t border-border/40">
                      <Link href={`/dashboard/landlord/properties/${property.id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full h-8 text-xs font-semibold gap-1 rounded-xl">
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Button>
                      </Link>
                      <Link href={`/properties/${property.id}`} className="flex-1">
                        <Button size="sm" variant="ghost" className="w-full h-8 text-xs font-semibold text-primary hover:bg-primary/10 gap-1 rounded-xl">
                          <span>View</span>
                          <ExternalLink className="w-3.5 h-3.5" />
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
