"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfoPageLayoutProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

export function InfoPageLayout({
  badge = "Thikana Info",
  badgeIcon,
  title,
  subtitle,
  children,
  ctaTitle = "Ready to Find Your Ideal Home?",
  ctaDescription = "Join thousands of renters and landlords using Thikana across Bangladesh.",
  ctaButtonText = "Browse Properties",
  ctaButtonHref = "/properties",
}: InfoPageLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Background Subtle Ambient Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Banner Section */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 bg-gradient-to-b from-slate-100/70 via-slate-50 to-background dark:from-slate-900/60 dark:via-slate-900/40 dark:to-background border-b border-border/60">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumbs Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground/60" />
            <span className="text-foreground truncate">{title}</span>
          </motion.div>

          {/* Title & Badge Header */}
          <div className="max-w-3xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-[#2563EB] dark:text-sky-400 text-xs font-bold tracking-wide border border-blue-500/20"
            >
              {badgeIcon || <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
              <span>{badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] font-heading"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {children}
        </motion.div>

        {/* Global Bottom CTA Card */}
        {ctaTitle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-sky-600 to-teal-600 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-2 text-center sm:text-left z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {ctaTitle}
              </h3>
              <p className="text-sm sm:text-base text-blue-100 max-w-xl">
                {ctaDescription}
              </p>
            </div>
            <Link href={ctaButtonHref} className="z-10 shrink-0">
              <Button
                size="lg"
                className="h-12 px-6 rounded-2xl bg-white text-blue-600 hover:bg-slate-100 font-bold text-sm shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer gap-2"
              >
                <span>{ctaButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
}
