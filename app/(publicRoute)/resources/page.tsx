"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { FolderGit2, FileText, Download, Calculator, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESOURCES = [
  {
    icon: FileText,
    title: "Standard Residential Lease Agreement Template (BD)",
    category: "Legal Document",
    description: "A legally compliant 2-party rental agreement template covering rent terms, deposit refund, and notice periods.",
    format: "PDF / Word",
  },
  {
    icon: Calculator,
    title: "Rental Yield & ROI Calculator Guide",
    category: "Financial Tool",
    description: "Calculate your net annual rental yield, maintenance costs, and return on real estate investment in Dhaka & Chittagong.",
    format: "Interactive Guide",
  },
  {
    icon: BarChart3,
    title: "Bangladesh Urban Rental Market Report 2026",
    category: "Market Report",
    description: "Comprehensive data on rental price trends, demand hotspots, and tenant demographics across major Bangladeshi cities.",
    format: "PDF Report",
  },
];

export default function ResourcesPage() {
  return (
    <InfoPageLayout
      badge="Resource Center"
      badgeIcon={<FolderGit2 className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Landlord & Tenant Resources"
      subtitle="Download official templates, market reports, legal guides, and financial tools to make informed real estate decisions."
      ctaTitle="Need Custom Rental Agreements or Legal Counsel?"
      ctaDescription="Our support team can connect you with property specialists and documentation support."
      ctaButtonText="Contact Support"
      ctaButtonHref="/contact"
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESOURCES.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="p-8 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary">
                      {r.category}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-primary flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug">{r.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-mono">{r.format}</span>
                  <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs font-semibold gap-1 cursor-pointer">
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InfoPageLayout>
  );
}
