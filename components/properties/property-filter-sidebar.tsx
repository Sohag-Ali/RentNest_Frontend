'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CATEGORIES, CITIES, AMENITIES_LIST } from '@/types/property';
import {
  SlidersHorizontalIcon,
  RotateCcwIcon,
  StarIcon,
  SparklesIcon,
  CheckCircle2Icon,
  Building2Icon,
  MapPinIcon,
  DollarSignIcon,
  BedIcon,
  BathIcon,
  ShieldCheckIcon,
} from 'lucide-react';

export interface FilterState {
  category: string;
  city: string;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  selectedAmenities: string[];
  availableOnly: boolean;
  featuredOnly: boolean;
  minRating: number;
}

interface PropertyFilterSidebarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
}

export function PropertyFilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  activeFiltersCount,
}: PropertyFilterSidebarProps) {
  const toggleAmenity = (amenity: string) => {
    if (filters.selectedAmenities.includes(amenity)) {
      onFilterChange(
        'selectedAmenities',
        filters.selectedAmenities.filter((a) => a !== amenity)
      );
    } else {
      onFilterChange('selectedAmenities', [
        ...filters.selectedAmenities,
        amenity,
      ]);
    }
  };

  return (
    <Card className="w-full rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl shadow-blue-500/5 sticky top-24 overflow-hidden">
      {/* Sidebar Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#2563EB]">
            <SlidersHorizontalIcon className="h-4 w-4" />
          </div>
          <CardTitle className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Filter Properties
          </CardTitle>
        </div>
        {activeFiltersCount > 0 && (
          <span className="flex h-6 px-3 text-xs font-bold rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-sky-400 items-center justify-center border border-blue-200/60 dark:border-blue-800/60">
            {activeFiltersCount} Active
          </span>
        )}
      </CardHeader>

      <CardContent className="space-y-6 pt-5 max-h-[calc(100vh-220px)] overflow-y-auto pr-3">
        {/* Category Filter */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <Building2Icon className="h-3.5 w-3.5 text-[#2563EB]" /> Category
          </Label>
          <Select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="rounded-2xl h-11 text-xs bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat === 'All' ? '' : cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </Select>
        </div>

        <Separator className="bg-slate-200/60 dark:bg-slate-800/60" />

        {/* City Filter */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5 text-[#0EA5E9]" /> City
          </Label>
          <Select
            value={filters.city}
            onChange={(e) => onFilterChange('city', e.target.value)}
            className="rounded-2xl h-11 text-xs bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            {CITIES.map((city) => (
              <option key={city} value={city === 'All' ? '' : city}>
                {city === 'All' ? 'All Cities' : city}
              </option>
            ))}
          </Select>
        </div>

        <Separator className="bg-slate-200/60 dark:bg-slate-800/60" />

        {/* Price Range Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
              <DollarSignIcon className="h-3.5 w-3.5 text-[#14B8A6]" /> Max Price
            </Label>
            <span className="text-sm font-extrabold text-[#2563EB] dark:text-sky-400 font-mono">
              ${filters.maxPrice.toLocaleString()} / mo
            </span>
          </div>
          <Slider
            min={2000}
            max={100000}
            step={1000}
            value={filters.maxPrice}
            onValueChange={(val) => onFilterChange('maxPrice', val)}
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>$2,000</span>
            <span>$50,000</span>
            <span>$100k+</span>
          </div>
        </div>

        <Separator className="bg-slate-200/60 dark:bg-slate-800/60" />

        {/* Bedrooms Pill Selector */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <BedIcon className="h-3.5 w-3.5 text-[#2563EB]" /> Bedrooms
          </Label>
          <div className="flex gap-1.5 flex-wrap">
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <motion.button
                key={num}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFilterChange('bedrooms', num)}
                className={`h-9 min-w-9 px-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  filters.bedrooms === num
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white border-transparent shadow-md shadow-blue-500/20'
                    : 'bg-slate-50/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {num === 0 ? 'Any' : `${num}+`}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bathrooms Pill Selector */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <BathIcon className="h-3.5 w-3.5 text-[#0EA5E9]" /> Bathrooms
          </Label>
          <div className="flex gap-1.5 flex-wrap">
            {[0, 1, 2, 3, 4].map((num) => (
              <motion.button
                key={num}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFilterChange('bathrooms', num)}
                className={`h-9 min-w-9 px-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  filters.bathrooms === num
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white border-transparent shadow-md shadow-blue-500/20'
                    : 'bg-slate-50/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {num === 0 ? 'Any' : `${num}+`}
              </motion.button>
            ))}
          </div>
        </div>

        <Separator className="bg-slate-200/60 dark:bg-slate-800/60" />

        {/* Switches */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-800 dark:text-slate-200">
                <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-500" />
                Available Now Only
              </Label>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Show units ready for move-in
              </p>
            </div>
            <Switch
              checked={filters.availableOnly}
              onCheckedChange={(checked) =>
                onFilterChange('availableOnly', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-800 dark:text-slate-200">
                <SparklesIcon className="h-3.5 w-3.5 text-amber-500" />
                Featured Listings
              </Label>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Top-tier luxury verified homes
              </p>
            </div>
            <Switch
              checked={filters.featuredOnly}
              onCheckedChange={(checked) =>
                onFilterChange('featuredOnly', checked)
              }
            />
          </div>
        </div>

        <Separator className="bg-slate-200/60 dark:bg-slate-800/60" />

        {/* Minimum Rating */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <StarIcon className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> Minimum Rating
          </Label>
          <div className="flex gap-2">
            {[0, 4.0, 4.5, 4.8].map((rating) => (
              <motion.button
                key={rating}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onFilterChange('minRating', rating)}
                className={`flex-1 h-9 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                  filters.minRating === rating
                    ? 'bg-amber-500 text-white border-transparent shadow-md shadow-amber-500/20'
                    : 'bg-slate-50/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {rating === 0 ? (
                  'Any'
                ) : (
                  <>
                    <span>{rating}</span>
                    <StarIcon className="h-3 w-3 fill-current" />
                  </>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <Separator className="bg-slate-200/60 dark:bg-slate-800/60" />

        {/* Amenities Checkboxes */}
        <div className="space-y-3">
          <Label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <ShieldCheckIcon className="h-3.5 w-3.5 text-[#14B8A6]" /> Amenities
          </Label>
          <div className="grid grid-cols-1 gap-2.5">
            {AMENITIES_LIST.map((amenity) => {
              const isChecked = filters.selectedAmenities.includes(amenity);
              return (
                <div key={amenity} className="flex items-center space-x-2.5">
                  <Checkbox
                    id={`sidebar-amenity-${amenity}`}
                    checked={isChecked}
                    onCheckedChange={() => toggleAmenity(amenity)}
                    className="rounded-lg border-slate-300 dark:border-slate-700 data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB]"
                  />
                  <label
                    htmlFor={`sidebar-amenity-${amenity}`}
                    className="text-xs font-medium leading-none cursor-pointer select-none text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {amenity}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 pb-5 border-t border-slate-200/60 dark:border-slate-800/60">
        <Button
          variant="outline"
          onClick={onResetFilters}
          className="w-full rounded-2xl h-11 gap-2 border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 hover:border-rose-300 transition-all cursor-pointer"
        >
          <RotateCcwIcon className="h-3.5 w-3.5" />
          Reset All Filters
        </Button>
      </CardFooter>
    </Card>
  );
}
