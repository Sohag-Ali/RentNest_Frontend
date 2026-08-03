"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ShieldCheck,
  UserCheck,
  Lock,
  Headphones,
  Sparkles,
  Search,
  LucideIcon,
} from "lucide-react";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: "ShieldCheck" | "UserCheck" | "Lock" | "Headphones" | "Sparkles" | "Search";
  badgeText?: string;
}

const iconMap: Record<FeatureItem["iconName"], LucideIcon> = {
  ShieldCheck,
  UserCheck,
  Lock,
  Headphones,
  Sparkles,
  Search,
};

interface FeatureCardProps {
  feature: FeatureItem;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = iconMap[feature.iconName] || ShieldCheck;

  // Mouse parallax spotlight follower
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(
    350px circle at ${mouseX}px ${mouseY}px,
    rgba(37, 99, 235, 0.14),
    transparent 80%
  )`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-3xl p-6 sm:p-7 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between h-full"
    >
      {/* Dynamic Gradient Border Hover Effect */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/0 via-teal-500/0 to-sky-500/0 group-hover:from-blue-500/30 group-hover:via-sky-500/30 group-hover:to-teal-500/30 transition-all duration-500 pointer-events-none" />

      {/* Spotlight Glow Follower */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightBg }}
      />

      <div className="relative z-10 space-y-4">
        {/* Large Animated Icon Box */}
        <div className="flex items-center justify-between">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-teal-500/10 dark:from-blue-500/20 dark:to-teal-500/20 text-[#2563EB] dark:text-sky-400 border border-blue-500/20 shadow-xs group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"
          >
            <div className="transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
            </div>
          </motion.div>

          {feature.badgeText && (
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-sky-400 border border-blue-500/20">
              {feature.badgeText}
            </span>
          )}
        </div>

        {/* Feature Title */}
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-sky-400 transition-colors duration-200">
          {feature.title}
        </h3>

        {/* Feature Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {feature.description}
        </p>
      </div>

      {/* Decorative Accent Bottom Bar */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between z-10">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-sky-400 transition-colors">
          RentNest Certified
        </span>
        <div className="w-2 h-2 rounded-full bg-blue-500/40 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300" />
      </div>
    </motion.div>
  );
}
