'use client';

import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Lisa Johnson',
    role: 'First-time Renter',
    rating: 5,
    feedback: 'Thikana made my apartment search so easy! The verified listings gave me confidence and the landlord was amazing. Best rental experience ever!'
  },
  {
    name: 'David Martinez',
    role: 'Landlord',
    rating: 5,
    feedback: 'As a landlord, I appreciate how professional and transparent the platform is. Finding reliable tenants has never been easier.'
  },
  {
    name: 'Sophie Chen',
    role: 'Relocating Professional',
    rating: 5,
    feedback: 'Moving to a new city was stressful, but Thikana made finding housing seamless. The support team was incredibly helpful throughout!'
  },
  {
    name: 'Robert Thompson',
    role: 'Property Manager',
    rating: 5,
    feedback: 'Outstanding platform for managing multiple properties. The tools are intuitive and the tenant screening process is thorough.'
  }
];

export function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              What Our Users Say
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Real stories from renters and landlords who trust Thikana
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 sm:p-8 border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                  "{testimonial.feedback}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-2 border-t border-primary/10">
                  <Avatar className="w-10 h-10 bg-primary/20" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
