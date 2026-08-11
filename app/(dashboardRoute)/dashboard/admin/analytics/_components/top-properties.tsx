'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TopProperty } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Trophy,
  MapPin,
  Heart,
  FileText,
  Star,
  Building,
  LayoutGrid,
  List,
} from 'lucide-react';

interface TopPropertiesProps {
  data: TopProperty[];
}

export function TopProperties({ data }: TopPropertiesProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Show top 6 properties
  const displayData = Array.isArray(data) ? data.slice(0, 6) : [];
  const hasData = displayData.length > 0;

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
            <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
            <span>Top Performing Properties</span>
          </CardTitle>
          {hasData && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
                Showing top {displayData.length} listings
              </span>
              {/* View Toggle */}
              <div className="inline-flex rounded-xl bg-muted/80 p-0.5 border border-border/50">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-background text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-background text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Listings with highest tenant engagement, wishlists, and rental inquiries
        </p>
      </CardHeader>

      <CardContent className="pt-5">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[220px] text-center text-muted-foreground">
            <Trophy className="w-10 h-10 mb-2 opacity-30 text-muted-foreground" />
            <p className="text-sm font-medium">No property performance data available.</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Full Width 3-Column Grid Layout for 6 properties (3x2) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayData.map((property, index) => (
              <div
                key={property.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Image Banner */}
                <div className="relative w-full h-48 bg-muted overflow-hidden">
                  {property.mainImage ? (
                    <Image
                      src={property.mainImage}
                      alt={property.title || 'Top property'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Building className="w-10 h-10" />
                    </div>
                  )}

                  {/* Gradient Overlay for badges contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Top-Left Rank Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md font-black text-xs px-3 py-1 rounded-full flex items-center gap-1.5 z-10 border border-amber-400/30">
                    <Trophy className="w-3.5 h-3.5 fill-white" />
                    <span>#{index + 1}</span>
                  </div>

                  {/* Top-Right Star Rating Badge */}
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 border border-white/15 shadow-sm z-10">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{property.rating ? property.rating.toFixed(1) : 'N/A'}</span>
                  </div>

                  {/* Bottom Price Pill Overlay */}
                  <div className="absolute bottom-3 right-3 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-emerald-600 dark:text-emerald-400 border border-border/60 shadow-md z-10">
                    {formatCurrency(property.price)}
                    <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {property.title}
                    </h4>
                    {property.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1.5 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span>{property.location}</span>
                      </p>
                    )}
                  </div>

                  {/* Engagement Badges Row */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/40">
                    {/* Wishlists Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20 flex-1 justify-center">
                      <Heart className="w-3.5 h-3.5 fill-rose-500/30 shrink-0" />
                      <span>{property.wishlistCount}</span>
                      <span className="text-[11px] font-medium text-muted-foreground">Wishlists</span>
                    </div>

                    {/* Requests Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20 flex-1 justify-center">
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span>{property.rentalRequestCount}</span>
                      <span className="text-[11px] font-medium text-muted-foreground">Requests</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Full Width List View Layout */
          <div className="space-y-3">
            {displayData.map((property, index) => (
              <div
                key={property.id}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-2xl border border-border/60 bg-card hover:bg-muted/30 hover:border-primary/40 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
                  {/* Rank Badge */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-xs shrink-0 border border-amber-500/20">
                    #{index + 1}
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border/60 bg-muted">
                    {property.mainImage ? (
                      <Image
                        src={property.mainImage}
                        alt={property.title || 'Top property'}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Building className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Title & Info */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {property.title}
                    </h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 line-clamp-1">
                      <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                      <span>{property.location}</span>
                    </p>
                    <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                      {formatCurrency(property.price)}
                      <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                    </div>
                  </div>
                </div>

                {/* Performance Badges */}
                <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-border/40">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{property.rating ? property.rating.toFixed(1) : 'N/A'}</span>
                    <span className="text-[10px] font-normal text-muted-foreground hidden md:inline">Rating</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20">
                    <Heart className="w-3.5 h-3.5 fill-rose-500/30" />
                    <span>{property.wishlistCount}</span>
                    <span className="text-[10px] font-normal text-muted-foreground hidden md:inline">Wishlists</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{property.rentalRequestCount}</span>
                    <span className="text-[10px] font-normal text-muted-foreground hidden md:inline">Requests</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
