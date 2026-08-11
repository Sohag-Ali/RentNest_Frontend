import React from "react";
import { getCurrentUser } from "@/service/getCurrentUser";
import { getMyRentals, TenantRentalItem } from "./_actions/tenant-rental.actions";
import { getPaymentHistory, PaymentItem } from "./_actions/tenant-payment.actions";
import { getWishlistAction, WishlistItem } from "./_actions/wishlist.actions";

import { TenantOverviewHeader } from "./_components/tenant-overview-header";
import { TenantOverviewCards } from "./_components/tenant-overview-cards";
import { TenantRentalStatusChart } from "./_components/tenant-rental-status-chart";
import { TenantPaymentHistoryChart } from "./_components/tenant-payment-history-chart";
import { TenantRecentRentals } from "./_components/tenant-recent-rentals";
import { TenantRecentPayments } from "./_components/tenant-recent-payments";
import { TenantWishlistPreview } from "./_components/tenant-wishlist-preview";
import { TenantQuickActions } from "./_components/tenant-quick-actions";
import { ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * TenantDashboardHome Component (Server Component)
 * 
 * Top-level route component for Tenant Overview Dashboard (/dashboard/tenant).
 * Fetches current tenant user profile, rental requests, payment history, and wishlist concurrently.
 */
export default async function TenantDashboardHome() {
  // Fetch real tenant data on server side concurrently
  const [userRes, rentalsRes, paymentsRes, wishlistRes] = await Promise.all([
    getCurrentUser().catch(() => null),
    getMyRentals().catch(() => null),
    getPaymentHistory().catch(() => null),
    getWishlistAction().catch(() => null),
  ]);

  // Handle 403 / 401 Authorization failure states
  const isUnauthorized =
    userRes?.statusCode === 401 ||
    rentalsRes?.statusCode === 401 ||
    paymentsRes?.statusCode === 401;

  const isForbidden =
    userRes?.statusCode === 403 ||
    rentalsRes?.statusCode === 403 ||
    paymentsRes?.statusCode === 403;

  if (isForbidden) {
    return (
      <div className="p-6 max-w-xl mx-auto my-12 text-center">
        <Card className="border border-border/80 shadow-luxury bg-card p-8">
          <CardContent className="space-y-4 flex flex-col items-center">
            <div className="p-4 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground font-heading">
              Access Restricted
            </h2>
            <p className="text-xs text-muted-foreground">
              You don&apos;t have permission to access this dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Extract user details
  const user = userRes?.data;
  const userName = user?.name || (user?.email ? user.email.split("@")[0] : "Tenant");
  const userAvatar = user?.image || user?.avatar;
  const userEmail = user?.email;

  // Extract data lists
  const rentals: TenantRentalItem[] = rentalsRes?.data || [];
  const payments: PaymentItem[] = paymentsRes?.data || [];
  const wishlist: WishlistItem[] = wishlistRes?.data || [];

  // Calculate live statistics
  const activeRentalsCount = rentals.filter(
    (r) => r.status === "COMPLETED"
  ).length;
  const pendingRequestsCount = rentals.filter(
    (r) => r.status === "PENDING"
  ).length;
  const approvedRequestsCount = rentals.filter(
    (r) => r.status === "APPROVED"
  ).length;
  const totalRequestsCount = rentals.length;

  const totalPaymentsSum = payments
    .filter((p) => p.status === "COMPLETED" || p.status === "paid")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const wishlistCount = wishlist.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto min-h-screen animate-in fade-in-50 duration-300">
      {/* 1. Dynamic Welcome Header */}
      <TenantOverviewHeader
        userName={userName}
        userAvatar={userAvatar || undefined}
        userEmail={userEmail || undefined}
      />

      {/* 2. 6 Live Metric Overview Cards */}
      <TenantOverviewCards
        activeRentalsCount={activeRentalsCount}
        pendingRequestsCount={pendingRequestsCount}
        approvedRequestsCount={approvedRequestsCount}
        totalRequestsCount={totalRequestsCount}
        totalPaymentsSum={totalPaymentsSum}
        wishlistCount={wishlistCount}
      />

      {/* 3. 2-Column Visualizations Grid (Donut Chart & Payment History Area Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TenantRentalStatusChart rentals={rentals} />
        <TenantPaymentHistoryChart payments={payments} />
      </div>

      {/* 4. 2-Column Property Cards Grid (Recent Rentals & Wishlist Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TenantRecentRentals rentals={rentals} />
        <TenantWishlistPreview wishlist={wishlist} />
      </div>

      {/* 5. 2-Column Activity & Shortcuts Grid (Recent Payments Table & Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TenantRecentPayments payments={payments} />
        <TenantQuickActions />
      </div>
    </div>
  );
}
