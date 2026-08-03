'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import {
  LayoutGridIcon,
  ListIcon,
  SparklesIcon,
  ArrowUpDownIcon,
  Building2Icon,
} from 'lucide-react';

interface PropertyHeaderProps {
  totalProperties: number;
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function PropertyHeader({
  totalProperties,
  viewMode,
  onViewChange,
  sortBy,
  onSortChange,
}: PropertyHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between pb-6 border-b border-slate-200/60 dark:border-slate-800/60 mb-8"
    >
      {/* Background Soft Radial Glow */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1 bg-blue-50/80 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/60 text-[#2563EB] dark:text-sky-400 font-semibold text-xs rounded-full shadow-xs backdrop-blur-md"
          >
            <SparklesIcon className="h-3.5 w-3.5 text-[#2563EB] dark:text-sky-400" />
            Curated Living Spaces
          </Badge>
          <Badge
            variant="secondary"
            className="font-bold text-xs rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5"
          >
            <Building2Icon className="h-3.5 w-3.5 text-teal-500" />
            <span>{totalProperties} Properties Available</span>
          </Badge>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl font-heading text-slate-900 dark:text-white leading-tight">
          Explore{' '}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] bg-clip-text text-transparent">
            Exclusive Rentals
          </span>
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Discover high-end luxury villas, urban penthouses, and seaside sanctuaries with instant availability and verified landlord credentials.
        </p>
      </div>

      {/* Header Action Controls */}
      <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
        {/* Sort Select */}
        <div className="w-48 sm:w-56">
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            icon={<ArrowUpDownIcon className="h-4 w-4 text-[#2563EB]" />}
            className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xs text-xs font-semibold h-11 text-slate-800 dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Listed</option>
          </Select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-2xl bg-white/80 dark:bg-slate-900/80 p-1 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xs">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => onViewChange('grid')}
            className={`rounded-xl transition-all h-9 w-9 cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            aria-label="Grid View"
          >
            <LayoutGridIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => onViewChange('list')}
            className={`rounded-xl transition-all h-9 w-9 cursor-pointer ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            aria-label="List View"
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
