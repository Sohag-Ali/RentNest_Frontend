"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Users, Heart, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const OPEN_POSITIONS = [
  {
    title: "Senior Full-Stack Engineer (Next.js & Node.js)",
    department: "Engineering",
    location: "Dhaka, Bangladesh (Hybrid)",
    type: "Full-time",
    description: "Lead the frontend architecture and backend integration for Thikana's web platform, search engine, and landlord dashboard.",
  },
  {
    title: "Lead Product Manager - Rental Experience",
    department: "Product",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    description: "Shape the future of property verification, automated lease signing, and digital payment experiences for renters and hosts.",
  },
  {
    title: "Real Estate Property Operations Specialist",
    department: "Operations",
    location: "Gulshan, Dhaka",
    type: "Full-time",
    description: "Manage physical property verification inspections, landlord onboarding, and quality compliance across Dhaka cities.",
  },
  {
    title: "Growth & Performance Marketing Lead",
    department: "Marketing",
    location: "Remote (Bangladesh)",
    type: "Full-time",
    description: "Drive user acquisition strategies, SEO growth, social media campaigns, and tenant referral programs.",
  },
];

const PERKS = [
  {
    icon: Zap,
    title: "Competitive Compensation",
    description: "Top-of-market base salary, annual performance bonuses, and stock options.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive medical insurance coverage for you and your direct dependents.",
  },
  {
    icon: Users,
    title: "Hybrid Work Flexibility",
    description: "Flexible working hours and hybrid remote options to boost work-life balance.",
  },
  {
    icon: Shield,
    title: "Learning & Growth",
    description: "Annual learning stipends for conferences, courses, and technical certifications.",
  },
];

export default function CareersPage() {
  return (
    <InfoPageLayout
      badge="Join Our Team"
      badgeIcon={<Briefcase className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Build the Future of Property Rentals"
      subtitle="Help us revolutionize real estate rentals in Bangladesh. We're looking for passionate problem solvers, engineers, and real estate innovators."
      ctaTitle="Don't See Your Role Listed?"
      ctaDescription="We are always looking for exceptional talent. Send your resume and portfolio to careers@thikana.com."
      ctaButtonText="Email Your Resume"
      ctaButtonHref="mailto:careers@thikana.com"
    >
      <div className="space-y-16">
        {/* Why Work With Us Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Work at Thikana?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              We empower our team to take ownership, solve high-impact challenges, and build tools that empower millions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="p-6 rounded-3xl bg-card border border-border/80 shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{perk.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Positions List */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                Open Positions
              </h2>
              <p className="text-xs text-muted-foreground">
                Find your next career opportunity below.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary self-start sm:self-auto">
              {OPEN_POSITIONS.length} Active Listings
            </span>
          </div>

          <div className="space-y-4">
            {OPEN_POSITIONS.map((position) => (
              <div
                key={position.title}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-500/10 text-primary">
                      {position.department}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      {position.location}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      {position.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{position.title}</h3>
                  <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
                    {position.description}
                  </p>
                </div>

                <a href={`mailto:careers@thikana.com?subject=Application for ${encodeURIComponent(position.title)}`}>
                  <Button
                    size="sm"
                    className="rounded-2xl px-5 h-10 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shrink-0 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
