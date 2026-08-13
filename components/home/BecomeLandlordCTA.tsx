"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles, Building2, Users, TrendingUp } from "lucide-react";
import { CTAButtons } from "./CTAButtons";
import { FloatingIncomeCard } from "./FloatingIncomeCard";

// Animated CountUp statistics component
function StatCountUp({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 1600;

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
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function BecomeLandlordCTA() {
  return (
    <section
      aria-labelledby="become-landlord-heading"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-slate-950 text-white transition-colors duration-300"
    >
      {/* Background Image with Dark Gradient Overlay & Parallax feel */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Architecture Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 opacity-20 filter contrast-125 brightness-90 transition-transform duration-1000 ease-out hover:scale-110"
        />

        {/* Multi-stage Dark Gradient Overlays for Maximum Saas Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/60 to-slate-950" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating Glowing Blobs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-10 w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            y: [0, 35, 0],
            x: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 right-10 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[130px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CountUp Statistics Banner */}
        {/* <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10"
        > */}
          {/* Stat 1 */}
          {/* <div className="space-y-1.5 pt-2 sm:pt-0">
            <div className="flex items-center justify-center gap-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#2563EB] dark:text-sky-400 tracking-tight">
              <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#2563EB] dark:text-sky-400 shrink-0" />
              <StatCountUp value={5000} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-300">
              Properties Listed
            </p>
          </div> */}

          {/* Stat 2 */}
          {/* <div className="space-y-1.5 pt-4 sm:pt-0">
            <div className="flex items-center justify-center gap-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#14B8A6] dark:text-teal-400 tracking-tight">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#14B8A6] dark:text-teal-400 shrink-0" />
              <StatCountUp value={2000} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-300">
              Happy Landlords
            </p>
          </div> */}

          {/* Stat 3 */}
          {/* <div className="space-y-1.5 pt-4 sm:pt-0">
            <div className="flex items-center justify-center gap-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0EA5E9] dark:text-sky-400 tracking-tight">
              <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-[#0EA5E9] dark:text-sky-400 shrink-0" />
              <StatCountUp value={98} suffix="%" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-300">
              Success Rate
            </p>
          </div> */}
        {/* </motion.div> */}

        {/* Main CTA Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Glassmorphism Content Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 p-8 sm:p-10 lg:p-12 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-sky-300 text-xs sm:text-sm font-semibold tracking-wide border border-blue-400/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>BECOME A LANDLORD</span>
            </div>

            {/* Main Title */}
            <h2
              id="become-landlord-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Earn Money by Renting Your Property
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Join thousands of landlords using Thikana to list properties, connect with trusted tenants, and manage rentals effortlessly.
            </p>

            {/* Action Buttons */}
            <CTAButtons />
          </motion.div>

          {/* Right Column: Luxury Property Illustration & Floating Glass Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Center Featured Luxury Image Box */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury Modern Property"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Bottom Image Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-white text-xs font-semibold flex items-center justify-between">
                <span>Penthouse Villa in Gulshan</span>
                <span className="text-emerald-400 font-bold">৳35,000/mo</span>
              </div>
            </div>

            {/* Floating Glass Badges */}
            <FloatingIncomeCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
