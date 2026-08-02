import React from "react";
import { getCurrentUser } from "@/service/getCurrentUser";
import { SettingsView } from "@/components/settings/SettingsView";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserX } from "lucide-react";

export const metadata = {
  title: "Account Settings | RentNest",
  description: "Manage your RentNest account security, notification alerts, and app preferences.",
};

export default async function PublicSettingsPage() {
  const response = await getCurrentUser();

  if (!response?.success || !response?.data) {
    return (
      <div className="p-12 text-center max-w-md mx-auto my-12">
        <div className="h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
          <UserX className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Login Required</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please log in to your account to view and manage your settings.
        </p>
        <Link href="/auth/login">
          <Button className="rounded-xl">Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <SettingsView role={response.data.role} />
    </div>
  );
}
