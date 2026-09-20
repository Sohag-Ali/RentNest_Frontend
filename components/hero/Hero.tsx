'use client';

import { motion } from 'framer-motion';
import { HeroButtons } from './HeroButtons';
import { HeroSearch } from './HeroSearch';
import { HeroStats } from './HeroStats';
import { FloatingCards } from './FloatingCards';
import { Sparkles, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('categories-heading');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#EEF4FF] dark:bg-[#070B14] pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Background Decorative Gradients & Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Glow Blobs */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-sky-400/15 dark:bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-[140px]" />

        {/* Subtle Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, #0f172a 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, CTA, Search, Stats */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-xs font-bold gap-2 border border-blue-200 dark:border-sky-500/30 text-[#2563EB] dark:text-sky-400 bg-blue-50/90 dark:bg-sky-500/10 shadow-xs"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#2563EB] dark:text-sky-400" />
                <span>The Next Generation Rental Platform</span>
              </Badge>
            </motion.div>

            {/* Main Hero Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-[1.12] font-heading">
                Find Your Perfect{' '}
                <span className="block mt-1 bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] dark:from-sky-400 dark:to-blue-500 bg-clip-text text-transparent">
                  Home With Thikana
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Discover verified rental properties and find a place that feels like home with 100% lease protection and zero hidden fees.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <HeroButtons />

            {/* Advanced Search Bar */}
            <div className="pt-2">
              <HeroSearch />
            </div>

            {/* Animated Statistics Counters */}
            <HeroStats />
          </div>

          {/* Right Column: Luxury Property Visuals & Interactive Slider */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FloatingCards />
          </div>
        </div>
      </div>

      {/* Clear Visual Flow to Next Section: Animated Scroll Down Indicator */}
      <motion.button
        onClick={scrollToNextSection}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.8, delay: 0.8 },
        }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 hover:text-[#0EA5E9] dark:hover:text-sky-400 transition-colors cursor-pointer group"
      >
        <span className="tracking-wider uppercase text-[9px] font-extrabold">Scroll to Explore</span>
        <div className="w-8 h-8 rounded-full bg-white dark:bg-[#0d1422] backdrop-blur-md border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-xs group-hover:border-[#0EA5E9]/50 group-hover:bg-blue-50 dark:group-hover:bg-slate-800">
          <ChevronDown className="w-4 h-4 text-[#0EA5E9] dark:text-sky-400 transition-transform group-hover:translate-y-0.5" />
        </div>
      </motion.button>
    </section>
  );
}


