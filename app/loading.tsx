'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ThikanaLogo } from '@/components/shared/ThikanaLogo';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-2xl select-none">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        {/* Animated Brand Logo Container */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Glow Ring */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute h-24 w-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-sky-500 to-teal-500 blur-xl"
          />

          {/* Outer Spinning Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="h-20 w-20 rounded-3xl p-[2px] bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500"
          >
            <div className="h-full w-full rounded-[22px] bg-background/80 backdrop-blur-md" />
          </motion.div>

          {/* Center Brand Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.85, 1, 0.85] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute flex items-center justify-center"
          >
            <ThikanaLogo iconOnly size="lg" href="" />
          </motion.div>
        </div>

        {/* Brand Text Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-heading flex items-center">
              Thikana
              <span className="inline-block ml-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400" />
            </h1>
            <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400 animate-bounce" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            Preparing your premium rental experience...
          </p>
        </div>

        {/* Shimmering Progress Bar */}
        <div className="relative h-1.5 w-48 sm:w-64 overflow-hidden rounded-full bg-muted border border-border/50">
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 shadow-md shadow-blue-500/30"
          />
        </div>
      </div>
    </div>
  );
}