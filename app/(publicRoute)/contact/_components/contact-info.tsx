'use client';

import { Mail, Phone, MapPin, Globe, Clock, Building } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export function ContactInfo() {
  return (
    <div className="w-full lg:w-1/2">
      <Card className="p-8 border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full">
        {/* Company Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 bg-primary/10 border-2 border-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg">
                RN
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold text-foreground">RentNest</h3>
              <p className="text-muted-foreground text-sm">Premium Rental Platform</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            We&apos;re dedicated to making rental management simple, transparent, and accessible for everyone.
          </p>
        </div>

        <Separator className="my-6" />

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Address */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Office Address</h4>
              <p className="text-muted-foreground text-sm">123 Rental Street, San Francisco, CA 94105</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Email</h4>
              <p className="text-muted-foreground text-sm">support@rentnest.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <Phone className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Phone</h4>
              <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <Globe className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Website</h4>
              <p className="text-muted-foreground text-sm">www.rentnest.com</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
              <div className="text-muted-foreground text-sm space-y-1">
                <p>Monday - Friday: 9 AM - 6 PM PST</p>
                <p>Saturday: 10 AM - 4 PM PST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
