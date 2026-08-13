"use client";

import React from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { ShieldCheck, FileText, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      badge="Legal & Privacy"
      badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="Privacy Policy"
      subtitle="Learn how Thikana collects, uses, and safeguards your personal information when using our rental platform."
    >
      <div className="space-y-8 max-w-4xl mx-auto p-8 rounded-3xl bg-card border border-border/80 shadow-xs text-xs sm:text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">1. Information We Collect</h2>
          <p>We collect personal information that you provide to us, including your name, email address, phone number, national identification (NID), property details, and payment preferences necessary for rental bookings and host verification.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">2. How We Use Your Data</h2>
          <p>Your data is strictly used to facilitate property listings, process rental bookings, verify host identities, issue digital receipts, prevent fraudulent listings, and communicate platform updates.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">3. Data Sharing & Security</h2>
          <p>We do not sell your personal data to third parties. We employ high-grade encryption (TLS/SSL) and industry-standard access controls to secure user records and transaction histories.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground">4. Contact Privacy Team</h2>
          <p>If you have questions regarding our privacy practices or wish to request data deletion, contact us at <a href="mailto:privacy@thikana.com" className="text-primary underline">privacy@thikana.com</a>.</p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
