'use client';

import { Card } from '@/components/ui/card';
import { ShieldCheck, Eye, Lightbulb, HeartHandshake } from 'lucide-react';

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust',
    description: 'We build trust through verified listings, transparent communication, and secure transactions.'
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Complete visibility into pricing, property details, and all terms without any hidden surprises.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Continuously improving our platform with cutting-edge technology and user feedback.'
  },
  {
    icon: HeartHandshake,
    title: 'Community',
    description: 'Building a supportive ecosystem where renters and landlords thrive together.'
  }
];

export function CoreValues() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Our Core Values
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Principles that guide everything we do at RentNest
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="p-6 sm:p-8 border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {value.description}
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
