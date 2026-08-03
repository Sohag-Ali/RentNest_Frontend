'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Property } from '@/types/property';
import { BedIcon, BathIcon, SquareIcon, HomeIcon, CalendarIcon } from 'lucide-react';

interface PropertyQuickInfoProps {
  property: Property;
}

export function PropertyQuickInfo({ property }: PropertyQuickInfoProps) {
  const infoItems = [
    {
      icon: <BedIcon className="h-5 w-5 text-[#2563EB]" />,
      label: 'Bedrooms',
      value: `${property.bedrooms} Beds`,
      badgeBg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200/60 dark:border-blue-800/60',
    },
    {
      icon: <BathIcon className="h-5 w-5 text-[#0EA5E9]" />,
      label: 'Bathrooms',
      value: `${property.bathrooms} Baths`,
      badgeBg: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200/60 dark:border-sky-800/60',
    },
    {
      icon: <SquareIcon className="h-4.5 w-4.5 text-[#14B8A6]" />,
      label: 'Living Area',
      value: `${property.areaSqFt ? property.areaSqFt.toLocaleString() : 0} sqft`,
      badgeBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200/60 dark:border-teal-800/60',
    },
    {
      icon: <HomeIcon className="h-5 w-5 text-[#2563EB]" />,
      label: 'Property Type',
      value:
        typeof property.category === 'object'
          ? (property.category as any)?.name || 'Apartment'
          : property.category,
      badgeBg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200/60 dark:border-blue-800/60',
    },
    {
      icon: <CalendarIcon className="h-5 w-5 text-[#0EA5E9]" />,
      label: 'Move-in Status',
      value:
        property.overview?.availableFrom ||
        (property.isAvailable ? 'Immediate' : 'N/A'),
      badgeBg: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200/60 dark:border-sky-800/60',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 my-6">
      {infoItems.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center justify-center text-center p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg shadow-blue-500/5 hover:border-blue-500/40 transition-all"
        >
          <div className={`p-3 rounded-2xl border ${item.badgeBg} mb-2`}>
            {item.icon}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {item.label}
          </span>
          <span className="text-sm font-extrabold text-slate-900 dark:text-white font-heading mt-0.5">
            {item.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
