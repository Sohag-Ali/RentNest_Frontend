import { Skeleton } from "@/components/ui/skeleton";
import {
  PropertyGridSkeleton,
  SearchSkeleton,
  SidebarSkeleton,
} from "@/components/properties/property-skeleton";

export default function PropertiesLoading() {
  return (
    <main className="min-h-screen bg-background pt-24 sm:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between pb-2 border-b border-border/40 mb-8">
        <div className="space-y-3">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-10 w-80 max-w-full" />
          <Skeleton className="h-4 w-96 max-w-full font-medium" />
        </div>
        <Skeleton className="h-10 w-56 rounded-xl" />
      </div>

      <SearchSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <SidebarSkeleton />
        </div>
        <div className="lg:col-span-3">
          <PropertyGridSkeleton viewMode="grid" count={6} />
        </div>
      </div>
    </main>
  );
}
