"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { Newspaper, Download, Mail, Calendar, ExternalLink, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const PRESS_RELEASES = [
  {
    date: "August 2026",
    title: "Thikana Rebrands & Launches Enhanced Digital Rental Verification for Bangladesh",
    summary: "Thikana introduces 100% verified listings, automated lease agreements, and transparent Taka currency pricing for property rentals in Dhaka.",
    publication: "TechInAsia",
  },
  {
    date: "June 2026",
    title: "Thikana Surpasses 5,000 Verified Properties Across Major Cities in Bangladesh",
    summary: "The rental platform reports a 300% year-over-year surge in landlord onboarding and tenant bookings in Gulshan, Banani, and Dhanmondi.",
    publication: "The Daily Star",
  },
  {
    date: "March 2026",
    title: "How Digital Verification Is Transforming Bangladesh’s Urban Rental Market",
    summary: "An in-depth report on how Thikana is eradicating fake property listings and hidden middleman commissions for tenants.",
    publication: "Prothom Alo",
  },
];

const PRESS_ASSETS = [
  {
    name: "Thikana Brand Logo Pack (SVG, PNG, EPS)",
    size: "4.2 MB",
    type: "Zip Archive",
  },
  {
    name: "Platform Screenshots & UI Mockups (High-Res)",
    size: "12.8 MB",
    type: "Zip Archive",
  },
  {
    name: "Executive Leadership Photos & Bios",
    size: "6.5 MB",
    type: "Zip Archive",
  },
];

export default function PressPage() {
  return (
    <InfoPageLayout
      badge="Media & Press"
      badgeIcon={<Newspaper className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Press Room & Media Kit"
      subtitle="Find the latest news releases, brand assets, executive announcements, and media contacts for Thikana."
      ctaTitle="Media Inquiries & Interview Requests"
      ctaDescription="Working on a story or need an official comment from the Thikana team? Our media relations team is here to help."
      ctaButtonText="Contact Press Team"
      ctaButtonHref="mailto:press@thikana.com"
    >
      <div className="space-y-16">
        {/* Latest Press Releases */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                Latest News & Coverage
              </h2>
              <p className="text-xs text-muted-foreground">
                Recent announcements and featured articles about Thikana.
              </p>
            </div>
            <Award className="w-6 h-6 text-primary shrink-0" />
          </div>

          <div className="space-y-4">
            {PRESS_RELEASES.map((release) => (
              <div
                key={release.title}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">{release.publication}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {release.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground leading-snug">
                  {release.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {release.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Kit & Assets */}
        <div className="space-y-6">
          <div className="space-y-1 border-b border-border pb-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              Official Media Assets
            </h2>
            <p className="text-xs text-muted-foreground">
              Download approved logos, product screenshots, and leadership assets for editorial use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRESS_ASSETS.map((asset) => (
              <div
                key={asset.name}
                className="p-6 rounded-3xl bg-card border border-border/80 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{asset.name}</h3>
                  <p className="text-[11px] text-muted-foreground">
                    {asset.type} • {asset.size}
                  </p>
                </div>

                <a href="/logo.svg" download className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-2xl h-9 text-xs font-semibold gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Assets</span>
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
