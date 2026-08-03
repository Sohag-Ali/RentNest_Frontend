"use client";

import { useQuery } from "@tanstack/react-query";
import { bookingService } from "@/services/booking.service";
import { LandlordBookingsParams, LandlordBookingsResponse } from "@/types/booking";

export function useLandlordBookings(params?: LandlordBookingsParams) {
  const query = useQuery<LandlordBookingsResponse, Error>({
    queryKey: ["landlord-rented-properties", params],
    queryFn: () => bookingService.getLandlordBookings(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });

  const responseData = query.data;
  
  // Extract summary defaults
  const summary = responseData?.summary || {
    totalRentedProperties: 0,
    totalRevenue: 0,
    totalCompletedPayments: 0,
    averagePropertyPrice: 0,
  };

  // Extract meta defaults
  const meta = responseData?.meta || {
    page: params?.page || 1,
    limit: params?.limit || 10,
    total: 0,
    totalPage: 1,
  };

  // Extract array data safely
  const items = Array.isArray(responseData?.data) ? responseData.data : [];

  return {
    ...query,
    summary,
    meta,
    items,
    rawResponse: responseData,
  };
}
