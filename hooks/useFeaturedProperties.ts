"use client";

import { useQuery } from "@tanstack/react-query";
import { propertyService } from "@/services/property.service";
import { Property } from "@/types/property";

/**
 * Custom React Query hook for fetching featured properties dynamically from backend.
 * Endpoint: GET /api/properties/featured
 * Configured with 10-minute staleTime cache for performance optimization.
 */
export function useFeaturedProperties() {
  return useQuery<Property[], Error>({
    queryKey: ["featuredProperties"],
    queryFn: () => propertyService.getFeaturedProperties(),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    gcTime: 15 * 60 * 1000, // 15 minutes garbage collection
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
