'use client';
import { SummarySection } from './_components/summary-section';
import { RecentBookingsSection } from './_components/recent-bookings-section';
import { WishlistSection } from './_components/wishlist-section';
import { RecentPaymentsSection } from './_components/recent-payments-section';
import { NotificationsWidget } from './_components/notifications-widget';
import { ProfileCard } from './_components/profile-card';
import { CountdownCard } from './_components/countdown-card';
import { TenantReviewsSection } from './_components/tenant-reviews-section';
import { QuickActionsSection } from './_components/quick-actions-section';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s your rental dashboard overview
        </p>
      </div>

      {/* Summary Cards */}
      <SummarySection />

      {/* Main Grid: Bookings and Wishlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentBookingsSection />
        </div>
        <div>
          <CountdownCard
            propertyName="Luxury Villa Mountain View"
            location="Aspen, CO"
            moveInDate="Jan 20, 2025"
            daysRemaining={21}
            image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
          />
        </div>
      </div>

      {/* My Submitted Reviews Section */}
      <TenantReviewsSection />

      {/* Wishlist */}
      <WishlistSection />

      {/* Bottom Grid: Payments, Notifications, Quick Actions, Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payments - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentPaymentsSection />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <NotificationsWidget />
          <ProfileCard />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActionsSection />
    </div>
  );
}
