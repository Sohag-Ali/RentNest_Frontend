"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Search, MessageCircle, Home, LucideIcon } from "lucide-react";

export interface StepData {
  stepNumber: string;
  title: string;
  description: string;
  iconName: "Search" | "MessageCircle" | "Home";
}

const iconMap: Record<StepData["iconName"], LucideIcon> = {
  Search,
  MessageCircle,
  Home,
};

interface TimelineStepProps {
  step: StepData;
  index: number;
}

export function TimelineStep({ step, index }: TimelineStepProps) {
  const IconComponent = iconMap[step.iconName] || Search;

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
    rgba(37, 99, 235, 0.16),
    transparent 80%
  )`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="group relative overflow-hidden rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between h-full z-10"
    >
      {/* Dynamic Gradient Border Hover Effect */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/0 via-teal-500/0 to-sky-500/0 group-hover:from-blue-500/30 group-hover:via-sky-500/30 group-hover:to-teal-500/30 transition-all duration-500 pointer-events-none" />

      {/* Spotlight Glow Follower */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightBg }}
      />

      <div className="relative z-10 space-y-5">
        {/* Step Header: Step Badge & Icon */}
        <div className="flex items-center justify-between">
          {/* Animated Step Number Circle */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] text-white font-black text-lg shadow-md shadow-blue-500/30">
            <span>{step.stepNumber}</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
            </span>
          </div>

          {/* Floating Icon Box */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-[#2563EB] dark:text-sky-400 border border-slate-200/60 dark:border-slate-700/60 group-hover:bg-[#2563EB] group-hover:text-white group-hover:shadow-lg transition-all duration-300"
          >
            <div className="transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <IconComponent className="w-6 h-6 stroke-[2]" />
            </div>
          </motion.div>
        </div>

        {/* Step Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-sky-400 transition-colors duration-200">
          {step.title}
        </h3>

        {/* Step Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {step.description}
        </p>
      </div>

      {/* Step Progress Indicator Bar */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between z-10 text-xs font-semibold text-slate-400 dark:text-slate-500">
        <span>Step {index + 1} of 3</span>
        <span className="text-[#2563EB] dark:text-sky-400 group-hover:underline">
          Learn More →
        </span>
      </div>
    </motion.div>
  );
}
