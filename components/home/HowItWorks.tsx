"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { TimelineStep, StepData } from "./TimelineStep";

const stepsList: StepData[] = [
  {
    stepNumber: "01",
    title: "Search Property",
    description: "Search rental homes using location, category, price and filters.",
    iconName: "Search",
  },
  {
    stepNumber: "02",
    title: "Contact or Book",
    description: "Contact the landlord or submit your booking request.",
    iconName: "MessageCircle",
  },
  {
    stepNumber: "03",
    title: "Move In",
    description: "Complete the agreement and move into your new home.",
    iconName: "Home",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0] as const,
    },
  },
};

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* Background Decorative Blur Circles & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle SVG Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating Glowing Blobs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 right-1/3 w-[450px] h-[450px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[90px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-[#2563EB] dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wide border border-blue-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-sky-400" />
            <span>SIMPLE PROCESS</span>
          </div>

          {/* Main Title */}
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300"
          >
            How It Works
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
            Rent your next home in just three simple steps.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop Animated Connecting Line */}
          <div className="hidden lg:block absolute top-[90px] left-[15%] right-[15%] h-1 bg-slate-200 dark:bg-slate-800 z-0 overflow-hidden rounded-full">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#2563EB] via-[#14B8A6] to-[#0EA5E9] origin-left"
            />
          </div>

          {/* Steps Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch relative z-10"
          >
            {stepsList.map((step, idx) => (
              <motion.div key={step.stepNumber} variants={stepVariants} className="h-full">
                <TimelineStep step={step} index={idx} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 sm:mt-16 text-center"
        >
          <Link
            href="/properties"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#0EA5E9] hover:from-blue-700 hover:to-sky-600 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
