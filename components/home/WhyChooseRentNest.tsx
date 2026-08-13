"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Building2, Users, ShieldCheck } from "lucide-react";
import { FeatureCard, FeatureItem } from "./FeatureCard";

// Animated statistics counter component
function StatCountUp({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1400;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const featuresList: FeatureItem[] = [
  {
    id: "verified-properties",
    title: "Verified Properties",
    description: "Every listing is verified to ensure authenticity and trust.",
    iconName: "ShieldCheck",
    badgeText: "100% Verified",
  },
  {
    id: "trusted-landlords",
    title: "Trusted Landlords",
    description: "Connect only with trusted and verified landlords.",
    iconName: "UserCheck",
    badgeText: "Verified Hosts",
  },
  {
    id: "secure-booking",
    title: "Secure Booking",
    description: "Enjoy safe and transparent rental booking.",
    iconName: "Lock",
    badgeText: "Encrypted",
  },
  {
    id: "instant-support",
    title: "Instant Support",
    description: "Our support team is always ready to help.",
    iconName: "Headphones",
    badgeText: "24/7 Available",
  },
  {
    id: "transparent-pricing",
    title: "Transparent Pricing",
    description: "No hidden fees. Everything is clear and honest.",
    iconName: "Sparkles",
    badgeText: "Zero Hidden Fees",
  },
  {
    id: "easy-search",
    title: "Easy Search",
    description: "Find homes quickly using smart filters and search.",
    iconName: "Search",
    badgeText: "Smart Filters",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0] as const,
    },
  },
};

export function WhyChooseRentNest() {
  return (
    <section
      aria-labelledby="why-choose-rentnest-heading"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* Decorative Background Glowing Orbs & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle SVG Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating Glowing Orbs */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-[#2563EB] dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wide border border-blue-500/20 shadow-xs backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-sky-400" />
            <span>THE THIKANA ADVANTAGE</span>
          </div>

          {/* Main Title */}
          <h2
            id="why-choose-rentnest-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300"
          >
            Why Choose Thikana
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Experience a smarter, safer, and faster way to find your perfect rental home.
          </p>
        </motion.div>

        {/* Statistics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800"
        >
          {/* Stat 1 */}
          <div className="space-y-1.5 pt-2 sm:pt-0">
            <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-black text-[#2563EB] dark:text-sky-400 tracking-tight">
              <Building2 className="w-7 h-7 text-[#2563EB] dark:text-sky-400 shrink-0" />
              <StatCountUp value={5000} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              Verified Properties
            </p>
          </div>

          {/* Stat 2 */}
          <div className="space-y-1.5 pt-4 sm:pt-0">
            <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-black text-[#14B8A6] dark:text-teal-400 tracking-tight">
              <Users className="w-7 h-7 text-[#14B8A6] dark:text-teal-400 shrink-0" />
              <StatCountUp value={2000} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              Happy Tenants
            </p>
          </div>

          {/* Stat 3 */}
          <div className="space-y-1.5 pt-4 sm:pt-0">
            <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-black text-[#0EA5E9] dark:text-sky-400 tracking-tight">
              <ShieldCheck className="w-7 h-7 text-[#0EA5E9] dark:text-sky-400 shrink-0" />
              <StatCountUp value={700} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              Trusted Landlords
            </p>
          </div>
        </motion.div>

        {/* 6 Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {featuresList.map((feature) => (
            <motion.div key={feature.id} variants={cardVariants} className="h-full">
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
