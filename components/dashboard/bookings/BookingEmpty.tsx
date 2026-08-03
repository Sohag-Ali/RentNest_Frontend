"use client";

import React from "react";
import Link from "next/link";
import { Building2, PlusCircle, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BookingEmptyProps {
  title?: string;
  description?: string;
  hasFilters?: boolean;
  onResetFilters?: () => void;
}

export function BookingEmpty({
  title = "No Rented Properties Yet",
  description = "You don't have any completed bookings or rented properties matching your search criteria.",
  hasFilters = false,
  onResetFilters,
}: BookingEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-3xl border border-dashed border-border/80 bg-card/40 backdrop-blur-xl shadow-xs my-6 space-y-6"
    >
      {/* Decorative Animated Graphic Icon */}
      <div className="relative">
        <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-blue-500/20 via-sky-500/10 to-teal-500/20 flex items-center justify-center border border-primary/20 shadow-lg">
          <Building2 className="h-12 w-12 text-primary stroke-[1.8]" />
        </div>
        <div className="absolute -bottom-2 -right-2 h-9 w-9 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-md">
          <Home className="h-5 w-5" />
        </div>
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-heading">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {hasFilters && onResetFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={onResetFilters}
            className="rounded-2xl text-xs font-semibold px-5 h-11 border-border/80 hover:bg-muted"
          >
            Clear Search & Filters
          </Button>
        )}

        <Button
          render={<Link href="/dashboard/landlord/properties" />}
          className="rounded-2xl text-xs font-bold px-6 h-11 bg-primary text-primary-foreground shadow-md hover:shadow-xl transition-all gap-2"
        >
          <span>View My Properties</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
