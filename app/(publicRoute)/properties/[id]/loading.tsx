import { PropertyDetailsSkeleton } from "@/components/property-details/property-details-skeleton"

export default function PropertyDetailsLoading() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <PropertyDetailsSkeleton />
    </main>
  )
}
