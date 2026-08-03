'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <Badge variant="secondary" className="w-fit">About RentNest</Badge>
            
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                Your Trusted Partner in Finding Home
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
                We believe everyone deserves to find their perfect rental. With RentNest, discovering your next home is simple, secure, and transparent.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                Browse Properties
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Right Illustration Placeholder */}
          <div className="relative h-80 sm:h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/30" />
                </div>
                <p className="text-muted-foreground">Modern Home Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
