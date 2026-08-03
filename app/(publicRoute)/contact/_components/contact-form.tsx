'use client';

import { useState } from 'react';
import { Mail, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <Card variant="glass" className="p-6 sm:p-8 lg:p-10 rounded-3xl shadow-luxury border border-border/80 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              Send us a Message
            </h3>
            <p className="text-xs text-muted-foreground">
              We usually respond within 2 to 4 business hours.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Full Name
            </label>
            <Input
              required
              placeholder="John Doe"
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <Input
              required
              type="email"
              placeholder="john@example.com"
              className="h-11 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Subject
            </label>
            <Input
              required
              placeholder="Inquiry topic..."
              className="h-11 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Your Message
          </label>
          <Textarea
            required
            placeholder="Tell us about your rental needs or questions..."
            className="min-h-[140px] rounded-xl resize-none p-4"
          />
        </div>

        <Button
          type="submit"
          variant="gradient"
          className="w-full h-12 rounded-xl text-base font-semibold gap-2 shadow-md shadow-blue-500/20"
        >
          {submitted ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
              <span>Message Sent Successfully!</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
