'use client';

import { Mail, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ContactForm() {
  return (
    <div className="w-full lg:w-1/2">
      <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Send us a Message</h2>
        </div>
        <p className="text-muted-foreground mb-6">We&apos;ll respond as soon as possible</p>

        <Separator className="mb-6" />

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input
                placeholder="John Doe"
                className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input
                type="email"
                placeholder="john@example.com"
                className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Subject</label>
            <Input
              placeholder="How can we help?"
              className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Message</label>
            <Textarea
              placeholder="Tell us more about your inquiry..."
              className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground/40 resize-none"
            />
          </div>

          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
}
