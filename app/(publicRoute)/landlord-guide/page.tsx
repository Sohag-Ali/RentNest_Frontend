"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { BookOpen, Camera, DollarSign, FileText, ShieldAlert, CheckCircle2 } from "lucide-react";

const GUIDELINES = [
  {
    icon: Camera,
    title: "High-Quality Photography Tips",
    tips: [
      "Photograph rooms during peak natural daylight with all curtains drawn open.",
      "Capture wide-angle shots of the main drawing room, master bedroom, kitchen, and balcony.",
      "Highlight modern fixtures, kitchen cabinets, generator backup, and parking spaces.",
    ],
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing Strategy (৳)",
    tips: [
      "Compare rents for similar 2-bed/3-bed apartments in your specific sector or neighborhood.",
      "Factor in service charges, maintenance fees, and generator/lift electricity costs.",
      "Set reasonable deposit expectations (typically 2 to 3 months base rent in Bangladesh).",
    ],
  },
  {
    icon: FileText,
    title: "Legal & Lease Agreement Best Practices",
    tips: [
      "Always execute a written tenancy agreement specifying notice periods and rent due dates.",
      "Include clear clauses regarding utility bill payment responsibility and maintenance.",
      "Require NID copies and emergency contact details for all adult occupants.",
    ],
  },
];

export default function LandlordGuidePage() {
  return (
    <InfoPageLayout
      badge="Property Management"
      badgeIcon={<BookOpen className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Landlord Success Guide"
      subtitle="Master property listing optimization, tenant screening, legal compliance, and rental yield maximization in Bangladesh."
      ctaTitle="Ready to List Your Rental Property?"
      ctaDescription="Apply these tips and publish your verified property listing on Thikana today."
      ctaButtonText="List Property Now"
      ctaButtonHref="/list-property"
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUIDELINES.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="p-8 rounded-3xl bg-card border border-border/80 shadow-xs space-y-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{g.title}</h3>
                <div className="space-y-3">
                  {g.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InfoPageLayout>
  );
}
