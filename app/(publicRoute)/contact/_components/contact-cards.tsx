'use client';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
}

function ContactCard({ icon, title, description, details }: ContactCardProps) {
  return (
    <Card className="group relative p-8 hover:shadow-2xl transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 cursor-pointer">
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          <div className="text-primary w-6 h-6">
            {icon}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {details}
        </p>
      </div>
    </Card>
  );
}

export function ContactCards() {
  const cards = [
    {
      icon: <MapPin className="w-full h-full" />,
      title: 'Office Address',
      description: 'Visit our headquarters',
      details: '123 Rental Street, San Francisco, CA 94105',
    },
    {
      icon: <Mail className="w-full h-full" />,
      title: 'Email Address',
      description: 'Get in touch via email',
      details: 'support@rentnest.com',
    },
    {
      icon: <Phone className="w-full h-full" />,
      title: 'Phone Number',
      description: 'Call us anytime',
      details: '+1 (555) 123-4567',
    },
    {
      icon: <Clock className="w-full h-full" />,
      title: 'Business Hours',
      description: 'We are open',
      details: 'Mon - Fri: 9 AM - 6 PM PST',
    },
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <ContactCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              details={card.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
