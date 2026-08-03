'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Property } from '@/types/property';
import { PropertyCard } from './property-card';

interface PropertyGridProps {
  properties: Property[];
  viewMode: 'grid' | 'list';
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export function PropertyGrid({ properties, viewMode }: PropertyGridProps) {
  const list = Array.isArray(properties) ? properties : [];

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        {list.map((property) => {
          const propId = (property as any)._id || property.id;
          return (
            <motion.div key={propId} variants={itemVariants}>
              <PropertyCard property={property} viewMode="list" />
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {list.map((property) => {
        const propId = (property as any)._id || property.id;
        return (
          <motion.div key={propId} variants={itemVariants}>
            <PropertyCard property={property} viewMode="grid" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
