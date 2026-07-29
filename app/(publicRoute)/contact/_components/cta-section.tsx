'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CTASection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-4xl mx-auto">
        <Card className="relative overflow-hidden border-border/50 p-12 sm:p-16 text-center">
          {/* Decorative background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground text-balance">
              Ready to Find Your Perfect Rental?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Browse thousands of listings, connect with property owners, and book your ideal rental home today. Start your RentNest journey now.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-6 px-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group flex items-center justify-center gap-2">
                Browse Properties
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                className="border-border/50 text-foreground hover:bg-card rounded-lg font-semibold py-6 px-8 transition-all duration-300 hover:border-primary/50"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
