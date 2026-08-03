'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <Badge variant="secondary" className="w-fit gap-1.5 px-3.5 py-1 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>About RentNest</span>
            </Badge>
            
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15]">
                Your Trusted Partner in Finding Home
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We believe everyone deserves to find their perfect rental. With RentNest, discovering your next home is simple, secure, transparent, and completely digital.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/properties">
                <Button size="lg" variant="gradient" className="gap-2 w-full sm:w-auto rounded-xl">
                  Browse Properties
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Modern Home Luxury Image Container */}
          <div className="relative h-[380px] sm:h-[450px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-luxury border border-border/80 group">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80"
              alt="Modern Luxury Home"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            {/* Floating Glass Badge Card */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-card border border-white/20 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-bold">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">100% Verified Rentals</p>
                  <p className="text-xs text-slate-300">Trusted by 50,000+ happy tenants</p>
                </div>
              </div>
              <Badge variant="gradient" className="hidden sm:inline-flex text-[11px]">
                Verified
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
