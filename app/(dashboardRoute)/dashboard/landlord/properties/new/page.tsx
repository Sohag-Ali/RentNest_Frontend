import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/service/getCurrentUser";
import { CreatePropertyClientForm } from "../create/_components/create-property-client-form";
import { Button } from "@/components/ui/button";
import { ShieldAlertIcon, ArrowLeftIcon, LogInIcon } from "lucide-react";

/**
 * Landlord New Property Page (Server Component)
 * Route: /dashboard/landlord/properties/new
 * 
 * Authorization Guard:
 * Ensures only users logged in with the LANDLORD role can access and create property listings.
 */
export default async function NewPropertyPage() {
  const userRes = await getCurrentUser();
  const user = userRes?.data;

  // 1. Redirect unauthenticated users to login
  if (!user) {
    redirect("/auth/login?redirect=/dashboard/landlord/properties/new");
  }

  // 2. Validate user role is LANDLORD
  const normalizedRole = user.role?.toUpperCase();
  const isLandlord = normalizedRole === "LANDLORD";

  if (!isLandlord) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-destructive/10 text-destructive mb-2">
          <ShieldAlertIcon className="h-12 w-12" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Landlord Authorization Required
          </h2>
          <p className="text-sm text-muted-foreground">
            Only accounts with the <span className="font-semibold text-foreground">LANDLORD</span> role are allowed to post property listings. Your current account role is{" "}
            <span className="font-semibold text-destructive uppercase">
              {user.role || "TENANT"}
            </span>.
          </p>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Button variant="outline">
            <Link href="/dashboard" className="flex items-center gap-1.5">
              <ArrowLeftIcon className="h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
          <Button className="bg-primary text-primary-foreground">
            <Link href="/auth/login" className="flex items-center gap-1.5">
              <LogInIcon className="h-4 w-4" />
              Switch Account
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Render client form initialized with blank values for authorized Landlord
  return <CreatePropertyClientForm user={user} />;
}