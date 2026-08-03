"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Building2, User, CreditCard, Calendar, Eye } from "lucide-react";
import { PaymentStatusBadge, ReviewStatusBadge } from "./BookingStatusBadge";
import { BookingItem } from "@/types/booking";
import { ModalType } from "./BookingDetailModal";

interface BookingRowProps {
  booking: BookingItem;
  onOpenModal: (type: ModalType, booking: BookingItem) => void;
}

export function BookingRow({ booking, onOpenModal }: BookingRowProps) {
  const { property, tenant, payment, review, moveInDate, startDate } = booking;

  // Property details extraction
  const propertyTitle = property?.title || "Rented Property";
  const categoryName = typeof property?.category === "object" ? property.category?.name : property?.category || "Residential";
  const propertyImage =
    property?.mainImage ||
    property?.image ||
    (Array.isArray(property?.images) && property.images[0]) ||
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80";

  // Tenant details extraction
  const tenantName = tenant?.name || "Tenant Name";
  const tenantEmail = tenant?.email || "No Email";
  const tenantAvatar =
    tenant?.avatar ||
    tenant?.image ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

  // Dates formatting
  const effectiveMoveIn = moveInDate || startDate || payment?.paidAt || payment?.paidDate;
  const formattedMoveIn = effectiveMoveIn
    ? new Date(effectiveMoveIn).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const effectivePaidDate = payment?.paidAt || payment?.paidDate || effectiveMoveIn;
  const formattedPaidDate = effectivePaidDate
    ? new Date(effectivePaidDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  // Payment Amount
  const amount = payment?.amount || property?.price || 0;
  const paymentStatus = payment?.status || "Completed";

  return (
    <TableRow className="group transition-all duration-300 hover:bg-muted/40 hover:shadow-md cursor-default border-b border-border/40">
      {/* Property Thumbnail & Title */}
      <TableCell className="py-4 pl-4 pr-3">
        <div className="flex items-center gap-3.5 min-w-[200px]">
          <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-muted border border-border/60 shrink-0 shadow-xs group-hover:shadow-md transition-shadow">
            <Image
              src={propertyImage}
              alt={propertyTitle}
              fill
              sizes="56px"
              className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors font-heading">
              {propertyTitle}
            </h4>
            <div className="text-[11px] text-muted-foreground line-clamp-1">
              {property?.location || property?.address || "Available Listing"}
            </div>
          </div>
        </div>
      </TableCell>

      {/* Category Badge */}
      <TableCell className="py-4 px-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 w-fit shrink-0">
          {categoryName}
        </span>
      </TableCell>

      {/* Tenant Avatar & Name & Email */}
      <TableCell className="py-4 px-3">
        <div className="flex items-center gap-3 min-w-[170px]">
          <div className="relative h-9 w-9 rounded-full overflow-hidden bg-muted border border-border/60 shrink-0 shadow-xs">
            <Image
              src={tenantAvatar}
              alt={tenantName}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-foreground line-clamp-1">{tenantName}</p>
            <p className="text-[11px] text-muted-foreground line-clamp-1">{tenantEmail}</p>
          </div>
        </div>
      </TableCell>

      {/* Move In Date */}
      <TableCell className="py-4 px-3 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span>{formattedMoveIn}</span>
        </div>
      </TableCell>

      {/* Payment Amount */}
      <TableCell className="py-4 px-3 whitespace-nowrap">
        <span className="text-xs sm:text-sm font-extrabold text-foreground font-mono">
          ${amount.toLocaleString()}
        </span>
      </TableCell>

      {/* Payment Status Badge */}
      <TableCell className="py-4 px-3 whitespace-nowrap">
        <PaymentStatusBadge status={paymentStatus} />
      </TableCell>

      {/* Paid Date */}
      <TableCell className="py-4 px-3 whitespace-nowrap">
        <span className="text-xs text-muted-foreground font-medium">{formattedPaidDate}</span>
      </TableCell>

      {/* Review Status */}
      <TableCell className="py-4 px-3">
        <ReviewStatusBadge review={review} />
      </TableCell>

      {/* Action Buttons */}
      <TableCell className="py-4 pr-4 pl-3 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => onOpenModal("property", booking)}
            className="h-8 px-2.5 rounded-xl text-[11px] font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-pointer gap-1"
            title="View Property Details"
          >
            <Building2 className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Property</span>
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => onOpenModal("tenant", booking)}
            className="h-8 px-2.5 rounded-xl text-[11px] font-semibold text-foreground hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 transition-all cursor-pointer gap-1"
            title="View Tenant Info"
          >
            <User className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Tenant</span>
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => onOpenModal("payment", booking)}
            className="h-8 px-2.5 rounded-xl text-[11px] font-semibold text-foreground hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 transition-all cursor-pointer gap-1"
            title="View Payment Details"
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Payment</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
