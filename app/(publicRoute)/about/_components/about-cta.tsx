'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function AboutCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-gradient-to-r from-blue-600/10 via-sky-500/10 to-teal-500/10 border-y border-border/80">
      <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 items-center text-center max-w-3xl mx-auto"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Find Your Next Rental Home Today
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
              Join thousands of satisfied renters and landlords who have unlocked seamless real estate experiences on Thikana.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/properties">
              <Button variant="gradient" size="lg" className="gap-2 rounded-2xl h-12 px-6">
                <span>Browse Properties</span>
                <ArrowRight className="w-4 h-4" />
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-2xl h-12 px-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
