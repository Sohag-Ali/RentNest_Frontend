"use client";

import React from "react";
import { Bed, Bath, Maximize2, Star, Heart, MessageSquare } from "lucide-react";

interface PropertyStatsProps {
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  rating?: number;
  averageRating?: number;
  reviewCount?: number;
  reviewsCount?: number;
  wishlistCount?: number;
  className?: string;
}

export function PropertyStats({
  bedrooms,
  bathrooms,
  areaSqFt,
  rating,
  averageRating,
  reviewCount,
  reviewsCount,
  wishlistCount,
  className = "",
}: PropertyStatsProps) {
  const displayRating = averageRating ?? rating ?? 4.8;
  const displayReviews = reviewCount ?? reviewsCount ?? 0;
  const displayWishlist = wishlistCount ?? 0;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Primary Specifications Bar: Beds, Baths, Area */}
      <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <div className="flex items-center justify-center gap-1.5" title={`${bedrooms} Bedrooms`}>
          <Bed className="w-4 h-4 text-[#2563EB] dark:text-sky-400 stroke-[2]" />
          <span>{bedrooms} Beds</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 border-x border-slate-200 dark:border-slate-700/70" title={`${bathrooms} Bathrooms`}>
          <Bath className="w-4 h-4 text-[#14B8A6] dark:text-teal-400 stroke-[2]" />
          <span>{bathrooms} Baths</span>
        </div>
        <div className="flex items-center justify-center gap-1.5" title={`${areaSqFt} Square Feet`}>
          <Maximize2 className="w-4 h-4 text-[#0EA5E9] dark:text-sky-400 stroke-[2]" />
          <span>{areaSqFt.toLocaleString()} SqFt</span>
        </div>
      </div>

      {/* Social proof & Ratings row */}
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
        {/* Rating */}
        <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{Number(displayRating).toFixed(1)}</span>
          <span className="font-normal text-slate-500 dark:text-slate-400">
            ({displayReviews} {displayReviews === 1 ? "review" : "reviews"})
          </span>
        </div>

        {/* Wishlist & Reviews indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400" title={`${displayWishlist} saved`}>
            <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-500" />
            <span>{displayWishlist}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400" title={`${displayReviews} comments`}>
            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
            <span>{displayReviews}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
