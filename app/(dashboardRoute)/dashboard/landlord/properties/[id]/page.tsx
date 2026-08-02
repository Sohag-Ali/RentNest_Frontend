import React from "react";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/service/getCurrentUser";
import { getProperty } from "@/app/(publicRoute)/properties/_actions/property.action";
import { EditPropertyClientForm } from "./_components/edit-property-client-form";
import { Button } from "@/components/ui/button";
import { ShieldAlertIcon, ArrowLeftIcon, LogInIcon, Building2Icon } from "lucide-react";

interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Landlord Edit Property Page (Server Component)
 * Route: /dashboard/landlord/properties/[id]
 * 
 * Authorization Guard:
 * Ensures only users logged in with the LANDLORD role who OWN this property can edit it.
 */
export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const resolvedParams = await params;
  const propertyId = resolvedParams.id;

  const userRes = await getCurrentUser();
  const user = userRes?.data;

  // 1. Redirect unauthenticated users to login
  if (!user) {
    redirect(`/auth/login?redirect=/dashboard/landlord/properties/${propertyId}`);
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
            Only accounts with the <span className="font-semibold text-foreground">LANDLORD</span> role are allowed to edit property listings. Your current account role is{" "}
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

  // 3. Fetch property details by ID
  const property = await getProperty(propertyId);

  if (!property) {
    notFound();
  }

  // 4. Verify property ownership (Ensure landlord only edits their own property)
  const propertyLandlordId = property.landlord?.id || (property as any).landlordId;
  const propertyLandlordEmail = property.landlord?.email;

  const isOwner =
    (propertyLandlordId && user.id && propertyLandlordId === user.id) ||
    (propertyLandlordId && user._id && propertyLandlordId === user._id) ||
    (propertyLandlordEmail &&
      user.email &&
      propertyLandlordEmail.toLowerCase() === user.email.toLowerCase()) ||
    (user.id && (property as any).userId === user.id);

  if (!isOwner) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-amber-500/10 text-amber-500 mb-2">
          <Building2Icon className="h-12 w-12" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Property Access Restricted
          </h2>
          <p className="text-sm text-muted-foreground">
            You do not have permission to edit this property listing because it belongs to another landlord account.
          </p>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Button variant="outline">
            <Link href="/dashboard/landlord/properties" className="flex items-center gap-1.5">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to My Properties
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Render client edit form pre-populated with property details
  return <EditPropertyClientForm property={property} user={user} />;
}
