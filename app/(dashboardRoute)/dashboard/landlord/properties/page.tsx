import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/service/getCurrentUser";
import { getProperties } from "@/app/(publicRoute)/properties/_actions/property.action";
import { LandlordPropertyList } from "./_components/landlord-property-list";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Building2Icon, PlusIcon, SparklesIcon } from "lucide-react";

/**
 * Landlord Properties Page (Server Component)
 * Route: /dashboard/landlord/properties
 * 
 * Fetches all properties from GET https://rentnest-backend-ezd1.onrender.com/api/properties
 * Filters properties so ONLY the logged-in landlord's created properties are shown.
 */
export default async function LandlordPropertiesPage() {
  const userRes = await getCurrentUser();
  const user = userRes?.data;

  // 1. Redirect to login if user is not authenticated
  if (!user) {
    redirect("/auth/login?redirect=/dashboard/landlord/properties");
  }

  // 2. Fetch all properties from backend API endpoint
  const allProperties: Property[] = await getProperties();

  // 3. Filter to ONLY include properties created by the current landlord
  const landlordProperties = allProperties.filter((property: Property) => {
    if (!user) return false;

    const propertyLandlordId = property.landlord?.id || (property as any).landlordId;
    const propertyLandlordEmail = property.landlord?.email;

    return (
      (propertyLandlordId && user.id && propertyLandlordId === user.id) ||
      (propertyLandlordId && user._id && propertyLandlordId === user._id) ||
      (propertyLandlordEmail &&
        user.email &&
        propertyLandlordEmail.toLowerCase() === user.email.toLowerCase()) ||
      (user.id && (property as any).userId === user.id)
    );
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1">
              <SparklesIcon className="h-3 w-3" /> Landlord Portal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            My Property Listings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            View, manage, and monitor your personal rental property portfolio.
          </p>
        </div>

        <Link href="/dashboard/landlord/properties/new">
          <Button className="rounded-2xl gap-2 font-bold text-xs bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all">
            <PlusIcon className="h-4 w-4" />
            <span>Add New Property</span>
          </Button>
        </Link>
      </div>

      {/* Landlord Property Grid & Stats Container */}
      <LandlordPropertyList properties={landlordProperties} user={user} />
    </div>
  );
}
