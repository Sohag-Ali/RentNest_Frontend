"use client";

import React from "react";
import Link from "next/link";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, PropertyFormValues } from "@/schemas/property.schema";
import { useCreateProperty } from "@/hooks/useCreateProperty";
import { CreatePropertyInput } from "@/types/property";
import { User } from "@/lib/types/user.type";
import { QueryProvider } from "@/components/providers/query-provider";

import { Form } from "@/components/ui/form";
import { BasicInfo } from "@/components/property-form/BasicInfo";
import { LocationInfo } from "@/components/property-form/LocationInfo";
import { PropertyDetails } from "@/components/property-form/PropertyDetails";
import { ImagesSection } from "@/components/property-form/ImagesSection";
import { AmenitiesSection } from "@/components/property-form/AmenitiesSection";
import { OverviewSection } from "@/components/property-form/OverviewSection";
import { SubmitSection } from "@/components/property-form/SubmitSection";

import {
  ChevronRightIcon,
  HomeIcon,
  Building2Icon,
  PlusCircleIcon,
  SparklesIcon,
  UserCheckIcon,
} from "lucide-react";
import { toast } from "sonner";

// Blank initial default values for empty property creation state
const blankDefaultValues: PropertyFormValues = {
  title: "",
  slug: "",
  description: "",
  detailedDescription: "",
  location: "",
  city: "",
  state: "",
  price: 0,
  bedrooms: 1,
  bathrooms: 1,
  areaSqFt: 0,
  isFeatured: false,
  isAvailable: true,
  mainImage: "",
  images: [{ url: "" }],
  amenities: [{ name: "" }],
  categoryId: "Villa",
  overview: {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    availableFrom: "",
    status: "Available",
    yearBuilt: new Date().getFullYear(),
    depositAmount: 0,
    leaseTerm: "",
    petPolicy: "Cats Allowed",
    parkingType: "3 Car Attached Garage",
  },
};

interface CreatePropertyClientFormProps {
  user?: User | null;
}

function PropertyFormContent({ user }: CreatePropertyClientFormProps) {
  const mutation = useCreateProperty();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema) as any,
    defaultValues: blankDefaultValues,
    mode: "onTouched",
  });

  const onSubmit = (values: PropertyFormValues) => {
    const payload: CreatePropertyInput = {
      ...values,
      images: values.images.map((img: any) => img.url).filter(Boolean),
      amenities: values.amenities.map((item: any) => item.name).filter(Boolean),
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        form.reset(blankDefaultValues);
      },
    });
  };

  const onError = (errors: FieldErrors<PropertyFormValues>) => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0];
      const errorElement =
        document.getElementById(firstKey) ||
        document.querySelector(`[name="${firstKey}"]`);

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        (errorElement as HTMLElement).focus?.();
      }
    }
    toast.error("Please resolve the highlighted form errors before saving.");
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 min-h-screen pb-24">
      {/* Navigation Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <Link
          href="/dashboard/landlord"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <HomeIcon className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground/60" />
        <Link
          href="/dashboard/landlord/properties"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <Building2Icon className="h-3.5 w-3.5" />
          <span>Properties</span>
        </Link>
        <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground/60" />
        <span className="text-foreground font-semibold flex items-center gap-1">
          <PlusCircleIcon className="h-3.5 w-3.5 text-primary" />
          Create Property
        </span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1">
              <SparklesIcon className="h-3 w-3" /> Landlord Portal
            </span>
            {user?.email && (
              <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium flex items-center gap-1">
                <UserCheckIcon className="h-3 w-3 text-emerald-500" />
                {user.email} (Landlord)
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            Create Property Listing
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Fill out property specifications to publish your residence for potential tenants.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <Form {...(form as any)}>
        <form
          onSubmit={form.handleSubmit(onSubmit as any, onError as any)}
          className="space-y-8"
        >
          {/* Section 1: Basic Info */}
          <BasicInfo form={form} />

          {/* Section 2: Location */}
          <LocationInfo form={form} />

          {/* Section 3: Property Details */}
          <PropertyDetails form={form} />

          {/* Section 4: Media & Gallery Images */}
          <ImagesSection form={form} />

          {/* Section 5: Amenities */}
          <AmenitiesSection form={form} />

          {/* Section 6: Overview & Options */}
          <OverviewSection form={form} />

          {/* Section 7: Sticky Action Footer */}
          <SubmitSection
            isSubmitting={mutation.isPending || form.formState.isSubmitting}
            onCancel={() => form.reset(blankDefaultValues)}
          />
        </form>
      </Form>
    </div>
  );
}

export function CreatePropertyClientForm({ user }: CreatePropertyClientFormProps) {
  return (
    <QueryProvider>
      <PropertyFormContent user={user} />
    </QueryProvider>
  );
}
