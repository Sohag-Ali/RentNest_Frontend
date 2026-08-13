'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, MessageSquare } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Background Soft Radial Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="glass" className="gap-1.5 px-3.5 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>24/7 Support Dedicated Team</span>
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight text-balance"
        >
          Get in Touch with Our Team
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto"
        >
          Have questions about Thikana, property listings, or digital leases? We&apos;re here to help! Reach out to our team and we&apos;ll get back to you promptly.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-2"
        >
          <a href="#contact-form">
            <Button variant="gradient" size="lg" className="rounded-2xl h-12 px-7 gap-2 shadow-lg shadow-blue-500/20">
              <MessageSquare className="w-4 h-4" />
              <span>Send us a Message</span>
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
