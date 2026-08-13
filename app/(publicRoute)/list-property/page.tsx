"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { Building2, PlusCircle, CheckCircle2, ShieldCheck, DollarSign, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BENEFITS = [
  {
    icon: Users,
    title: "Access 100,000+ Active Renters",
    description: "Connect directly with verified tenants in Gulshan, Banani, Dhanmondi, Uttara, Mirpur, Chittagong, and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Broker Commissions",
    description: "Keep 100% of your rental income. No middleman fees or hidden agency cuts.",
  },
  {
    icon: Building2,
    title: "Earn the Verified Host Badge",
    description: "Build trust with renters through our fast NID verification and property quality inspection.",
  },
  {
    icon: CheckCircle2,
    title: "Automated Digital Payouts",
    description: "Receive monthly rent payouts directly via bank transfer, bKash, or Nagad with instant receipts.",
  },
];

export default function ListPropertyPage() {
  return (
    <InfoPageLayout
      badge="Landlord Portal"
      badgeIcon={<Building2 className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="List Your Property on Thikana"
      subtitle="Reach thousands of verified tenants, automate rent collection, and manage listings effortlessly."
      ctaTitle="Ready to Create Your Property Listing?"
      ctaDescription="It takes less than 3 minutes to publish your apartment, villa, or office space on Thikana."
      ctaButtonText="Create Listing Now"
      ctaButtonHref="/dashboard/landlord/properties/create"
    >
      <div className="space-y-16">
        {/* Main CTA Hero Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Free Landlord Listing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Publish Your Property in 3 Easy Steps
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Upload photos, set monthly rent in Taka (৳), define security deposit terms, and start receiving booking applications immediately.
            </p>
          </div>

          <Link href="/dashboard/landlord/properties/create" className="shrink-0">
            <Button
              size="lg"
              className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-md gap-2 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>List Property Now</span>
            </Button>
          </Link>
        </div>

        {/* Benefits Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Landlords Prefer Thikana
            </h2>
            <p className="text-sm text-muted-foreground">
              Built specifically for the real estate landscape in Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="p-6 rounded-3xl bg-card border border-border/80 shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
