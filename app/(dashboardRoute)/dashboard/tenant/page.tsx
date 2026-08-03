import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/service/getCurrentUser";
import { getMyRentals, TenantRentalItem } from "./_actions/tenant-rental.actions";
import { getPaymentHistory, PaymentItem } from "./_actions/tenant-payment.actions";
import { SummarySection } from "./_components/summary-section";
import { RecentBookingsSection } from "./_components/recent-bookings-section";
import { WishlistSection } from "./_components/wishlist-section";
import { RecentPaymentsSection } from "./_components/recent-payments-section";
import { NotificationsWidget } from "./_components/notifications-widget";
import { ProfileCard } from "./_components/profile-card";
import { CountdownCard } from "./_components/countdown-card";
import { TenantReviewsSection } from "./_components/tenant-reviews-section";
import { QuickActionsSection } from "./_components/quick-actions-section";
import { Sparkles, ShieldCheck, UserCheck, Building2, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function TenantDashboardHome() {
  // Fetch real data on server side concurrently
  const [userRes, rentalsRes, paymentsRes] = await Promise.all([
    getCurrentUser().catch(() => null),
    getMyRentals().catch(() => null),
    getPaymentHistory().catch(() => null),
  ]);

  const user = userRes?.data;
  const userName = user?.name || (user?.email ? user.email.split("@")[0] : "Tenant");
  const userAvatar = user?.image || user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

  const rentals: TenantRentalItem[] = rentalsRes?.data || [];
  const payments: PaymentItem[] = paymentsRes?.data || [];

  // Calculate live statistics
  const activeBookingsCount = rentals.filter((r) => r.status === "COMPLETED").length;
  const pendingRequestsCount = rentals.filter((r) => r.status === "PENDING").length;
  const approvedRequestsCount = rentals.filter((r) => r.status === "APPROVED").length;

  const totalPaymentsSum = payments
    .filter((p) => p.status === "COMPLETED" || p.status === "paid")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  // Find nearest upcoming move-in property for CountdownCard
  const upcomingRental = rentals.find(
    (r) => (r.status === "APPROVED" || r.status === "COMPLETED") && r.moveInDate
  );

  const countdownPropertyName = upcomingRental?.property?.title || "Modern Apartment Residence";
  const countdownLocation = upcomingRental?.property?.location || "Chicago, IL";
  const countdownImage =
    upcomingRental?.property?.mainImage ||
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";

  const countdownMoveInDateFormatted = upcomingRental?.moveInDate
    ? new Date(upcomingRental.moveInDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Aug 20, 2026";

  const daysRemaining = upcomingRental?.moveInDate
    ? Math.max(1, Math.ceil((new Date(upcomingRental.moveInDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 14;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto min-h-screen">
      {/* Dynamic Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-600/10 via-sky-500/5 to-teal-500/10 border border-blue-500/20 shadow-xs relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              <Sparkles className="h-3 w-3 mr-1" /> Verified Tenant Account
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent">{userName}</span>! 👋
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Here&apos;s your live rental dashboard overview, active lease contracts, and payment history.
          </p>
        </div>

        {/* User Profile Avatar Pill */}
        <div className="flex items-center gap-3 p-2 pr-4 rounded-2xl bg-card border border-border/60 shadow-sm shrink-0 z-10">
          <div className="relative h-11 w-11 rounded-xl overflow-hidden border border-primary/20 shrink-0">
            <Image src={userAvatar} alt={userName} fill sizes="44px" className="object-cover" />
          </div>
          <div className="space-y-0.5 text-left">
            <p className="text-xs font-bold text-foreground line-clamp-1">{userName}</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <UserCheck className="h-3 w-3" /> Active Tenant
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <SummarySection
        activeBookingsCount={activeBookingsCount}
        pendingRequestsCount={pendingRequestsCount}
        approvedRequestsCount={approvedRequestsCount}
        totalPaymentsSum={totalPaymentsSum}
      />

      {/* Main Grid: Bookings and Move-In Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentBookingsSection rentals={rentals} />
        </div>
        <div>
          <CountdownCard
            propertyName={countdownPropertyName}
            location={countdownLocation}
            moveInDate={countdownMoveInDateFormatted}
            daysRemaining={daysRemaining}
            image={countdownImage}
          />
        </div>
      </div>

      {/* My Submitted Reviews Section */}
      <TenantReviewsSection />

      {/* Wishlist Section */}
      <WishlistSection />

      {/* Bottom Grid: Payments, Notifications & Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentPaymentsSection />
        </div>
        <div className="space-y-6">
          <NotificationsWidget />
          <ProfileCard />
        </div>
      </div>

      {/* Quick Actions Bar */}
      <QuickActionsSection />
    </div>
  );
}
