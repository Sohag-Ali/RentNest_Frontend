"use client";

import React, { useState, useMemo } from "react";
import { useLandlordBookings } from "@/hooks/useLandlordBookings";
import { BookingStats } from "@/components/dashboard/bookings/BookingStats";
import { BookingSearch } from "@/components/dashboard/bookings/BookingSearch";
import { BookingFilters } from "@/components/dashboard/bookings/BookingFilters";
import { BookingTable } from "@/components/dashboard/bookings/BookingTable";
import { BookingSkeleton } from "@/components/dashboard/bookings/BookingSkeleton";
import { BookingEmpty } from "@/components/dashboard/bookings/BookingEmpty";
import {
  BookingDetailModal,
  ModalType,
} from "@/components/dashboard/bookings/BookingDetailModal";
import { BookingItem } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, AlertTriangle, Building2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandlordBookingsPage() {
  // Query parameters state
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Modal inspection state
  const [activeModalType, setActiveModalType] = useState<ModalType>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);

  // Fetch bookings data with TanStack React Query
  const queryParams = useMemo(
    () => ({
      page,
      limit,
      searchTerm: searchTerm || undefined,
      category: category || undefined,
      city: city || undefined,
      paymentStatus: paymentStatus || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    }),
    [page, limit, searchTerm, category, city, paymentStatus, startDate, endDate]
  );

  const {
    items,
    summary,
    meta,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useLandlordBookings(queryParams);

  // Filter items on frontend as fallback if backend returns unfiltered dataset
  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    return items.filter((item) => {
      // Search term filter (Property Title or Tenant Name/Email)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const propTitle = (item.property?.title || "").toLowerCase();
        const tenantName = (item.tenant?.name || "").toLowerCase();
        const tenantEmail = (item.tenant?.email || "").toLowerCase();
        if (!propTitle.includes(query) && !tenantName.includes(query) && !tenantEmail.includes(query)) {
          return false;
        }
      }

      // Category filter
      if (category && category !== "ALL") {
        const propCat = typeof item.property?.category === "object"
          ? item.property.category?.name
          : item.property?.category || "";
        if (propCat.toLowerCase() !== category.toLowerCase()) {
          return false;
        }
      }

      // City filter
      if (city && city !== "ALL") {
        const propCity = typeof item.property?.city === "object"
          ? item.property.city?.name
          : item.property?.city || item.property?.location || item.property?.address || "";
        if (!propCity.toLowerCase().includes(city.toLowerCase())) {
          return false;
        }
      }

      // Payment Status filter
      if (paymentStatus && paymentStatus !== "ALL") {
        const pStatus = (item.payment?.status || "").toLowerCase();
        if (pStatus !== paymentStatus.toLowerCase()) {
          return false;
        }
      }

      // Date Range filter
      if (startDate || endDate) {
        const moveIn = new Date(item.moveInDate || item.startDate || item.payment?.paidAt || item.createdAt || "");
        if (startDate && !isNaN(moveIn.getTime()) && moveIn < new Date(startDate)) {
          return false;
        }
        if (endDate && !isNaN(moveIn.getTime()) && moveIn > new Date(endDate)) {
          return false;
        }
      }

      return true;
    });
  }, [items, searchTerm, category, city, paymentStatus, startDate, endDate]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategory("");
    setCity("");
    setPaymentStatus("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const handleOpenModal = (type: ModalType, booking: BookingItem) => {
    setSelectedBooking(booking);
    setActiveModalType(type);
  };

  const handleCloseModal = () => {
    setActiveModalType(null);
    setSelectedBooking(null);
  };

  const hasActiveFilters = Boolean(
    searchTerm || category || city || paymentStatus || startDate || endDate
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto min-h-screen">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
              Rented Properties
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-3 w-3" />
              Live Dashboard
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage all successfully rented properties, active tenants, and completed bookings.
          </p>
        </div>

        {/* Right Side Refresh Button */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-10 px-4 rounded-2xl text-xs font-bold gap-2 border-border/80 hover:bg-card/80 transition-all shadow-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-primary" : ""}`} />
            <span>{isFetching ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>
      </div>

      {/* ERROR STATE */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-3xl border border-destructive/30 bg-destructive/5 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">
                  Failed to load rented properties
                </h4>
                <p className="text-xs text-muted-foreground">
                  {error?.message || "There was an error communicating with the server API."}
                </p>
              </div>
            </div>
            <Button
              type="button"
              onClick={() => refetch()}
              className="rounded-2xl text-xs font-bold px-5 bg-destructive text-destructive-foreground hover:bg-destructive/90 shrink-0"
            >
              Retry Connection
            </Button>
          </Card>
        </motion.div>
      )}

      {/* LOADING STATE */}
      {isLoading ? (
        <BookingSkeleton />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="bookings-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* TOP SUMMARY CARDS */}
            <BookingStats summary={summary} />

            {/* SEARCH AND FILTERS TOOLBAR */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-card/70 dark:bg-card/40 backdrop-blur-xl border border-border/60 shadow-xs">
              <BookingSearch value={searchTerm} onChange={setSearchTerm} />
              <BookingFilters
                category={category}
                onCategoryChange={setCategory}
                city={city}
                onCityChange={setCity}
                paymentStatus={paymentStatus}
                onPaymentStatusChange={setPaymentStatus}
                startDate={startDate}
                onStartDateChange={setStartDate}
                endDate={endDate}
                onEndDateChange={setEndDate}
                onReset={handleResetFilters}
              />
            </div>

            {/* MAIN DATA TABLE / EMPTY STATE */}
            {filteredItems.length === 0 ? (
              <BookingEmpty
                hasFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
              />
            ) : (
              <BookingTable
                items={filteredItems}
                meta={meta}
                onPageChange={(newPage) => setPage(newPage)}
                onOpenModal={handleOpenModal}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* ACTION DETAILS MODAL */}
      <BookingDetailModal
        isOpen={Boolean(activeModalType)}
        type={activeModalType}
        booking={selectedBooking}
        onClose={handleCloseModal}
      />
    </div>
  );
}
