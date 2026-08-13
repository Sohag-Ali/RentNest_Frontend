'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

const stats = [
  {
    number: '50K+',
    label: 'Properties Listed',
    description: 'Verified rental properties across major cities',
  },
  {
    number: '150K+',
    label: 'Happy Tenants',
    description: 'Successfully housed through our platform',
  },
  {
    number: '25K+',
    label: 'Verified Landlords',
    description: 'Trusted property owners on Thikana',
  },
  {
    number: '120+',
    label: 'Cities Covered',
    description: 'Available in regions worldwide',
  },
];

export function StatisticsSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <Badge variant="glass" className="gap-1.5 px-3.5 py-1 text-xs">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span>Proven Impact</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Our Milestones & Achievements
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
              Growing together with a vibrant community of verified renters and landlords worldwide.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
              >
                <Card
                  variant="glass"
                  className="p-6 sm:p-8 text-center rounded-3xl border border-border/80 shadow-luxury hover:border-primary/40 hover:shadow-glow transition-all duration-300 h-full flex flex-col justify-center"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent">
                      {stat.number}
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-foreground mt-1">
                      {stat.label}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
