'use client';

import { Mail, Phone, MapPin, Globe, Clock, ShieldCheck, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Head Office Address',
      value: '123 Rental Street, Suite 400, San Francisco, CA 94105',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: Mail,
      title: 'Email Address',
      value: 'support@thikana.com',
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    },
    {
      icon: Phone,
      title: 'Direct Phone',
      value: '+1-800-THIKANA (+1 800-736-8637)',
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    },
    {
      icon: Globe,
      title: 'Website',
      value: 'www.thikana.com',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM PST (Sat: 10:00 AM - 4:00 PM)',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <Card variant="glass" className="p-6 sm:p-8 lg:p-10 rounded-3xl shadow-luxury border border-border/80 h-full flex flex-col justify-between relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Company Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-teal-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/25">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                Thikana Inc.
              </h3>
              <p className="text-xs text-primary font-semibold">
                Premium Rental Platform
              </p>
            </div>
          </div>

          <Badge variant="success" className="gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </Badge>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
          Dedicated to providing 100% verified rentals, direct landlord communication, and seamless digital lease agreements.
        </p>

        <Separator className="my-6 bg-border/60" />

        {/* Contact Items List */}
        <div className="space-y-4">
          {contactDetails.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-card/60 border border-border/60 transition-all hover:border-primary/30"
              >
                <div className={`p-2.5 rounded-xl border ${item.color} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-foreground truncate mt-0.5">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground">
          Need urgent support? Visit our{' '}
          <a href="/faq" className="text-primary font-semibold hover:underline">
            Help Center & FAQ
          </a>
        </p>
      </div>
    </Card>
  );
}
