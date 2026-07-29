'use client';

import { Card } from '@/components/ui/card';
import { ShieldCheck, Users, Search, Zap, DollarSign, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Properties',
    description: 'All listings are thoroughly vetted and verified for quality and authenticity.'
  },
  {
    icon: Users,
    title: 'Trusted Landlords',
    description: 'Connect with verified landlords who have proven track records and reviews.'
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find exactly what you need with our advanced filtering and search tools.'
  },
  {
    icon: Zap,
    title: 'Fast Support',
    description: 'Get quick responses from our dedicated support team 24/7.'
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Transparent pricing with no hidden fees or surprise charges.'
  },
  {
    icon: BarChart3,
    title: 'Market Insights',
    description: 'Access real-time market data to make informed rental decisions.'
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Why Choose RentNest
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              We provide a comprehensive platform designed with renters and landlords in mind
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group relative p-6 sm:p-8 border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
