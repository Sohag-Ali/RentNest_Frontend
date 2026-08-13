"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, MapPin, Home } from "lucide-react";
import { CityData } from "@/types/city";
import { CityBadge } from "./CityBadge";

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
      // Ease out cubic curve for smooth count animation
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

interface CityCardProps {
  city: CityData;
}

export function CityCard({ city }: CityCardProps) {
  // Interactive mouse tracking for spotlight glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(
    380px circle at ${mouseX}px ${mouseY}px,
    rgba(37, 99, 235, 0.18),
    transparent 80%
  )`;

  const targetUrl = `/properties?city=${encodeURIComponent(city.city)}`;
  const defaultImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80";

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="group relative overflow-hidden rounded-3xl p-3.5 sm:p-4 backdrop-blur-xl transition-all duration-500 h-[380px] sm:h-[400px] flex flex-col justify-between cursor-pointer border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
    >
      {/* Dynamic Gradient Border Hover Effect */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/0 via-teal-500/0 to-sky-500/0 group-hover:from-blue-500/40 group-hover:via-sky-500/40 group-hover:to-teal-500/40 transition-all duration-500 pointer-events-none z-20" />

      {/* Spotlight Glow Follower */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: spotlightBg }}
      />

      {/* Background Featured City Image with Smooth Zoom */}
      <div className="absolute inset-0 z-0">
        <Image
          src={city.featuredImage || defaultImage}
          alt={`Rental properties in ${city.city}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          priority={false}
        />
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20" />
      </div>

      {/* Top Header Badge Row */}
      <div className="relative z-20 flex items-start justify-between">
        <CityBadge propertiesCount={city.propertiesCount} cityName={city.city} />
      </div>

      {/* Glassmorphism Bottom Info Panel */}
      <div className="relative z-20 rounded-2xl p-3.5 sm:p-4 bg-slate-950/65 dark:bg-slate-900/75 backdrop-blur-md border border-white/20 dark:border-slate-700/60 shadow-xl space-y-2.5 min-w-0">
        {/* City Name with Floating Map Pin Icon & Property Count Badge */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
              <MapPin className="w-4 h-4 animate-bounce" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
              {city.city}
            </h3>
          </div>

          {/* Compact Property Count Badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900/80 text-sky-300 border border-sky-400/30 text-[11px] font-semibold shrink-0">
            <Home className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>
              <CountUp value={city.propertiesCount} /> {city.propertiesCount === 1 ? "Property" : "Properties"}
            </span>
          </div>
        </div>

        {/* Price & Action Button Row */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/15 dark:border-slate-700/60 min-w-0">
          <div className="min-w-0">
            <span className="text-[10px] font-medium text-slate-300 uppercase tracking-wider block">
              Starting from
            </span>
            <div className="text-base sm:text-lg font-black text-white tracking-tight truncate">
              ৳{city.startingPrice ? city.startingPrice.toLocaleString() : "0"}
              <span className="text-[11px] font-normal text-slate-300 ml-0.5">/mo</span>
            </div>
          </div>

          {/* Explore → Action Button */}
          <Link
            href={targetUrl}
            aria-label={`Explore properties in ${city.city}`}
            className="group/btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#0EA5E9] hover:from-blue-700 hover:to-sky-600 text-white text-xs font-bold shadow-md shadow-blue-500/30 transition-all duration-300 active:scale-95 shrink-0 cursor-pointer"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
