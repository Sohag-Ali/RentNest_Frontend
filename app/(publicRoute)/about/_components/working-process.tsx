'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Phone, Home, Sparkles } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Search Property',
    description: 'Browse through thousands of verified properties using smart search filters.',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    step: '02',
    icon: Eye,
    title: 'Explore Details',
    description: 'View detailed property specs, photos, floor plans, and verified landlord ratings.',
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    step: '03',
    icon: Phone,
    title: 'Contact Landlord',
    description: 'Connect directly with verified landlords and schedule property tours easily.',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  },
  {
    step: '04',
    icon: Home,
    title: 'Move In Securely',
    description: 'Complete digital leases with verified security and prepare to move into your new home.',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
];

export function WorkingProcess() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-muted/30 relative overflow-hidden">
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
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Seamless Experience</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              How RentNest Works
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
              Simple 4-step process to find, inspect, and secure your perfect rental property.
            </p>
          </motion.div>

          {/* Timeline Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col"
                >
                  <Card
                    variant="glass"
                    className="p-6 sm:p-8 relative rounded-3xl border border-border/80 shadow-luxury hover:border-primary/40 hover:shadow-glow transition-all duration-300 h-full flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Top Step Number Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl border ${item.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-black text-muted-foreground/30 font-mono">
                          {item.step}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
