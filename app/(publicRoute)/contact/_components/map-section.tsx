'use client';

import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function MapSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Visit Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our office is located in the heart of San Francisco, easily accessible from all directions.
          </p>
        </div>

        <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="relative w-full h-96 sm:h-[500px] bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-background flex flex-col items-center justify-center">
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Location Pin */}
              <div className="relative z-10 text-center">
                <div className="mb-6 inline-flex p-6 rounded-full bg-primary/10 border-2 border-primary/20">
                  <MapPin className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">San Francisco HQ</h3>
                <p className="text-muted-foreground mb-6">123 Rental Street, San Francisco, CA 94105</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
