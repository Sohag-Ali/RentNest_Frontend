"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { Activity, CheckCircle2, Server, Database, ShieldCheck, Globe, Smartphone } from "lucide-react";

const SERVICES = [
  {
    name: "Web Application & Frontend",
    status: "Operational",
    uptime: "99.98%",
    icon: Globe,
  },
  {
    name: "Property Search API & Backend Services",
    status: "Operational",
    uptime: "99.95%",
    icon: Server,
  },
  {
    name: "Payment Gateway (bKash, Nagad, Stripe)",
    status: "Operational",
    uptime: "99.99%",
    icon: Smartphone,
  },
  {
    name: "Database & Authentication Services",
    status: "Operational",
    uptime: "100.00%",
    icon: Database,
  },
  {
    name: "Property Verification & Security Engine",
    status: "Operational",
    uptime: "99.97%",
    icon: ShieldCheck,
  },
];

export default function StatusPage() {
  return (
    <InfoPageLayout
      badge="System Health"
      badgeIcon={<Activity className="w-3.5 h-3.5 text-emerald-500" />}
      title="Thikana System Status"
      subtitle="Real-time operational status and performance monitoring for all Thikana services and payment systems."
      ctaTitle="Experiencing Any Technical Issues?"
      ctaDescription="If you're having trouble accessing any service, please report it to our engineering team."
      ctaButtonText="Report an Issue"
      ctaButtonHref="/contact"
    >
      <div className="space-y-12 max-w-4xl mx-auto">
        {/* Overall Status Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-foreground">All Systems Operational</h2>
              <p className="text-xs text-muted-foreground">All core services, APIs, and payment gateways are running smoothly.</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500">
            100% Healthy
          </span>
        </div>

        {/* Services Health List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground border-b border-border pb-3">Service Health Metrics</h3>
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="p-5 rounded-3xl bg-card border border-border/80 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{service.name}</h4>
                    <p className="text-[11px] text-muted-foreground font-mono">Uptime: {service.uptime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-500">{service.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InfoPageLayout>
  );
}
