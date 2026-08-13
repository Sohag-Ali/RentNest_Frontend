"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <InfoPageLayout
      badge="Cookie Policy"
      badgeIcon={<Cookie className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Cookie Policy"
      subtitle="How we use cookies and tracking technologies to enhance your browsing experience on Thikana."
    >
      <div className="space-y-8 max-w-4xl mx-auto p-8 rounded-3xl bg-card border border-border/80 shadow-xs text-xs sm:text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">1. What Are Cookies?</h2>
          <p>Cookies are small text files stored on your browser or device that help us remember your preferences, authentication state, search filters, and theme choices.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">2. Essential & Functional Cookies</h2>
          <p>We use essential cookies to maintain your login session, security tokens, sidebar state, and language preferences. These cannot be disabled as they are required for basic site functionality.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">3. Managing Cookie Preferences</h2>
          <p>You can adjust your browser settings to decline non-essential analytics cookies at any time.</p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
