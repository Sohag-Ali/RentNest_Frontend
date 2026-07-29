'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function AboutCTA() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Find Your Dream Home Today
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Join thousands of renters and landlords who have found success on RentNest. Start your journey now.
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
      </div>
    </section>
  );
}
