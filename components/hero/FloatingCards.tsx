'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Heart,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PropertySlide {
  id: string;
  title: string;
  location: string;
  price: string;
  rating: string;
  reviews: string;
  saved: string;
  image: string;
  tag: string;
}

const HERO_SLIDES: PropertySlide[] = [
  {
    id: 'slide-1',
    title: 'Skyline Luxury Penthouse',
    location: 'Gulshan, Dhaka',
    price: '৳120,000',
    rating: '4.9',
    reviews: '520+ Reviews',
    saved: '640+ Saved',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
    tag: 'Featured Penthouse',
  },
  {
    id: 'slide-2',
    title: 'Contemporary Duplex Residence',
    location: 'Banani, Dhaka',
    price: '৳145,000',
    rating: '4.95',
    reviews: '410+ Reviews',
    saved: '780+ Saved',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    tag: 'Top Pick Duplex',
  },
  {
    id: 'slide-3',
    title: 'Modern Waterfront Villa',
    location: 'Bashundhara R/A, Dhaka',
    price: '৳180,000',
    rating: '5.0',
    reviews: '630+ Reviews',
    saved: '920+ Saved',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85',
    tag: 'Exclusive Villa',
  },
];

export function FloatingCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentSlide = HERO_SLIDES[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Background Soft Radial Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 via-sky-400/20 to-teal-400/20 blur-2xl opacity-60 pointer-events-none" />

      {/* Main Luxury Slider Card Frame */}
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/15 shadow-2xl shadow-blue-500/10 group bg-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 30, scale: 1.02 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark Gradient Protection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/20" />

            {/* Top Bar inside image: Rating & Saved Badges */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20">
              <Badge className="bg-black/50 backdrop-blur-md border border-white/20 text-white font-semibold text-[11px] px-3 py-1 gap-1.5 rounded-full shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{currentSlide.tag}</span>
              </Badge>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white text-xs font-bold shadow-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{currentSlide.rating}</span>
                </div>
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white text-xs font-bold shadow-md">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>{currentSlide.saved}</span>
                </div>
              </div>
            </div>

            {/* Bottom Property Info Card inside image */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 p-4 rounded-2xl bg-white/10 dark:bg-slate-950/60 backdrop-blur-xl border border-white/20 text-white flex items-center justify-between z-20 shadow-xl">
              <div className="space-y-0.5 min-w-0 pr-2">
                <div className="flex items-center gap-1 text-[11px] text-sky-300 font-semibold truncate">
                  <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="truncate">{currentSlide.location}</span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-white truncate drop-shadow-sm">
                  {currentSlide.title}
                </h4>
              </div>

              <div className="text-right shrink-0">
                <div className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">Per Month</div>
                <div className="text-base font-black font-mono text-emerald-400">
                  {currentSlide.price}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={handlePrev}
          aria-label="Previous Property"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95 border border-white/20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Property"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95 border border-white/20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-1 right-4 z-30 flex items-center gap-1.5 pb-2">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`transition-all rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-5 h-1.5 bg-sky-400'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Verified Shield Badge cleanly placed underneath */}
      <div className="mt-3 flex items-center justify-between px-2 text-xs text-muted-foreground font-medium">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          <span>100% Lease & Deposit Security</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-500 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
          <span>Verified Landlords</span>
        </div>
      </div>
    </div>
  );
}


