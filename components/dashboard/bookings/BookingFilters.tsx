"use client";

import React, { useEffect, useState } from "react";
import { RotateCcw, Building2, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { categoryService } from "@/services/category.service";
import { cityService } from "@/services/city.service";
import { Category } from "@/types/category";
import { CityData } from "@/types/city";

interface BookingFiltersProps {
  category: string;
  onCategoryChange: (val: string) => void;
  city: string;
  onCityChange: (val: string) => void;
  paymentStatus: string;
  onPaymentStatusChange: (val: string) => void;
  startDate: string;
  onStartDateChange: (val: string) => void;
  endDate: string;
  onEndDateChange: (val: string) => void;
  onReset: () => void;
}

export function BookingFilters({
  category,
  onCategoryChange,
  city,
  onCityChange,
  paymentStatus,
  onPaymentStatusChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onReset,
}: BookingFiltersProps) {
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [citiesList, setCitiesList] = useState<string[]>([]);

  useEffect(() => {
    async function loadFilterOptions() {
      try {
        const [cats, cts] = await Promise.all([
          categoryService.getCategories().catch(() => []),
          cityService.getCities().catch(() => []),
        ]);

        if (Array.isArray(cats) && cats.length > 0) {
          const names = cats
            .map((c: any) => (typeof c === "string" ? c : c?.name))
            .filter((n: string | undefined): n is string => Boolean(n));
          if (names.length > 0) setCategoriesList(names);
        }

        if (Array.isArray(cts) && cts.length > 0) {
          const cNames = cts
            .map((ct: any) => (typeof ct === "string" ? ct : ct?.city || ct?.name))
            .filter((n: string | undefined): n is string => Boolean(n));
          if (cNames.length > 0) setCitiesList(cNames);
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic filter options", err);
      }
    }

    loadFilterOptions();
  }, []);

  const hasActiveFilters =
    Boolean(category && category !== "ALL") ||
    Boolean(city && city !== "ALL") ||
    Boolean(paymentStatus && paymentStatus !== "ALL") ||
    Boolean(startDate) ||
    Boolean(endDate);

  const defaultCategories = ["Apartment", "House", "Villa", "Studio", "Commercial", "Penthouse"];
  const displayCategories = categoriesList.length > 0 ? categoriesList : defaultCategories;

  const defaultCities = ["New York", "Los Angeles", "Chicago", "Miami", "San Francisco", "Austin"];
  const displayCities = citiesList.length > 0 ? citiesList : defaultCities;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category Filter */}
      <div className="min-w-[150px] flex-1 sm:flex-none">
        <Select
          value={category || "ALL"}
          onChange={(e) => onCategoryChange(e.target.value === "ALL" ? "" : e.target.value)}
          icon={<Building2 className="h-4 w-4 text-primary" />}
          className="h-10 text-xs font-semibold rounded-2xl"
        >
          <option value="ALL">All Categories</option>
          {displayCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>

      {/* City Filter */}
      <div className="min-w-[140px] flex-1 sm:flex-none">
        <Select
          value={city || "ALL"}
          onChange={(e) => onCityChange(e.target.value === "ALL" ? "" : e.target.value)}
          icon={<MapPin className="h-4 w-4 text-teal-500" />}
          className="h-10 text-xs font-semibold rounded-2xl"
        >
          <option value="ALL">All Cities</option>
          {displayCities.map((ct) => (
            <option key={ct} value={ct}>
              {ct}
            </option>
          ))}
        </Select>
      </div>

      {/* Payment Status Filter */}
      <div className="min-w-[150px] flex-1 sm:flex-none">
        <Select
          value={paymentStatus || "ALL"}
          onChange={(e) => onPaymentStatusChange(e.target.value === "ALL" ? "" : e.target.value)}
          icon={<CreditCard className="h-4 w-4 text-sky-500" />}
          className="h-10 text-xs font-semibold rounded-2xl"
        >
          <option value="ALL">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </Select>
      </div>

      {/* Date Range Start & End */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="h-10 text-xs rounded-2xl bg-card/80 dark:bg-card/40 border-border/60 px-3 w-[135px] font-medium shadow-xs"
          title="Move-In Start Date"
        />
        <span className="text-xs text-muted-foreground hidden sm:inline">-</span>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="h-10 text-xs rounded-2xl bg-card/80 dark:bg-card/40 border-border/60 px-3 w-[135px] font-medium shadow-xs"
          title="Move-In End Date"
        />
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button
          type="button"
          onClick={onReset}
          variant="ghost"
          className="h-10 px-3 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-2xl gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </Button>
      )}
    </div>
  );
}
