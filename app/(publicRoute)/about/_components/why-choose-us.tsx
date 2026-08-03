'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Users, Search, Zap, DollarSign, BarChart3, Sparkles } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Properties',
    description: 'All listings are thoroughly vetted and verified for quality, safety, and authenticity.',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Users,
    title: 'Trusted Landlords',
    description: 'Connect directly with verified landlords who have proven track records and verified reviews.',
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find exactly what you need with our advanced AI-powered filtering and location search tools.',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  },
  {
    icon: Zap,
    title: 'Fast Support',
    description: 'Get quick responses and dedicated resolution from our support team 24 hours a day.',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: '100% upfront pricing with zero hidden service fees or unexpected charges at lease sign.',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: BarChart3,
    title: 'Market Insights',
    description: 'Access real-time rental market trends to make informed, confident housing decisions.',
    color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  },
];

export function WhyChooseUs() {
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
              <span>Unmatched Standard</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Why Choose RentNest
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
              We provide a comprehensive, transparent platform engineered for renters and landlords.
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Card
                    variant="glass"
                    className="group relative p-6 sm:p-8 rounded-3xl border border-border/80 shadow-luxury transition-all duration-300 hover:border-primary/40 hover:shadow-glow h-full flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-4">
                      <div className={`w-12 h-12 rounded-2xl border ${feature.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
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
