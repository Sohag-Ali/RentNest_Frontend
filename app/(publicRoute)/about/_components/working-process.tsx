'use client';

import { Card } from '@/components/ui/card';
import { Search, Eye, Phone, Home } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Search Property',
    description: 'Browse through thousands of verified properties using our smart search filters.'
  },
  {
    step: '02',
    icon: Eye,
    title: 'Explore Details',
    description: 'View detailed property information, photos, virtual tours, and landlord reviews.'
  },
  {
    step: '03',
    icon: Phone,
    title: 'Contact Landlord',
    description: 'Connect directly with verified landlords through our secure messaging system.'
  },
  {
    step: '04',
    icon: Home,
    title: 'Move In',
    description: 'Complete paperwork securely and get ready to move into your new home.'
  }
];

export function WorkingProcess() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              How RentNest Works
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Simple steps to find your perfect rental home
            </p>
          </div>

          {/* Timeline */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex flex-col gap-6">
                  {/* Step Card */}
                  <Card className="p-6 sm:p-8 relative border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col gap-4">
                      {/* Step Number */}
                      <div className="inline-flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-bold text-primary/30">
                          {item.step}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>

                  {/* Connector Line (hidden on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center lg:col-span-1">
                      <div className="w-full h-1 bg-gradient-to-r from-primary/20 to-transparent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
