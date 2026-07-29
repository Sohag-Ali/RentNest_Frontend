'use client';

import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/10" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-6 text-base">
          Contact Us
        </Badge>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-foreground text-balance">
          Get in Touch with Our Team
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-balance leading-relaxed max-w-2xl mx-auto">
          Have questions about RentNest? We&apos;re here to help! Reach out to our dedicated support team and we&apos;ll get back to you as soon as possible.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#contact-form"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Send us a Message
          </a>
        </div>
      </div>
    </section>
  );
}
