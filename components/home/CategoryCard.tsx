"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Building2,
  Home,
  BedDouble,
  BriefcaseBusiness,
  Building,
  Factory,
  House,
  Warehouse,
  Castle,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import { Category } from "@/types/category";

/**
 * AUTO ICON SYSTEM
 * Automatically resolves appropriate Lucide icon component based on category name.
 * Defaults to Home icon if unknown.
 */
function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const normalized = name.trim().toLowerCase();

  let Icon: LucideIcon = Home;

  if (normalized.includes("apartment")) Icon = Building2;
  else if (normalized.includes("villa")) Icon = Home;
  else if (normalized.includes("studio")) Icon = BedDouble;
  else if (normalized.includes("office")) Icon = BriefcaseBusiness;
  else if (normalized.includes("duplex")) Icon = Building;
  else if (normalized.includes("factory")) Icon = Factory;
  else if (normalized.includes("condo")) Icon = Building;
  else if (normalized.includes("house")) Icon = House;
  else if (normalized.includes("warehouse")) Icon = Warehouse;
  else if (normalized.includes("mansion") || normalized.includes("penthouse") || normalized.includes("castle")) {
    Icon = Castle;
  }

  return <Icon className={className} />;
}

/**
 * Animated Property Count component using requestAnimationFrame easing.
 */
function CountUp({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value <= 0) {
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1200; // ms duration

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic curve for luxury feel
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value]);

  return <span>{value <= 0 ? 0 : count}</span>;
}

interface CategoryCardProps {
  category: Category;
  isTopCategory?: boolean;
}

export function CategoryCard({ category, isTopCategory = false }: CategoryCardProps) {
  const isAvailable = category.propertiesCount > 0;

  // Interactive mouse tracking for spotlight glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(
    350px circle at ${mouseX}px ${mouseY}px,
    rgba(14, 165, 233, 0.12),
    transparent 80%
  )`;

  const cardContent = (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={isAvailable ? { y: -8, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative overflow-hidden rounded-3xl p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-[210px] sm:h-[220px] ${
        isAvailable
          ? "bg-white dark:bg-[#0d1422] border border-slate-200/80 dark:border-slate-800 shadow-subtle-saas hover:border-[#0EA5E9]/50 dark:hover:border-sky-400/50 cursor-pointer"
          : "bg-slate-50 dark:bg-[#0b1222]/40 border border-slate-200/50 dark:border-white/5 opacity-50 pointer-events-none cursor-not-allowed"
      }`}
    >
      {/* Dynamic Gradient Border Hover Effect */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-sky-500/0 via-blue-500/0 to-indigo-500/0 group-hover:from-sky-500/20 group-hover:via-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-500 pointer-events-none" />

      {/* Spotlight Glow Follower */}
      {isAvailable && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlightBg }}
        />
      )}

      {/* Card Header: Icon & Badge */}
      <div className="flex items-start justify-between z-10">
        {/* Large Premium Icon Container with Rotation & Scale Hover */}
        <div
          className={`relative p-3.5 sm:p-4 rounded-2xl transition-all duration-300 ${
            isAvailable
              ? "bg-[#EEF4FF] dark:bg-sky-500/10 text-[#2563EB] dark:text-sky-400 group-hover:bg-gradient-to-r group-hover:from-[#0EA5E9] group-hover:to-[#2563EB] group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/20"
              : "bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600"
          }`}
        >
          <div className="transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
            <CategoryIcon name={category.name} className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
          </div>
        </div>

        {/* Badges Container */}
        <div className="flex flex-col items-end gap-1.5">
          {/* Most Popular Badge (Top category) */}
          {isTopCategory && isAvailable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-500/30 backdrop-blur-sm shadow-xs">
              <Sparkles className="w-3 h-3 fill-amber-400 text-amber-500" />
              Most Popular
            </span>
          )}

          {/* Availability / Status Badge */}
          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* Card Details: Name & Animated Count */}
      <div className="z-10 mt-4">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-sky-400 transition-colors duration-200">
          {category.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
          {isAvailable ? (
            <>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                <CountUp value={category.propertiesCount} />
              </span>
              <span>{category.propertiesCount === 1 ? "Property" : "Properties"}</span>
            </>
          ) : (
            <span>0 Properties listed</span>
          )}
        </p>
      </div>
    </motion.div>
  );

  if (!isAvailable) {
    return (
      <div tabIndex={-1} aria-disabled="true" aria-label={`${category.name} - Coming Soon`}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={`/properties?category=${category.id}`}
      aria-label={`Browse ${category.name} categories (${category.propertiesCount} properties available)`}
      className="block outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 rounded-3xl"
    >
      {cardContent}
    </Link>
  );
}
