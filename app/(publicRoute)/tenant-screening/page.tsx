"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { UserCheck, ShieldCheck, FileText, CheckCircle2, Lock, Sparkles } from "lucide-react";

const CHECKS = [
  {
    title: "National ID (NID) & Passport Verification",
    description: "Every applicant's identity is cross-checked against official government identification documents to prevent identity fraud.",
  },
  {
    title: "Employment & Income Verification",
    description: "Tenants provide proof of stable income or employment verification to ensure reliable monthly rent payments.",
  },
  {
    title: "Rental History & References",
    description: "Review ratings and previous landlord feedback to evaluate tenant reliability, maintenance care, and payment punctuality.",
  },
  {
    title: "Background & Security Screening",
    description: "Comprehensive verification to give property owners complete peace of mind before handing over keys.",
  },
];

export default function TenantScreeningPage() {
  return (
    <InfoPageLayout
      badge="Verification System"
      badgeIcon={<UserCheck className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Comprehensive Tenant Screening"
      subtitle="Thikana's multi-tier verification process protects hosts and ensures peaceful, reliable rental relationships."
      ctaTitle="Protect Your Property with Verified Renters"
      ctaDescription="List your property on Thikana to access background-checked, reliable tenants."
      ctaButtonText="List Property Free"
      ctaButtonHref="/list-property"
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CHECKS.map((check) => (
            <div
              key={check.title}
              className="p-8 rounded-3xl bg-card border border-border/80 shadow-xs space-y-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{check.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {check.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </InfoPageLayout>
  );
}
