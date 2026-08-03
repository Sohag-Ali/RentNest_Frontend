'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcwIcon, SearchXIcon, SparklesIcon } from 'lucide-react';

interface PropertyEmptyStateProps {
  onReset: () => void;
}

export function PropertyEmptyState({ onReset }: PropertyEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center text-center p-8 sm:p-14 my-6 rounded-3xl border border-dashed border-slate-300/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-blue-500/5 relative overflow-hidden"
    >
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-[#2563EB] animate-pulse border border-blue-200/60 dark:border-blue-800/60">
          <SearchXIcon className="h-12 w-12 sm:h-14 sm:w-14 stroke-[1.5]" />
        </div>
        <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-2 shadow-md">
          <SparklesIcon className="h-4 w-4" />
        </div>
      </div>

      <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
        No Matching Properties Found
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mt-2 leading-relaxed">
        We couldn&apos;t find any rental listings matching your current filter criteria. Try adjusting your search keyword, price range, or amenities.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Button
          onClick={onReset}
          className="rounded-2xl h-12 px-7 font-semibold text-sm gap-2.5 bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] hover:from-blue-700 hover:to-teal-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
        >
          <RotateCcwIcon className="h-4 w-4" />
          Reset All Filters
        </Button>
      </div>
    </motion.div>
  );
}
