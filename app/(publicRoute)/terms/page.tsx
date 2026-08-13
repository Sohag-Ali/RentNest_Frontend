"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { FileText, Shield } from "lucide-react";

export default function TermsPage() {
  return (
    <InfoPageLayout
      badge="Terms of Service"
      badgeIcon={<FileText className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Terms of Service"
      subtitle="The terms and conditions governing the use of the Thikana rental platform for renters and property hosts."
    >
      <div className="space-y-8 max-w-4xl mx-auto p-8 rounded-3xl bg-card border border-border/80 shadow-xs text-xs sm:text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">1. User Agreement</h2>
          <p>By accessing or using Thikana, you agree to comply with all terms and applicable laws in Bangladesh. Users must be at least 18 years old to list or book properties.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">2. Property Listings & Accuracy</h2>
          <p>Landlords are responsible for providing accurate property photos, descriptions, monthly rent prices in Taka (৳), and deposit terms. Fraudulent or misleading listings will be terminated immediately.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">3. Booking & Payment Terms</h2>
          <p>Tenants agree to pay the designated rent and security deposit. Payment processing is facilitated via authorized digital gateways.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">4. Governing Law</h2>
          <p>These terms are governed by the laws of Bangladesh. Any legal disputes shall be subject to the exclusive jurisdiction of the courts in Dhaka.</p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
