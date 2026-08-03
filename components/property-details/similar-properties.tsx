'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/properties/property-card';
import { SparklesIcon } from 'lucide-react';

interface SimilarPropertiesProps {
  currentPropertyId: string;
  properties: Property[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function SimilarProperties({
  currentPropertyId,
  properties,
}: SimilarPropertiesProps) {
  const similar = (Array.isArray(properties) ? properties : [])
    .filter((p) => {
      const pId = (p as any)._id || p.id;
      return pId !== currentPropertyId;
    })
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-slate-200/60 dark:border-slate-800/60 mt-12">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <SparklesIcon className="h-4 w-4 fill-amber-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
          Similar Luxury Properties
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {similar.map((property) => {
          const propId = (property as any)._id || property.id;
          return (
            <motion.div key={propId} variants={itemVariants}>
              <PropertyCard property={property} viewMode="grid" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
