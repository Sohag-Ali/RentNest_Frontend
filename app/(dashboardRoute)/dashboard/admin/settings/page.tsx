import React from "react";
import { SettingsView } from "@/components/settings/SettingsView";

export const metadata = {
  title: "Admin System Settings | Thikana Dashboard",
  description: "Configure system security, admin notifications, and platform preferences.",
};

export default function AdminSettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <SettingsView role="ADMIN" />
    </div>
  );
}
