"use client";

import React, { useState } from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { Search, Calendar, ShieldCheck, Key, Building2, UserCheck, CreditCard, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RENTER_STEPS = [
  {
    step: "01",
    title: "Search & Filter",
    description: "Browse verified rental apartments and houses across Bangladesh filtered by city, price in Taka (৳), bedrooms, and amenities.",
    icon: Search,
  },
  {
    step: "02",
    title: "Schedule Viewing & Tour",
    description: "Connect directly with verified landlords to schedule an in-person or virtual walkthrough at your convenience.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Submit Rental Booking Request",
    description: "Submit a digital booking request with your preferred move-in date and basic profile details with instant landlord notification.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Secure Digital Payment & Move-In",
    description: "Pay your rent and deposit safely through Thikana digital payment system and receive your official digital agreement and keys.",
    icon: Key,
  },
];

const LANDLORD_STEPS = [
  {
    step: "01",
    title: "List Your Property",
    description: "Create a detailed property listing with high-resolution photos, monthly rent (৳), deposit terms, and lease duration.",
    icon: Building2,
  },
  {
    step: "02",
    title: "Verify Host & Property",
    description: "Complete quick NID verification and property quality inspection to earn the official 'Verified Listing' trust badge.",
    icon: UserCheck,
  },
  {
    step: "03",
    title: "Review & Screen Tenants",
    description: "Receive booking requests from verified tenants, review rental profiles, background details, and approve the best tenant.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Automated Rent Collection",
    description: "Collect monthly rent directly into your bank or mobile financial account (bKash/Nagad) with automated digital receipts.",
    icon: CreditCard,
  },
];

export default function HowItWorksPage() {
  const [activeRole, setActiveRole] = useState<"renter" | "landlord">("renter");

  const steps = activeRole === "renter" ? RENTER_STEPS : LANDLORD_STEPS;

  return (
    <InfoPageLayout
      badge="Step-by-Step Guide"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="How Thikana Works"
      subtitle="Discover how simple, secure, and transparent renting properties can be for both tenants and property owners."
      ctaTitle={activeRole === "renter" ? "Find Your Next Home Today" : "List Your Property on Thikana"}
      ctaDescription={activeRole === "renter" ? "Explore thousands of verified apartments and villas." : "Connect with trusted tenants and collect rent effortlessly."}
      ctaButtonText={activeRole === "renter" ? "Browse Properties" : "List Property Now"}
      ctaButtonHref={activeRole === "renter" ? "/properties" : "/list-property"}
    >
      <div className="space-y-12">
        {/* Role Selector Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-card border border-border/80 shadow-xs">
            <button
              onClick={() => setActiveRole("renter")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeRole === "renter"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Renters
            </button>
            <button
              onClick={() => setActiveRole("landlord")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeRole === "landlord"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Landlords
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-primary/40 transition-all duration-300 space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-primary/30 font-mono">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InfoPageLayout>
  );
}
