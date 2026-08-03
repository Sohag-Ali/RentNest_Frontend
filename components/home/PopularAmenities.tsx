"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AmenityCard, AmenityItem } from "./AmenityCard";

const amenitiesData: AmenityItem[] = [
  {
    id: "wifi",
    name: "WiFi",
    description: "High-speed internet for work and entertainment.",
    iconName: "Wifi",
    gradient: "from-blue-500/20 to-sky-500/20",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20",
    iconColor: "text-[#2563EB] dark:text-blue-400",
  },
  {
    id: "parking",
    name: "Parking",
    description: "Safe and secure parking for your vehicle.",
    iconName: "Car",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconBg: "bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20",
    iconColor: "text-[#14B8A6] dark:text-teal-400",
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    description: "Relax with luxurious pool access.",
    iconName: "Waves",
    gradient: "from-sky-500/20 to-cyan-500/20",
    iconBg: "bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/20",
    iconColor: "text-[#0EA5E9] dark:text-sky-400",
  },
  {
    id: "gym",
    name: "Gym",
    description: "Stay fit with modern fitness facilities.",
    iconName: "Dumbbell",
    gradient: "from-indigo-500/20 to-purple-500/20",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    id: "pet-friendly",
    name: "Pet Friendly",
    description: "Bring your furry companions with confidence.",
    iconName: "Dog",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "security",
    name: "24/7 Security",
    description: "Round-the-clock security and CCTV monitoring.",
    iconName: "ShieldCheck",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "balcony",
    name: "Balcony",
    description: "Enjoy fresh air and beautiful outdoor views.",
    iconName: "Sun",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/20",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    id: "ac",
    name: "Air Conditioning",
    description: "Stay comfortable in every season.",
    iconName: "Wind",
    gradient: "from-teal-500/20 to-cyan-500/20",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
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

export function PopularAmenities() {
  return (
    <section
      aria-labelledby="popular-amenities-heading"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* Decorative Background Blur Circles & Subtle Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Ambient Glowing Orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 right-1/4 w-[450px] h-[450px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 left-10 w-[420px] h-[420px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[110px]"
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
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-[#2563EB] dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wide border border-blue-500/20 shadow-xs backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-sky-400" />
            <span>ESSENTIAL AMENITIES</span>
          </div>

          {/* Title */}
          <h2
            id="popular-amenities-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300"
          >
            Popular Amenities
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Discover rental homes equipped with the features you value most.
          </p>
        </motion.div>

        {/* 8 Amenity Cards Grid: Mobile 2 cols, Tablet 2 cols, Desktop 4 cols */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch"
        >
          {amenitiesData.map((amenity, index) => (
            <motion.div key={amenity.id} variants={cardVariants} className="h-full">
              <AmenityCard amenity={amenity} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
