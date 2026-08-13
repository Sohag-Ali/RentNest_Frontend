"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { Eye, CheckCircle2 } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <InfoPageLayout
      badge="Accessibility"
      badgeIcon={<Eye className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Accessibility Statement"
      subtitle="Thikana is committed to ensuring digital accessibility for people of all abilities."
    >
      <div className="space-y-8 max-w-4xl mx-auto p-8 rounded-3xl bg-card border border-border/80 shadow-xs text-xs sm:text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">1. Our Commitment</h2>
          <p>We strive to adhere to Web Content Accessibility Guidelines (WCAG 2.1 Level AA) to ensure that screen readers, high contrast modes, and keyboard navigation function seamlessly across our web application.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">2. Accessibility Features</h2>
          <p>Key features include full keyboard navigation support, high-contrast dark and light themes, screen-reader aria labels, scalable typography, and responsive touch targets for mobile users.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">3. Feedback & Assistance</h2>
          <p>If you encounter any accessibility barriers on Thikana, please let us know by emailing <a href="mailto:accessibility@thikana.com" className="text-primary underline">accessibility@thikana.com</a>.</p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
