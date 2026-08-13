import React from "react";
import { SettingsView } from "@/components/settings/SettingsView";

export const metadata = {
  title: "Landlord Settings | Thikana Dashboard",
  description: "Configure your host security, payouts, notifications, and portal preferences.",
};

export default function LandlordSettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <SettingsView role="LANDLORD" />
    </div>
  );
}
