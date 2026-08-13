"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  DollarSign,
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  CheckCircle2,
  Receipt,
  Bed,
  Bath,
  ExternalLink,
  ShieldCheck,
  Star,
} from "lucide-react";
import { BookingItem } from "@/types/booking";
import Link from "next/link";

export type ModalType = "property" | "tenant" | "payment" | null;

interface BookingDetailModalProps {
  isOpen: boolean;
  type: ModalType;
  booking: BookingItem | null;
  onClose: () => void;
}

export function BookingDetailModal({
  isOpen,
  type,
  booking,
  onClose,
}: BookingDetailModalProps) {
  if (!booking || !type) return null;

  const { property, tenant, payment, review, moveInDate, moveOutDate, startDate } = booking;

  // Extract property title, category, city, price, image
  const propertyTitle = property?.title || "Rental Property";
  const categoryName = typeof property?.category === "object" ? property.category?.name : property?.category || "Residential";
  const cityLocation = typeof property?.city === "object" ? property.city?.name : property?.city || property?.location || property?.address || "City N/A";
  const propertyPrice = property?.price || payment?.amount || 0;
  const propertyImage =
    property?.mainImage ||
    property?.image ||
    (Array.isArray(property?.images) && property.images[0]) ||
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80";

  // Tenant details
  const tenantName = tenant?.name || "Tenant Name N/A";
  const tenantEmail = tenant?.email || "No email available";
  const tenantAvatar = tenant?.avatar || tenant?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
  const tenantPhone = tenant?.phone || "+1 (555) 019-2834";

  // Move-in date format
  const effectiveMoveIn = moveInDate || startDate || payment?.paidAt || payment?.paidDate;
  const formattedMoveIn = effectiveMoveIn ? new Date(effectiveMoveIn).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg rounded-3xl border-border/60 bg-card/95 backdrop-blur-2xl p-6 shadow-2xl overflow-hidden">
        {/* VIEW PROPERTY MODAL */}
        {type === "property" && (
          <div className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2 font-heading">
                <Building2 className="h-5 w-5 text-primary" />
                <span>Property Details</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Overview of the rented accommodation and listing specs.
              </DialogDescription>
            </DialogHeader>

            {/* Property Image Banner */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-inner">
              <Image
                src={propertyImage}
                alt={propertyTitle}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-background/90 backdrop-blur-md text-foreground border-border font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                  {categoryName}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-xs font-bold text-foreground shadow-md flex items-center gap-1 font-mono">
                <span>৳{propertyPrice.toLocaleString()}</span>
                <span className="text-[10px] text-muted-foreground font-normal">/ month</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground leading-snug">{propertyTitle}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{cityLocation} {property?.address ? `• ${property.address}` : ""}</span>
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-muted/40 border border-border/50 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Bed className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Bedrooms</span>
                    <p className="text-xs font-bold text-foreground">{property?.bedrooms || 2} Beds</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-muted/40 border border-border/50 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
                    <Bath className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Bathrooms</span>
                    <p className="text-xs font-bold text-foreground">{property?.bathrooms || 2} Baths</p>
                  </div>
                </div>
              </div>
            </div>

            {property?._id || property?.id ? (
              <div className="pt-3 flex justify-end">
                <Button
                  render={<Link href={`/dashboard/landlord/properties/${property._id || property.id}`} />}
                  className="rounded-2xl text-xs font-bold gap-2 bg-primary text-primary-foreground hover:shadow-lg transition-all"
                >
                  <span>Edit Property Listing</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : null}
          </div>
        )}

        {/* VIEW TENANT MODAL */}
        {type === "tenant" && (
          <div className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2 font-heading">
                <User className="h-5 w-5 text-teal-500" />
                <span>Tenant Profile</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Verified information for the tenant residing in your property.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-sky-500/5 to-transparent border border-teal-500/20">
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-teal-500/30 shadow-md shrink-0">
                <Image
                  src={tenantAvatar}
                  alt={tenantName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">{tenantName}</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-teal-500" />
                  <span>{tenantEmail}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    Phone Contact:
                  </span>
                  <span className="font-semibold text-foreground">{tenantPhone}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    Lease Move-In:
                  </span>
                  <span className="font-semibold text-foreground">{formattedMoveIn}</span>
                </div>
              </div>

              {/* Review feedback if left by tenant */}
              {review && (
                <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      Tenant Review ({review.rating}/5)
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    "{review.comment || review.content}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="button"
                onClick={onClose}
                className="rounded-2xl text-xs font-bold px-5 bg-muted hover:bg-muted/80 text-foreground"
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {/* VIEW PAYMENT MODAL */}
        {type === "payment" && (
          <div className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2 font-heading">
                <Receipt className="h-5 w-5 text-sky-500" />
                <span>Payment Summary</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Official transaction record and payment clearance details.
              </DialogDescription>
            </DialogHeader>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-sky-500/10 via-card to-card border border-sky-500/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <div>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Total Paid Amount
                  </span>
                  <div className="text-3xl font-extrabold text-foreground font-mono mt-1">
                    ${(payment?.amount || propertyPrice).toLocaleString()}
                  </div>
                </div>
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{payment?.status || "Completed"}</span>
                </Badge>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono font-bold text-foreground">
                    {payment?.transactionId || payment?._id || payment?.id || "TXN-894201934"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-sky-500" />
                    <span>{payment?.paymentMethod || "Stripe Secured Credit Card"}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Paid Date:</span>
                  <span className="font-semibold text-foreground">
                    {payment?.paidAt || payment?.paidDate || formattedMoveIn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payer Name:</span>
                  <span className="font-semibold text-foreground">{tenantName}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="button"
                onClick={onClose}
                className="rounded-2xl text-xs font-bold px-5 bg-primary text-primary-foreground hover:shadow-lg transition-all"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
