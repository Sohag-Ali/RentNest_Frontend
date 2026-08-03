'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CATEGORIES, CITIES } from '@/types/property';
import {
  SearchIcon,
  MapPinIcon,
  HomeIcon,
  DollarSignIcon,
  BedIcon,
  BathIcon,
  CalendarIcon,
  RotateCcwIcon,
  FilterIcon,
} from 'lucide-react';

export interface SearchState {
  keyword: string;
  location: string;
  category: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
  availability: string;
}

interface PropertySearchProps {
  searchState: SearchState;
  onSearchChange: (field: keyof SearchState, value: string) => void;
  onReset: () => void;
  onApplySearch: () => void;
}

export function PropertySearch({
  searchState,
  onSearchChange,
  onReset,
  onApplySearch,
}: PropertySearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      className="w-full rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 p-5 md:p-7 shadow-2xl shadow-blue-500/5 transition-all mb-8 relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {/* Search Input Keyword */}
        <div className="space-y-1.5 col-span-1 sm:col-span-2 lg:col-span-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
            Search Keyword
          </label>
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-[#2563EB]" />
            <Input
              placeholder="Penthouse, Villa, Soho..."
              value={searchState.keyword}
              onChange={(e) => onSearchChange('keyword', e.target.value)}
              className="pl-10 h-12 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:border-transparent transition-all duration-300 text-sm shadow-inner"
            />
          </div>
        </div>

        {/* Location Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
            Location
          </label>
          <Select
            value={searchState.location}
            onChange={(e) => onSearchChange('location', e.target.value)}
            icon={<MapPinIcon className="h-4 w-4 text-[#0EA5E9]" />}
            className="h-12 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#2563EB] text-sm shadow-inner"
          >
            {CITIES.map((city) => (
              <option key={city} value={city === 'All' ? '' : city}>
                {city === 'All' ? 'All Locations' : city}
              </option>
            ))}
          </Select>
        </div>

        {/* Category Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
            Property Category
          </label>
          <Select
            value={searchState.category}
            onChange={(e) => onSearchChange('category', e.target.value)}
            icon={<HomeIcon className="h-4 w-4 text-[#14B8A6]" />}
            className="h-12 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#2563EB] text-sm shadow-inner"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat === 'All' ? '' : cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
            Max Price
          </label>
          <Select
            value={searchState.priceRange}
            onChange={(e) => onSearchChange('priceRange', e.target.value)}
            icon={<DollarSignIcon className="h-4 w-4 text-[#2563EB]" />}
            className="h-12 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#2563EB] text-sm shadow-inner"
          >
            <option value="">Any Price</option>
            <option value="3000">Up to $3,000 / mo</option>
            <option value="5000">Up to $5,000 / mo</option>
            <option value="8000">Up to $8,000 / mo</option>
            <option value="12000">Up to $12,000+ / mo</option>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
            Bedrooms
          </label>
          <Select
            value={searchState.bedrooms}
            onChange={(e) => onSearchChange('bedrooms', e.target.value)}
            icon={<BedIcon className="h-4 w-4 text-[#0EA5E9]" />}
            className="h-12 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#2563EB] text-sm shadow-inner"
          >
            <option value="">Any Beds</option>
            <option value="1">1+ Bedrooms</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
            Bathrooms
          </label>
          <Select
            value={searchState.bathrooms}
            onChange={(e) => onSearchChange('bathrooms', e.target.value)}
            icon={<BathIcon className="h-4 w-4 text-[#14B8A6]" />}
            className="h-12 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#2563EB] text-sm shadow-inner"
          >
            <option value="">Any Baths</option>
            <option value="1">1+ Bathrooms</option>
            <option value="2">2+ Bathrooms</option>
            <option value="3">3+ Bathrooms</option>
            <option value="4">4+ Bathrooms</option>
          </Select>
        </div>

        {/* Availability */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
            Availability
          </label>
          <Select
            value={searchState.availability}
            onChange={(e) => onSearchChange('availability', e.target.value)}
            icon={<CalendarIcon className="h-4 w-4 text-[#2563EB]" />}
            className="h-12 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#2563EB] text-sm shadow-inner"
          >
            <option value="">Any Status</option>
            <option value="Immediate">Available Immediately</option>
            <option value="Next Month">Next Month</option>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-end gap-2 pt-1">
          <Button
            onClick={onApplySearch}
            className="h-12 flex-1 rounded-2xl font-semibold text-sm gap-2 bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] hover:from-blue-700 hover:to-teal-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <FilterIcon className="h-4 w-4" />
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            size="icon"
            className="h-12 w-12 rounded-2xl border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer transition-all"
            title="Reset Filters"
          >
            <RotateCcwIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
