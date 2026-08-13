"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { LifeBuoy, Search, FileText, UserCheck, Shield, CreditCard, MessageSquare, PhoneCall } from "lucide-react";
import Link from "next/link";

const TOPICS = [
  {
    icon: Search,
    title: "Renter Getting Started",
    description: "Learn how to create an account, search properties, and submit viewing requests.",
    link: "/how-it-works",
  },
  {
    icon: UserCheck,
    title: "Landlord Onboarding & Verification",
    description: "Guidelines for listing properties, completing host NID checks, and setting rents in Taka (৳).",
    link: "/list-property",
  },
  {
    icon: CreditCard,
    title: "Payments & Rent Receipts",
    description: "Understand digital payment security, bKash / Nagad / Bank transfers, and automatic receipts.",
    link: "/safety",
  },
  {
    icon: Shield,
    title: "Trust, Safety & Security",
    description: "Scam prevention guidelines, verified badges, and reporting security concerns.",
    link: "/safety",
  },
];

export default function HelpPage() {
  return (
    <InfoPageLayout
      badge="Help Center"
      badgeIcon={<LifeBuoy className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Thikana Help Center"
      subtitle="Find step-by-step guides, troubleshooting articles, and direct support resources."
      ctaTitle="Need Personal Support?"
      ctaDescription="Our customer support team is available via email and phone 7 days a week."
      ctaButtonText="Contact Support Team"
      ctaButtonHref="/contact"
    >
      <div className="space-y-12">
        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOPICS.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.title}
                href={topic.link}
                className="p-6 rounded-3xl bg-card border border-border/80 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 space-y-3 block"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">{topic.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {topic.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </InfoPageLayout>
  );
}
