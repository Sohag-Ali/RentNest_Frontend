"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Landlord } from "@/types/property";

interface PropertyFooterProps {
  landlord?: Landlord;
  propertyId: string;
  isAvailable?: boolean;
  className?: string;
}

export function PropertyFooter({
  landlord,
  propertyId,
  isAvailable = true,
  className = "",
}: PropertyFooterProps) {
  const landlordName = landlord?.name || "Verified Landlord";
  const landlordAvatar = landlord?.image || landlord?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
  const isVerified = landlord?.isVerified ?? true; // Defaults to verified if true or unset for premium feel

  return (
    <div className={`flex items-center justify-between gap-3 pt-4 border-t border-slate-200/70 dark:border-slate-800/70 ${className}`}>
      {/* Landlord Information */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white dark:border-slate-700 shadow-xs">
          <Image
            src={landlordAvatar}
            alt={landlordName}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div className="truncate min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              {landlordName}
            </span>
            {isVerified && (
              <span title="Verified Landlord">
                <CheckCircle2 className="w-3.5 h-3.5 fill-[#2563EB] text-white shrink-0" />
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
            Property Host
          </span>
        </div>
      </div>

      {/* View Details Button */}
      {isAvailable ? (
        <Link
          href={`/properties/${propertyId}`}
          className="group/btn inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#0EA5E9] hover:from-blue-700 hover:to-sky-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 shrink-0 cursor-pointer active:scale-95"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      ) : (
        <button
          disabled
          aria-disabled="true"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs font-medium cursor-not-allowed shrink-0"
        >
          <span>Unavailable</span>
        </button>
      )}
    </div>
  );
}
