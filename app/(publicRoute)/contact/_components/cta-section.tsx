'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CTASection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Card variant="glass" className="relative overflow-hidden rounded-3xl border border-border/80 p-10 sm:p-14 text-center shadow-luxury">
            {/* Background Soft Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                Ready to Find Your Perfect Rental?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
                Browse thousands of verified listings, connect directly with property owners, and book your ideal home today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/properties">
                  <Button variant="gradient" size="lg" className="rounded-2xl h-12 px-7 gap-2 shadow-lg shadow-blue-500/20">
                    <span>Browse Properties</span>
                    <ArrowRight className="w-4 h-4" />
                    <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                  </Button>
                </Link>
                <a href="#contact-form">
                  <Button variant="outline" size="lg" className="rounded-2xl h-12 px-7">
                    Send Us a Message
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
