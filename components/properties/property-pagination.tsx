'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PropertyPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PropertyPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 pb-4 border-t border-slate-200/60 dark:border-slate-800/60 mt-10">
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium order-2 sm:order-1">
        Showing page{' '}
        <span className="font-extrabold text-slate-900 dark:text-white">
          {currentPage}
        </span>{' '}
        of{' '}
        <span className="font-extrabold text-slate-900 dark:text-white">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-2xl h-10 px-4 gap-1 border-slate-200 dark:border-slate-800 text-xs font-semibold cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <motion.div key={page} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={currentPage === page ? 'default' : 'ghost'}
                size="icon-sm"
                onClick={() => onPageChange(page)}
                className={`rounded-xl h-10 w-10 text-xs font-bold cursor-pointer transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </Button>
            </motion.div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-2xl h-10 px-4 gap-1 border-slate-200 dark:border-slate-800 text-xs font-semibold cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
        >
          <span>Next</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
