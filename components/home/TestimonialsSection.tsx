"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ShieldCheck,
  Building2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Testimonial {
  id: string;
  name: string;
  role: "Tenant" | "Landlord";
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  propertyInfo: string;
  verifiedDate: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    name: "Tamim & Family",
    role: "Tenant",
    location: "Gulshan-2, Dhaka",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote:
      "Thikana completely eliminated the hassle of middleman broker fees. We booked a virtual walkthrough for a luxury duplex in Gulshan, signed the lease digitally, and moved in within 48 hours. Best rental experience in Bangladesh!",
    propertyInfo: "Rented 3-Bed Duplex",
    verifiedDate: "Verified Move-In • Aug 2026",
  },
  {
    id: "review-2",
    name: "Engr. Mahfuzur Rahman",
    role: "Landlord",
    location: "Banani, Dhaka",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote:
      "As a landlord with multiple apartments in Banani and Dhanmondi, Thikana's verified tenant background checks gave me complete confidence. Rent payments arrive automatically on time every single month.",
    propertyInfo: "Landlord (4 Units Listed)",
    verifiedDate: "Verified Host • 2 Years",
  },
  {
    id: "review-3",
    name: "Samira Ahmed",
    role: "Tenant",
    location: "Uttara Sector 7, Dhaka",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote:
      "The filter options for verified utilities and Metro Rail proximity made my search so accurate. I found an immaculate apartment in Uttara without paying exorbitant agent commissions.",
    propertyInfo: "Rented Executive Flat",
    verifiedDate: "Verified Renter • Jul 2026",
  },
  {
    id: "review-4",
    name: "Arifur Chowdhury",
    role: "Landlord",
    location: "Bashundhara R/A, Dhaka",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote:
      "Thikana's landlord dashboard makes managing rental applications, lease renewals, and security deposit tracking effortless. Vacancy turnaround for my properties dropped from months to just 3 days!",
    propertyInfo: "Landlord (2 Luxury Villas)",
    verifiedDate: "Verified Host • 1 Year",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [filterRole, setFilterRole] = useState<"All" | "Tenant" | "Landlord">("All");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const filteredList = TESTIMONIALS.filter(
    (t) => filterRole === "All" || t.role === filterRole
  );

  // Auto-play swiper every 3.5 seconds
  useEffect(() => {
    if (!isAutoPlaying || filteredList.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % filteredList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredList.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
  };

  const activeReview = filteredList[currentIndex] || TESTIMONIALS[0];

  // Drag end swipe handler
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800/60"
    >
      {/* Background Decorative Blur Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[110px]" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-[#2563EB] dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wide border border-blue-500/20 shadow-xs backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-sky-400" />
            <span>REAL TENANT & LANDLORD STORIES</span>
          </div>

          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300"
          >
            Loved by Thousands of Renters & Property Owners
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Swipe through real success stories from verified tenants and property owners across Bangladesh.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(["All", "Tenant", "Landlord"] as const).map((role) => (
            <button
              key={role}
              onClick={() => {
                setFilterRole(role);
                setCurrentIndex(0);
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterRole === role
                  ? "bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white shadow-md shadow-blue-500/20"
                  : "bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {role === "All" ? "All Reviews" : `${role} Stories`}
            </button>
          ))}
        </div>

        {/* Swiper Animated Touch/Drag Card Area */}
        <div
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="relative max-w-4xl mx-auto px-4"
        >
          <div className="relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeReview.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="w-full cursor-grab active:cursor-grabbing select-none"
              >
                <Card className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl hover:shadow-blue-500/10 transition-shadow">
                  <Quote className="absolute top-6 right-8 w-24 h-24 text-blue-500/10 dark:text-blue-500/15 pointer-events-none" />

                  <div className="space-y-6">
                    {/* Rating Stars & Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(activeReview.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                        <span className="ml-2 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                          5.0 Verified Review
                        </span>
                      </div>

                      <Badge className="bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-bold text-xs px-3 py-1 gap-1.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                        <span>{activeReview.verifiedDate}</span>
                      </Badge>
                    </div>

                    {/* Quote Content */}
                    <p className="text-base sm:text-xl font-semibold text-slate-900 dark:text-slate-100 leading-relaxed italic font-serif">
                      &ldquo;{activeReview.quote}&rdquo;
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center justify-between pt-5 border-t border-slate-200/60 dark:border-slate-800/60">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={activeReview.avatar}
                          alt={activeReview.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-[#2563EB]/40 shadow-md"
                        />
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            {activeReview.name}
                          </h4>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <span className="text-[#2563EB] dark:text-sky-400 font-semibold">
                              {activeReview.location}
                            </span>
                            <span>•</span>
                            <span>{activeReview.propertyInfo}</span>
                          </p>
                        </div>
                      </div>

                      {/* Touch Swipe Hint */}
                      <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium tracking-wide">
                        ← Swipe or Drag →
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows & Swiper Pagination Dots */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-[#2563EB] hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Swiper Pagination Dots */}
            <div className="flex items-center gap-2">
              {filteredList.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 h-2.5 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] shadow-sm"
                      : "w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-[#2563EB] hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Banner: Direct Link to Blogs & Knowledge Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold backdrop-blur-md">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THIKANA BLOGS & INSIGHTS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold">
              Want Expert Tenant & Landlord Advice?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Read our latest legal lease guides, neighborhood breakdowns, and property management tips.
            </p>
          </div>

          <Link href="/blogs" className="shrink-0">
            <button className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-[#2563EB] font-extrabold text-xs sm:text-sm shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer">
              <span>Explore All Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
