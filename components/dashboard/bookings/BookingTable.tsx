"use client";

import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Building2, User, CreditCard, Calendar } from "lucide-react";
import { BookingItem, BookingMeta } from "@/types/booking";
import { BookingRow } from "./BookingRow";
import { ModalType } from "./BookingDetailModal";
import { PaymentStatusBadge, ReviewStatusBadge } from "./BookingStatusBadge";

interface BookingTableProps {
  items: BookingItem[];
  meta: BookingMeta;
  onPageChange: (page: number) => void;
  onOpenModal: (type: ModalType, booking: BookingItem) => void;
}

export function BookingTable({
  items,
  meta,
  onPageChange,
  onOpenModal,
}: BookingTableProps) {
  const currentPage = meta.page || 1;
  const totalPages = meta.totalPage || 1;
  const totalCount = meta.total || items.length;
  const limit = meta.limit || 10;

  const startEntry = Math.min((currentPage - 1) * limit + 1, totalCount);
  const endEntry = Math.min(currentPage * limit, totalCount);

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="rounded-3xl border border-border/60 bg-card/70 dark:bg-card/40 backdrop-blur-xl shadow-sm overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50 border-b border-border/60">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-3.5 pl-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Property
                </TableHead>
                <TableHead className="py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Tenant
                </TableHead>
                <TableHead className="py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Move In Date
                </TableHead>
                <TableHead className="py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Payment
                </TableHead>
                <TableHead className="py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Paid Date
                </TableHead>
                <TableHead className="py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Review
                </TableHead>
                <TableHead className="py-3.5 pr-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((booking) => (
                <BookingRow
                  key={booking._id || booking.id || booking.bookingId || Math.random().toString()}
                  booking={booking}
                  onOpenModal={onOpenModal}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card List View (< md screens) */}
        <div className="md:hidden divide-y divide-border/40 p-3 space-y-3">
          {items.map((booking) => {
            const propTitle = booking.property?.title || "Property";
            const propImg =
              booking.property?.mainImage ||
              booking.property?.image ||
              (Array.isArray(booking.property?.images) && booking.property.images[0]) ||
              "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80";
            const tenantName = booking.tenant?.name || "Tenant";
            const tenantAvatar =
              booking.tenant?.avatar ||
              booking.tenant?.image ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
            const amount = booking.payment?.amount || booking.property?.price || 0;
            const status = booking.payment?.status || "Completed";

            return (
              <div
                key={booking._id || booking.id || Math.random().toString()}
                className="p-4 rounded-2xl bg-card border border-border/60 space-y-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-muted border border-border shrink-0">
                    <Image src={propImg} alt={propTitle} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-foreground truncate">{propTitle}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-primary">{booking.property?.category ? (typeof booking.property.category === "object" ? booking.property.category.name : booking.property.category) : "Property"}</span>
                      <span className="font-bold text-foreground font-mono">${amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden shrink-0 border border-border">
                      <Image src={tenantAvatar} alt={tenantName} fill sizes="24px" className="object-cover" />
                    </div>
                    <span className="font-medium text-foreground">{tenantName}</span>
                  </div>
                  <PaymentStatusBadge status={status} />
                </div>

                <div className="flex items-center justify-end gap-1.5 pt-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => onOpenModal("property", booking)}
                    className="h-8 text-xs font-semibold rounded-xl"
                  >
                    <Building2 className="h-3.5 w-3.5 mr-1" />
                    Property
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => onOpenModal("tenant", booking)}
                    className="h-8 text-xs font-semibold rounded-xl"
                  >
                    <User className="h-3.5 w-3.5 mr-1" />
                    Tenant
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => onOpenModal("payment", booking)}
                    className="h-8 text-xs font-semibold rounded-xl"
                  >
                    <CreditCard className="h-3.5 w-3.5 mr-1" />
                    Payment
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border/60 bg-muted/30">
          <div className="text-xs text-muted-foreground font-medium">
            Showing <span className="font-bold text-foreground">{totalCount > 0 ? startEntry : 0}</span> to{" "}
            <span className="font-bold text-foreground">{endEntry}</span> of{" "}
            <span className="font-bold text-foreground">{totalCount}</span> rented properties
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="h-9 px-3 rounded-2xl text-xs font-semibold gap-1 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {/* Page number indicators */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = pageNum === currentPage;

                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => onPageChange(pageNum)}
                    className={`h-9 w-9 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="h-9 px-3 rounded-2xl text-xs font-semibold gap-1 transition-all"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
