'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  color: string;
  index: number;
}

function ContactCard({ icon, title, description, details, color, index }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <Card variant="glass" className="group relative p-6 sm:p-8 rounded-3xl border border-border/80 shadow-luxury transition-all duration-300 hover:border-primary/40 hover:shadow-glow cursor-pointer h-full flex flex-col justify-between">
        <div className="relative z-10">
          <div className={`mb-4 inline-flex p-3.5 rounded-2xl border ${color} transition-transform duration-300 group-hover:scale-110`}>
            <div className="w-6 h-6">
              {icon}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-1.5 text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground mb-3">{description}</p>
          <p className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors duration-300">
            {details}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

export function ContactCards() {
  const cards = [
    {
      icon: <MapPin className="w-full h-full" />,
      title: 'Office Address',
      description: 'Visit our headquarters',
      details: '123 Rental Street, San Francisco, CA 94105',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: <Mail className="w-full h-full" />,
      title: 'Email Address',
      description: 'Get in touch via email',
      details: 'support@thikana.com',
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    },
    {
      icon: <Phone className="w-full h-full" />,
      title: 'Phone Number',
      description: 'Call us anytime',
      details: '+1 (555) 123-4567',
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    },
    {
      icon: <Clock className="w-full h-full" />,
      title: 'Business Hours',
      description: 'We are open',
      details: 'Mon - Fri: 9 AM - 6 PM PST',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <ContactCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              details={card.details}
              color={card.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
