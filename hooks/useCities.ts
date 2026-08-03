"use client";

import { useQuery } from "@tanstack/react-query";
import { cityService } from "@/services/city.service";
import { CityData } from "@/types/city";

/**
 * Custom React Query hook for fetching cities dynamically from backend API.
 * Uses queryKey ["cities"] and 10-minute staleTime cache.
 */
export function useCities() {
  return useQuery<CityData[], Error>({
    queryKey: ["cities"],
    queryFn: () => cityService.getCities(),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    gcTime: 15 * 60 * 1000, // 15 minutes garbage collection
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
