'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  HeartIcon,
  MapPinIcon,
  BedIcon,
  BathIcon,
  SquareIcon,
  StarIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export function PropertyCard({
  property,
  viewMode = 'grid',
}: PropertyCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const propertyId = (property as any)._id || property.id || '';

  const categoryName =
    typeof property.category === 'object'
      ? (property.category as any)?.name || 'Apartment'
      : property.category || 'Apartment';

  // -------------------------------------------------------------
  // LIST VIEW LAYOUT
  // -------------------------------------------------------------
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group relative flex flex-col md:flex-row rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-3.5 sm:p-5 gap-4 md:gap-6 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-500/40 transition-all duration-300 overflow-hidden"
      >
        {/* Main Property Image Container */}
        <div className="relative w-full md:w-72 lg:w-80 h-56 md:h-auto rounded-2xl overflow-hidden shrink-0">
          <Image
            src={property.mainImage || '/placeholder.jpg'}
            alt={property.title || 'Property Image'}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Badges Top Left */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.isFeatured && (
              <Badge
                variant="outline"
                className="gap-1 px-2.5 py-0.5 text-[11px] font-bold bg-amber-500/90 text-white border-amber-400/40 backdrop-blur-md shadow-sm"
              >
                <SparklesIcon className="h-3 w-3 text-amber-200 fill-amber-200" />
                Featured
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-[11px] font-semibold bg-slate-900/60 backdrop-blur-md text-white border-white/20"
            >
              {categoryName}
            </Badge>
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-all z-10 cursor-pointer"
            aria-label="Save to Wishlist"
          >
            <HeartIcon
              className={`h-4 w-4 transition-transform ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          </motion.button>

          {/* Price Tag on Mobile Overlay */}
          <div className="absolute bottom-3 left-3 md:hidden z-10">
            <span className="text-xl font-extrabold text-white font-mono drop-shadow-md">
              ${property.price ? property.price.toLocaleString() : 0}
            </span>
            <span className="text-xs text-white/80 font-normal"> / mo</span>
          </div>
        </div>

        {/* Details Column */}
        <div className="flex flex-col justify-between flex-1 py-1 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded-xl text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                  <StarIcon className="h-3.5 w-3.5 fill-current" />
                  <span>{property.rating ?? 0}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  ({property.reviewCount ?? 0} reviews)
                </span>
              </div>
              {property.isAvailable ? (
                <Badge
                  variant="outline"
                  className="gap-1 text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                >
                  <CheckCircle2Icon className="h-3 w-3" />
                  Available Now
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="gap-1 text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                >
                  <XCircleIcon className="h-3 w-3" />
                  Not Available
                </Badge>
              )}
            </div>

            <Link href={`/properties/${propertyId}`} className="group/title block">
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover/title:text-[#2563EB] transition-colors line-clamp-1">
                {property.title}
              </h3>
            </Link>
            <p className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
              <MapPinIcon className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
              {property.location}
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed hidden sm:block">
              {property.description}
            </p>
          </div>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-1.5">
              <BedIcon className="h-4 w-4 text-[#2563EB] shrink-0" />
              <span>{property.bedrooms ?? 0} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BathIcon className="h-4 w-4 text-[#0EA5E9] shrink-0" />
              <span>{property.bathrooms ?? 0} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <SquareIcon className="h-3.5 w-3.5 text-[#14B8A6] shrink-0" />
              <span>
                {property.areaSqFt ? property.areaSqFt.toLocaleString() : 0} sqft
              </span>
            </div>
          </div>

          {/* Landlord Info, Price, and Details Button */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                <AvatarImage
                  src={property.landlord?.avatar || ''}
                  alt={property.landlord?.name || 'Landlord'}
                />
                <AvatarFallback className="bg-slate-800 text-white font-bold text-xs">
                  {property.landlord?.name ? property.landlord.name[0] : 'L'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {property.landlord?.name || 'Host'}
                </p>
                {property.landlord?.isSuperhost && (
                  <p className="text-[10px] text-amber-500 font-semibold">Superhost</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  ${property.price ? property.price.toLocaleString() : 0}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> / mo</span>
              </div>

              <Link href={`/properties/${propertyId}`}>
                <Button
                  size="sm"
                  className="rounded-2xl px-5 h-10 gap-2 bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] hover:from-blue-700 hover:to-teal-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  <span>View Details</span>
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // -------------------------------------------------------------
  // GRID VIEW LAYOUT (Default)
  // -------------------------------------------------------------
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-500/40 transition-all duration-500"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={property.mainImage || '/placeholder.jpg'}
          alt={property.title || 'Property Image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {property.isFeatured && (
            <Badge
              variant="outline"
              className="gap-1 px-2.5 py-0.5 text-[11px] font-bold bg-amber-500/90 text-white border-amber-400/40 backdrop-blur-md shadow-sm"
            >
              <SparklesIcon className="h-3 w-3 text-amber-200 fill-amber-200" />
              Featured
            </Badge>
          )}
          <Badge
            variant="outline"
            className="text-[11px] font-semibold bg-slate-900/60 backdrop-blur-md text-white border-white/20"
          >
            {categoryName}
          </Badge>
        </div>

        {/* Wishlist Button Top Right */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-all z-10 cursor-pointer"
          aria-label="Save to Wishlist"
        >
          <HeartIcon
            className={`h-4 w-4 transition-transform ${
              isWishlisted ? 'fill-rose-500 text-rose-500' : ''
            }`}
          />
        </motion.button>

        {/* Availability Badge Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10">
          {property.isAvailable ? (
            <Badge
              variant="outline"
              className="gap-1 text-[11px] font-bold bg-emerald-500/80 backdrop-blur-md text-white border-emerald-400/40 shadow-xs"
            >
              <CheckCircle2Icon className="h-3 w-3" />
              Available Now
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="gap-1 text-[11px] font-bold bg-rose-500/80 backdrop-blur-md text-white border-rose-400/40"
            >
              <XCircleIcon className="h-3 w-3" />
              Not Available
            </Badge>
          )}
        </div>

        {/* Rating Badge Bottom Right */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-xl text-white text-xs font-extrabold border border-white/15">
          <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{property.rating ?? 0}</span>
          <span className="text-[10px] text-white/70 font-normal">
            ({property.reviewCount ?? 0})
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div>
          <Link href={`/properties/${propertyId}`} className="group/title block">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover/title:text-[#2563EB] transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>
          <p className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
            <MapPinIcon className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
            {property.location}
          </p>
        </div>

        {/* Key Specs Row */}
        <div className="grid grid-cols-3 gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200 text-center">
          <div className="flex items-center justify-center gap-1">
            <BedIcon className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
            <span>{property.bedrooms ?? 0} Beds</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <BathIcon className="h-3.5 w-3.5 text-[#0EA5E9] shrink-0" />
            <span>{property.bathrooms ?? 0} Baths</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <SquareIcon className="h-3 w-3 text-[#14B8A6] shrink-0" />
            <span>{property.areaSqFt ?? 0} sqft</span>
          </div>
        </div>

        {/* Amenities Pills */}
        <div className="flex flex-wrap gap-1">
          {Array.isArray(property.amenities) &&
            property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-[10px] px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-sky-400 font-semibold border border-blue-200/50 dark:border-blue-800/50"
              >
                {amenity}
              </span>
            ))}
          {Array.isArray(property.amenities) &&
            property.amenities.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                +{property.amenities.length - 3} more
              </span>
            )}
        </div>

        {/* Landlord Info and Price Footer */}
        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
              <AvatarImage
                src={property.landlord?.avatar || ''}
                alt={property.landlord?.name || 'Landlord'}
              />
              <AvatarFallback className="bg-slate-800 text-white font-bold text-xs">
                {property.landlord?.name ? property.landlord.name[0] : 'L'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight line-clamp-1">
                {property.landlord?.name || 'Host'}
              </p>
              {property.landlord?.isSuperhost && (
                <p className="text-[10px] text-amber-500 font-semibold">Superhost</p>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-baseline gap-0.5 justify-end">
              <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                ${property.price ? property.price.toLocaleString() : 0}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">/mo</span>
            </div>
          </div>
        </div>

        {/* Details Button */}
        <Link href={`/properties/${propertyId}`} className="block w-full mt-1">
          <Button className="w-full rounded-2xl h-11 gap-2 bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] hover:from-blue-700 hover:to-teal-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center">
            <span>View Details</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
