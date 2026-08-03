'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Property } from '@/types/property';
import { PropertyHeroGallery } from '@/components/property-details/property-hero-gallery';
import { PropertyQuickInfo } from '@/components/property-details/property-quick-info';
import { PropertyLandlordCard } from '@/components/property-details/property-landlord-card';
import { PropertyOverviewTable } from '@/components/property-details/property-overview-table';
import { PropertyBookingSidebar } from '@/components/property-details/property-booking-sidebar';
import { SimilarProperties } from '@/components/property-details/similar-properties';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPinIcon,
  StarIcon,
  SparklesIcon,
  WifiIcon,
  TvIcon,
  CarIcon,
  ShieldCheckIcon,
  WavesIcon,
  DumbbellIcon,
  ChevronLeftIcon,
} from 'lucide-react';

interface PropertyDetailsContentProps {
  property: Property;
  allProperties: Property[];
  isLoggedIn?: boolean;
}

export function PropertyDetailsContent({
  property,
  allProperties,
  isLoggedIn = false,
}: PropertyDetailsContentProps) {
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);

  const amenityIcons: Record<string, React.ReactNode> = {
    'High-Speed Wi-Fi': <WifiIcon className="h-5 w-5 text-[#2563EB]" />,
    'Private Pool': <WavesIcon className="h-5 w-5 text-[#0EA5E9]" />,
    'Gym & Fitness Center': <DumbbellIcon className="h-5 w-5 text-[#14B8A6]" />,
    '24/7 Security': <ShieldCheckIcon className="h-5 w-5 text-[#2563EB]" />,
    'EV Charging': <CarIcon className="h-5 w-5 text-[#0EA5E9]" />,
    'Air Conditioning': <TvIcon className="h-5 w-5 text-[#14B8A6]" />,
  };

  const shortDescription = property.description;
  const fullDescription = property.detailedDescription || property.description;
  const hasExtendedDescription =
    fullDescription.length > shortDescription.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50/60 via-slate-100/50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Navigation link back to listings */}
      <div className="flex items-center justify-between">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-sky-400 transition-colors bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 px-4 py-2 rounded-2xl shadow-xs"
        >
          <ChevronLeftIcon className="h-4 w-4 text-[#2563EB]" />
          <span>Back to Properties Listing</span>
        </Link>
      </div>

      {/* Property Image Gallery */}
      <PropertyHeroGallery property={property} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          {/* Header Title & Location */}
          <div className="space-y-3 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-2.5">
              <Badge
                variant="outline"
                className="text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-sky-400 border-blue-200/80 dark:border-blue-800/80 rounded-full px-3 py-1"
              >
                {typeof property.category === 'object'
                  ? (property.category as any)?.name || 'Apartment'
                  : property.category}
              </Badge>
              <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full text-amber-600 dark:text-amber-400 text-xs font-extrabold border border-amber-500/20">
                <StarIcon className="h-3.5 w-3.5 fill-current text-amber-500" />
                <span>{property.rating}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  ({property.reviewCount} reviews)
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading leading-tight">
              {property.title}
            </h1>

            <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-semibold">
              <MapPinIcon className="h-4.5 w-4.5 text-[#2563EB] shrink-0" />
              {property.location}
            </p>
          </div>

          {/* Quick Info Specs */}
          <PropertyQuickInfo property={property} />

          {/* About Section */}
          <Card className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
              About This Residence
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {showFullDesc ? fullDescription : shortDescription}
            </p>

            {hasExtendedDescription && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-xs font-bold text-[#2563EB] hover:text-blue-700 p-0 h-auto cursor-pointer"
              >
                {showFullDesc ? 'Show Less' : 'Read Full Description...'}
              </Button>
            )}
          </Card>

          {/* Amenities Section */}
          <Card className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 space-y-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <SparklesIcon className="h-4 w-4 fill-amber-500" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                Features & Amenities
              </h3>
            </div>

            {property.amenities.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {property.amenities.map((amenity) => (
                  <motion.div
                    key={amenity}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-[#2563EB]/40 transition-colors"
                  >
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 shrink-0 shadow-xs">
                      {amenityIcons[amenity] || (
                        <SparklesIcon className="h-4 w-4 text-[#2563EB]" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                      {amenity}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No amenities listed for this property.
              </p>
            )}
          </Card>

          {/* Landlord Card */}
          {property.landlord && (
            <PropertyLandlordCard landlord={property.landlord} />
          )}

          {/* Overview Table */}
          {property.overview && (
            <PropertyOverviewTable overview={property.overview} />
          )}
        </div>

        {/* Sticky Booking Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <PropertyBookingSidebar
            property={property}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>

      {/* Similar Properties Section */}
      <SimilarProperties
        currentPropertyId={(property as any)._id || property.id}
        properties={allProperties}
      />
    </main>
  );
}
