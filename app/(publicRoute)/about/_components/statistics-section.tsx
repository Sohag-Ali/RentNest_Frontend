'use client';

import { Card } from '@/components/ui/card';

const stats = [
  {
    number: '50K+',
    label: 'Properties Listed',
    description: 'Verified rental properties across major cities'
  },
  {
    number: '150K+',
    label: 'Happy Tenants',
    description: 'Successfully housed through our platform'
  },
  {
    number: '25K+',
    label: 'Verified Landlords',
    description: 'Trusted property owners on RentNest'
  },
  {
    number: '120+',
    label: 'Cities Covered',
    description: 'Available in regions worldwide'
  }
];

export function StatisticsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Our Achievements
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Growing together with millions of satisfied users
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 sm:p-8 text-center border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col gap-3">
                  <p className="text-4xl sm:text-5xl font-bold text-primary text-balance">
                    {stat.number}
                  </p>
                  <p className="text-lg sm:text-xl font-semibold text-foreground">
                    {stat.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
