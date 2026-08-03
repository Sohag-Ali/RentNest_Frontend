"use client";

import React from "react";
import { Flame, MapPin } from "lucide-react";

interface CityBadgeProps {
  propertiesCount: number;
  cityName: string;
  className?: string;
}

export function CityBadge({ propertiesCount, cityName, className = "" }: CityBadgeProps) {
  const isPopular = propertiesCount >= 2;

  if (isPopular) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30 text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-md ${className}`}
      >
        <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
        <span>Popular City</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/30 dark:bg-slate-900/40 text-white border border-white/30 backdrop-blur-md shadow-sm ${className}`}
    >
      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
      <span>{cityName}</span>
    </div>
  );
}
