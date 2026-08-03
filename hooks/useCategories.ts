"use client";

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/category";

/**
 * Custom React Query hook for fetching categories dynamically from backend API.
 * Configured with 10-minute staleTime cache for optimal performance.
 */
export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    gcTime: 15 * 60 * 1000, // 15 minutes garbage collection time
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
