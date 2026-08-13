"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { ShieldCheck, Lock, AlertTriangle, Eye, CheckCircle2, UserCheck, FileCheck, PhoneCall } from "lucide-react";

const SAFETY_PILLARS = [
  {
    icon: UserCheck,
    title: "100% Identity Verification",
    description: "Every landlord and tenant on Thikana undergoes national identity (NID) and phone number verification before listing or booking.",
  },
  {
    icon: Lock,
    title: "Protected Digital Payments",
    description: "Never send money via unverified cash channels. Thikana holds payments securely until rental confirmation.",
  },
  {
    icon: Eye,
    title: "In-Person & Virtual Inspections",
    description: "Our quality team physically inspects listings to ensure photos, amenities, and locations match reality 100%.",
  },
  {
    icon: FileCheck,
    title: "Standardized Lease Agreements",
    description: "Protect your legal rights with digital lease agreements compliant with Bangladesh tenancy guidelines.",
  },
];

const SCAM_PREVENTION_RULES = [
  "Never wire cash or transfer money outside the official Thikana platform.",
  "Always schedule a viewing and inspect the physical property or request a live video tour before signing.",
  "Verify that the landlord's name on the listing matches their official NID or ownership documents.",
  "Report suspicious listings, requests for off-platform payments, or unusual behavior immediately to support@thikana.com.",
];

export default function SafetyPage() {
  return (
    <InfoPageLayout
      badge="Safety & Protection"
      badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Trust & Safety Center"
      subtitle="Your security is our highest priority. Learn how Thikana protects tenants and property owners at every step of the rental journey."
      ctaTitle="Encountered Something Suspicious?"
      ctaDescription="Our dedicated Trust & Safety team investigates all reports within 2 hours."
      ctaButtonText="Report a Security Concern"
      ctaButtonHref="mailto:safety@thikana.com"
    >
      <div className="space-y-16">
        {/* Safety Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Our 4 Pillars of Rental Protection
            </h2>
            <p className="text-sm text-muted-foreground">
              Built from the ground up to eradicate rental fraud and unverified middleman scams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAFETY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-3xl bg-card border border-border/80 shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{pillar.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scam Prevention Checklist */}
        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Scam Prevention Checklist</h2>
              <p className="text-xs text-muted-foreground">Essential safety rules for every tenant in Bangladesh.</p>
            </div>
          </div>

          <div className="space-y-3">
            {SCAM_PREVENTION_RULES.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 text-xs text-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
