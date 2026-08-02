'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Heart, MapPin, ShieldCheck, DollarSign, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const LUXURY_HERO_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85';

export function FloatingCards() {
  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] max-w-xl mx-auto flex items-center justify-center">
      {/* Glow Halo behind image */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 via-sky-400/20 to-teal-400/20 blur-3xl opacity-70 animate-pulse pointer-events-none" />

      {/* Main Ultra Luxury Property Image Frame */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl shadow-blue-500/10 group"
      >
        <Image
          src={LUXURY_HERO_IMAGE}
          alt="Luxury Apartment Interior"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Bottom Property Tag Overlay */}
        <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Badge className="bg-emerald-500/90 text-white font-bold text-[10px] px-2 py-0.5 border-none">
                Featured Rental
              </Badge>
              <span className="text-xs text-white/80 font-medium">Banani, Dhaka</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1 drop-shadow-sm">
              Skyline Luxury Penthouse
            </h4>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/70">Per Month</div>
            <div className="text-base font-extrabold font-mono text-emerald-400">$1,200</div>
          </div>
        </div>
      </motion.div>

      {/* 1. Floating Card: Rating ⭐ 4.9 (Top Left) */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -left-4 sm:top-4 sm:-left-6 rounded-2xl border border-white/30 bg-background/80 backdrop-blur-2xl p-3 shadow-xl flex items-center gap-2.5 z-20 cursor-default hover:scale-105 transition-transform"
        >
          <div className="h-9 w-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
            <Star className="h-5 w-5 fill-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-extrabold text-foreground">4.9 Rating</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">500+ Verified Reviews</span>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Floating Card: Saved ❤️ 500 (Top Right) */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-6 -right-4 sm:-right-6 rounded-2xl border border-white/30 bg-background/80 backdrop-blur-2xl p-3 shadow-xl flex items-center gap-2.5 z-20 cursor-default hover:scale-105 transition-transform"
        >
          <div className="h-9 w-9 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center font-bold">
            <Heart className="h-5 w-5 fill-rose-500" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-foreground block">500+ Saved</span>
            <span className="text-[10px] text-muted-foreground font-medium">Wishlisted Property</span>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Floating Card: Verified Property 🏠 (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-16 -left-6 sm:bottom-20 sm:-left-8 rounded-2xl border border-white/30 bg-background/80 backdrop-blur-2xl p-3 shadow-xl flex items-center gap-2.5 z-20 cursor-default hover:scale-105 transition-transform"
        >
          <div className="h-9 w-9 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-foreground flex items-center gap-1">
              Verified Property <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500" />
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">100% Protection</span>
          </div>
        </motion.div>
      </motion.div>

      {/* 4. Floating Card: Price Tag 💰 $1,200/mo (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute -bottom-4 -right-4 sm:bottom-2 sm:-right-6 rounded-2xl border border-white/30 bg-background/80 backdrop-blur-2xl p-3.5 shadow-xl flex items-center gap-3 z-20 cursor-default hover:scale-105 transition-transform"
        >
          <div className="h-10 w-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
              Starting From
            </span>
            <span className="text-sm font-extrabold font-mono text-foreground">$1,200 / month</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
