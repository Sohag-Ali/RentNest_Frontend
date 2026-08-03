"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface PropertyLocationProps {
  city: string;
  state: string;
  className?: string;
}

export function PropertyLocation({ city, state, className = "" }: PropertyLocationProps) {
  const locationText = [city, state].filter(Boolean).join(", ");

  return (
    <div className={`flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium ${className}`}>
      <MapPin className="w-4 h-4 text-rose-500 shrink-0 stroke-[2]" />
      <span className="truncate">{locationText || "Location Available"}</span>
    </div>
  );
}
