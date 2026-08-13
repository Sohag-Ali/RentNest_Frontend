"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { Tag, Check, Sparkles, Shield, Building2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PLANS = [
  {
    name: "For Renters",
    price: "৳0",
    period: "Forever Free",
    description: "Search, filter, view properties, and book your dream home with zero hidden broker commissions.",
    features: [
      "Unlimited property browsing & filtering",
      "Direct landlord messaging & viewing scheduling",
      "100% Verified listing guarantee",
      "Digital lease agreement generation",
      "Secure digital rent payments",
    ],
    popular: false,
    buttonText: "Browse Properties",
    buttonHref: "/properties",
  },
  {
    name: "Landlord Starter",
    price: "৳0",
    period: "First 2 Listings",
    description: "Perfect for individual homeowners looking to list properties and find verified tenants quickly.",
    features: [
      "List up to 2 properties for free",
      "Official 'Verified Listing' trust badge",
      "Tenant screening & application review",
      "Automated bKash / Nagad / Bank payouts",
      "Digital rent receipts & payment tracking",
    ],
    popular: true,
    buttonText: "List Property Free",
    buttonHref: "/list-property",
  },
  {
    name: "Landlord Pro",
    price: "৳1,500",
    period: "per month / multi-listing",
    description: "Designed for property managers and building owners managing multiple units in major cities.",
    features: [
      "Unlimited property listings",
      "Featured homepage & city spotlight placement",
      "Priority customer & tenant screening support",
      "Advanced analytics & revenue reports",
      "Dedicated account manager",
    ],
    popular: false,
    buttonText: "Get Pro Access",
    buttonHref: "/contact",
  },
];

export default function PricingPage() {
  return (
    <InfoPageLayout
      badge="Transparent Rates"
      badgeIcon={<Tag className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Simple, Transparent Pricing"
      subtitle="No hidden broker commissions. Free browsing for tenants and affordable plans for property owners."
      ctaTitle="Have Custom Property Portfolio Needs?"
      ctaDescription="Contact our property management solutions team for custom enterprise listing packages."
      ctaButtonText="Talk to Sales"
      ctaButtonHref="/contact"
    >
      <div className="space-y-16">
        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-3xl bg-card border transition-all duration-300 flex flex-col justify-between relative ${
                plan.popular
                  ? "border-primary shadow-xl ring-2 ring-primary/20"
                  : "border-border/80 shadow-xs hover:border-primary/40"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold tracking-wider uppercase shadow-md">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-xs text-muted-foreground font-sans font-normal">/{plan.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/60">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 text-xs text-foreground">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link href={plan.buttonHref} className="block">
                  <Button
                    size="lg"
                    className={`w-full rounded-2xl h-11 text-xs font-bold cursor-pointer ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InfoPageLayout>
  );
}
