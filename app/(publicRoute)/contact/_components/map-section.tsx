'use client';

import { motion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function MapSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <Badge variant="glass" className="gap-1.5 px-3.5 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Headquarters Location</span>
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Visit Our Global Office
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
            Our headquarters is located in the heart of San Francisco, accessible for in-person appointments.
          </p>
        </motion.div>

        {/* Interactive Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card variant="glass" className="overflow-hidden rounded-3xl border border-border/80 shadow-luxury">
            <div className="relative w-full h-96 sm:h-[480px] bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
              {/* Map Canvas Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center">
                {/* Decorative Grid SVG */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-blue-500" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mapGrid)" />
                  </svg>
                </div>

                {/* Pulsing Location Radar Pin */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 text-center flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl max-w-md mx-4"
                >
                  <div className="mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/25">
                    <MapPin className="w-8 h-8 text-white animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight mb-1">
                    San Francisco HQ
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                    123 Rental Street, Suite 400, San Francisco, CA 94105
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="gradient" className="rounded-xl h-11 px-6 text-xs font-bold gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Open in Google Maps</span>
                    </Button>
                  </a>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
