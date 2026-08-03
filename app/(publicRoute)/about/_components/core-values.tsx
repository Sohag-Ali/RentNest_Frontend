'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Eye, Lightbulb, HeartHandshake, Sparkles } from 'lucide-react';

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust & Integrity',
    description: 'We build trust through 100% verified property listings and secure digital lease processing.',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Eye,
    title: 'Absolute Transparency',
    description: 'Complete visibility into pricing, fee structures, property history, and terms with zero surprises.',
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description: 'Continuously refining our platform with modern tech, real-time messaging, and smart search tools.',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  },
  {
    icon: HeartHandshake,
    title: 'Community First',
    description: 'Building a supportive, respectful ecosystem where renters and property owners thrive together.',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
];

export function CoreValues() {
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
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Our Guiding Principles</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Our Core Values
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
              Principles that guide everything we design, engineer, and operate at RentNest.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Card
                    variant="glass"
                    className="p-6 sm:p-8 rounded-3xl border border-border/80 shadow-luxury hover:border-primary/40 hover:shadow-glow transition-all duration-300 h-full flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-4">
                      <div className={`w-12 h-12 rounded-2xl border ${value.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {value.description}
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
