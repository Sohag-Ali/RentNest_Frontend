'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';

export function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="space-y-4 w-full"
    >
      {/* Primary CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3.5">
        <Link href="/properties">
          <Button
            size="lg"
            className="rounded-2xl px-7 h-13 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all gap-2 flex items-center group cursor-pointer"
          >
            <span>Browse Properties</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <Link href="/dashboard/landlord">
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl px-7 h-13 text-sm font-bold border-border/80 bg-background/60 backdrop-blur-xl hover:bg-muted/80 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2 flex items-center cursor-pointer"
          >
            <Building2 className="h-4 w-4 text-primary" />
            <span>Become a Landlord</span>
          </Button>
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground pt-1">
        <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <ShieldCheck className="h-4 w-4 text-blue-500" />
          <span>Verified Properties</span>
        </div>
        <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>Secure Rental</span>
        </div>
        <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <CheckCircle2 className="h-4 w-4 text-teal-500" />
          <span>Trusted Landlords</span>
        </div>
      </div>
    </motion.div>
  );
}
