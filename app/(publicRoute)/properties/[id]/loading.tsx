import { PropertyDetailsSkeleton } from "@/components/property-details/property-details-skeleton";

export default function PropertyDetailsLoading() {
  return (
    <main className="min-h-screen bg-background pt-24 sm:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <PropertyDetailsSkeleton />
    </main>
  );
}
