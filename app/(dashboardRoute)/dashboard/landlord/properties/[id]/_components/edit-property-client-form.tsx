"use client";

import React from "react";
import Link from "next/link";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, PropertyFormValues } from "@/schemas/property.schema";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";
import { CreatePropertyInput, Property } from "@/types/property";
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
  PencilIcon,
  SparklesIcon,
  UserCheckIcon,
} from "lucide-react";
import { toast } from "sonner";

interface EditPropertyClientFormProps {
  property: Property;
  user?: User | null;
}

function EditPropertyFormContent({ property, user }: EditPropertyClientFormProps) {
  const mutation = useUpdateProperty();

  // Extract category UUID from property or category object
  const categoryUuid =
    (property.category as any)?.id ||
    property.categoryId ||
    "caec6593-4ec0-413a-b294-52be52a94882";

  const initialValues: PropertyFormValues = {
    title: property.title || "",
    slug: property.slug || "",
    description: property.description || "",
    detailedDescription: property.detailedDescription || "",
    location: property.location || "",
    city: property.city || "",
    state: property.state || "",
    price: Number(property.price) || 0,
    bedrooms: Number(property.bedrooms) || 1,
    bathrooms: Number(property.bathrooms) || 1,
    areaSqFt: Number(property.areaSqFt) || 0,
    isFeatured: Boolean(property.isFeatured),
    isAvailable: Boolean(property.isAvailable),
    mainImage: property.mainImage || property.images?.[0] || "",
    images:
      property.images && property.images.length > 0
        ? property.images.map((url: string) => ({ url }))
        : [{ url: "" }],
    amenities:
      property.amenities && property.amenities.length > 0
        ? property.amenities.map((name: string) => ({ name }))
        : [{ name: "" }],
    categoryId: categoryUuid,
    overview: {
      address: property.overview?.address || "",
      city: property.overview?.city || property.city || "",
      state: property.overview?.state || property.state || "",
      zipCode: property.overview?.zipCode || "",
      availableFrom: property.overview?.availableFrom || "Immediately",
      status: property.overview?.status || "Available",
      yearBuilt: Number(property.overview?.yearBuilt) || 2024,
      depositAmount: Number(property.overview?.depositAmount) || Number(property.price) || 0,
      leaseTerm: property.overview?.leaseTerm || "12 Months",
      petPolicy: property.overview?.petPolicy || "Pets Allowed",
      parkingType: property.overview?.parkingType || "Private Garage",
    },
  };

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema) as any,
    defaultValues: initialValues,
    mode: "onTouched",
  });

  const onSubmit = (values: PropertyFormValues) => {
    // Determine category UUID to match backend category relation
    const finalCategoryId =
      values.categoryId && values.categoryId.length > 20
        ? values.categoryId
        : categoryUuid;

    // Transform form state into clean JSON matching Postman test payload
    const payload: CreatePropertyInput = {
      title: values.title,
      slug: values.slug,
      description: values.description,
      detailedDescription: values.detailedDescription,
      location: values.location,
      city: values.city,
      state: values.state,
      price: Number(values.price),
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      areaSqFt: Number(values.areaSqFt),
      isFeatured: Boolean(values.isFeatured),
      isAvailable: Boolean(values.isAvailable),
      mainImage: values.mainImage,
      images: values.images
        .map((img: any) => (typeof img === "string" ? img : img.url))
        .filter(Boolean),
      amenities: values.amenities
        .map((item: any) => (typeof item === "string" ? item : item.name))
        .filter(Boolean),
      categoryId: finalCategoryId,
      overview: {
        address: values.overview.address,
        city: values.overview.city,
        state: values.overview.state,
        zipCode: values.overview.zipCode,
        availableFrom: values.overview.availableFrom,
        status: values.overview.status,
        yearBuilt: Number(values.overview.yearBuilt),
        depositAmount: Number(values.overview.depositAmount),
        leaseTerm: values.overview.leaseTerm,
        petPolicy: values.overview.petPolicy,
        parkingType: values.overview.parkingType,
      },
    };

    mutation.mutate({ id: property.id, payload });
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
    toast.error("Please resolve the highlighted form errors before saving changes.");
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
          <PencilIcon className="h-3.5 w-3.5 text-primary" />
          Edit Property
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
            Edit Property Listing
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update pricing, amenities, specifications, and availability details for <span className="font-semibold text-foreground">{property.title}</span>.
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
            onCancel={() => form.reset(initialValues)}
          />
        </form>
      </Form>
    </div>
  );
}

export function EditPropertyClientForm({ property, user }: EditPropertyClientFormProps) {
  return (
    <QueryProvider>
      <EditPropertyFormContent property={property} user={user} />
    </QueryProvider>
  );
}
