import React from "react";
import { SettingsView } from "@/components/settings/SettingsView";

export const metadata = {
  title: "Tenant Settings | RentNest Dashboard",
  description: "Configure your tenant account security, notifications, and app preferences.",
};

export default function TenantSettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <SettingsView role="TENANT" />
    </div>
  );
}
