'use client';

import { motion } from 'framer-motion';
import { HeroButtons } from './HeroButtons';
import { HeroSearch } from './HeroSearch';
import { HeroStats } from './HeroStats';
import { FloatingCards } from './FloatingCards';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-background pt-8 pb-16 lg:py-16">
      {/* Background Decorative Gradients & Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial Light Glow Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-sky-400/10 dark:bg-sky-400/15 rounded-full blur-[120px]" />

        {/* Subtle Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, CTA, Search, Stats */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="glass"
                className="rounded-full px-4 py-1.5 text-xs font-bold gap-2 border-primary/30 text-primary bg-primary/10 shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12] font-heading">
                Find Your Perfect Home{' '}
                <span className="block mt-1 bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent">
                  Without the Stress
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Discover verified luxury apartments, villas, and family homes with instant direct booking, 100% lease protection, and zero hidden fees.
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

          {/* Right Column: Luxury Property Visuals & Floating Glass Cards */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FloatingCards />
          </div>
        </div>
      </div>
    </section>
  );
}
