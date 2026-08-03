"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Dog,
  ShieldCheck,
  Sun,
  Wind,
  LucideIcon,
} from "lucide-react";

export interface AmenityItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
}

const iconMap: Record<string, LucideIcon> = {
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Dog,
  ShieldCheck,
  Sun,
  Wind,
};

interface AmenityCardProps {
  amenity: AmenityItem;
  index: number;
}

export function AmenityCard({ amenity, index }: AmenityCardProps) {
  const IconComponent = iconMap[amenity.iconName] || Wifi;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className="group relative h-full rounded-3xl p-6 sm:p-7 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top subtle hover glow gradient */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/0 via-teal-500/0 to-sky-500/0 group-hover:from-blue-500/20 group-hover:via-teal-500/20 group-hover:to-sky-500/20 transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100" />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-start space-y-4">
        {/* Floating Icon Box */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.25,
          }}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${amenity.iconBg} shadow-inner transition-transform duration-300 group-hover:scale-110`}
        >
          <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${amenity.iconColor}`} />
        </motion.div>

        {/* Amenity Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#2563EB] dark:group-hover:text-sky-400 transition-colors duration-200">
            {amenity.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {amenity.description}
          </p>
        </div>
      </div>

      {/* Decorative Corner Accent Ring */}
      <div className="relative z-10 pt-4 flex items-center justify-end">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 group-hover:text-[#14B8A6] dark:group-hover:text-teal-400 transition-colors duration-200 flex items-center gap-1">
          Explore
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </motion.div>
  );
}
