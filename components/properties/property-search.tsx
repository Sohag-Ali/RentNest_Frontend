'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  SearchIcon,
  DollarSignIcon,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end relative z-10">
        {/* 1. Search Input Keyword */}
        <div className="space-y-1.5">
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

        {/* 2. Max Price */}
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
            <option value="15000">Up to ৳15,000 / mo</option>
            <option value="30000">Up to ৳30,000 / mo</option>
            <option value="50000">Up to ৳50,000 / mo</option>
            <option value="100000">Up to ৳100,000+ / mo</option>
          </Select>
        </div>

        {/* 3. Availability */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
            Availability
          </label>
          <Select
            value={searchState.availability}
            onChange={(e) => onSearchChange('availability', e.target.value)}
            icon={<CalendarIcon className="h-4 w-4 text-[#0EA5E9]" />}
            className="h-12 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#2563EB] text-sm shadow-inner"
          >
            <option value="">Any Status</option>
            <option value="Immediate">Available Immediately</option>
            <option value="Next Month">Next Month</option>
          </Select>
        </div>

        {/* 4. Action Buttons */}
        <div className="flex items-center gap-2 pt-1 sm:pt-0">
          <Button
            onClick={onApplySearch}
            className="h-12 flex-1 rounded-2xl font-semibold text-sm gap-2 bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] hover:from-blue-700 hover:to-teal-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <FilterIcon className="h-4 w-4 text-white" />
            <span>Apply Filters</span>
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
