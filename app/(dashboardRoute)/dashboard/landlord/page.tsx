import React from "react";
import { getCurrentUser } from "@/service/getCurrentUser";
import { getLandlordRequests, LandlordRequestItem } from "@/app/(dashboardRoute)/_action/landlord-request.actions";
import { getProperties } from "@/app/(publicRoute)/properties/_actions/property.action";
import { Property } from "@/types/property";

import { LandlordOverviewHeader } from "./_components/landlord-overview-header";
import { LandlordOverviewCards } from "./_components/landlord-overview-cards";
import { LandlordRevenueChart } from "./_components/landlord-revenue-chart";
import { LandlordRequestChart } from "./_components/landlord-request-chart";
import { LandlordAvailabilityChart } from "./_components/landlord-availability-chart";
import { LandlordTopProperties } from "./_components/landlord-top-properties";
import { LandlordRecentRequests } from "./_components/landlord-recent-requests";
import { LandlordRecentPayments } from "./_components/landlord-recent-payments";
import { LandlordRecentProperties } from "./_components/landlord-recent-properties";
import { LandlordQuickActions } from "./_components/landlord-quick-actions";
import { ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * LandlordDashboardHome Component (Server Component)
 * 
 * Top-level route component for Landlord Overview Dashboard (/dashboard/landlord).
 * Fetches current landlord profile, incoming requests, and listed properties concurrently.
 */
export default async function LandlordDashboardHome() {
  // Concurrently fetch landlord user, incoming applications, and property listings
  const [userRes, requestsRes, allPropertiesRes] = await Promise.all([
    getCurrentUser().catch(() => null),
    getLandlordRequests().catch(() => null),
    getProperties().catch(() => [] as Property[]),
  ]);

  // Handle 403 / 401 Authorization failure states
  const isUnauthorized =
    userRes?.statusCode === 401 ||
    requestsRes?.statusCode === 401;

  const isForbidden =
    userRes?.statusCode === 403 ||
    requestsRes?.statusCode === 403;

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
              You don&apos;t have permission to access this landlord dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Extract landlord user details
  const user = userRes?.data;
  const landlordName = user?.name || (user?.email ? user.email.split("@")[0] : "Landlord");
  const landlordAvatar = user?.image || user?.avatar || undefined;
  const landlordEmail = user?.email || undefined;

  // Extract requests list
  const requests: LandlordRequestItem[] = requestsRes?.data || [];

  // Filter properties so ONLY properties belonging to current landlord are included
  const allProperties: Property[] = Array.isArray(allPropertiesRes)
    ? allPropertiesRes
    : (allPropertiesRes as any)?.data || [];

  const landlordProperties = allProperties.filter((property: Property) => {
    if (!user) return false;

    const propertyLandlordId = property.landlord?.id || (property as any).landlordId;
    const propertyLandlordEmail = property.landlord?.email;

    return (
      (propertyLandlordId && user.id && propertyLandlordId === user.id) ||
      (propertyLandlordId && user._id && propertyLandlordId === user._id) ||
      (propertyLandlordEmail &&
        user.email &&
        propertyLandlordEmail.toLowerCase() === user.email.toLowerCase()) ||
      (user.id && (property as any).userId === user.id)
    );
  });

  // Calculate live landlord statistics
  const totalProperties = landlordProperties.length;
  const availableProperties = landlordProperties.filter(
    (p) => p.isAvailable !== false
  ).length;
  const rentedProperties = landlordProperties.filter(
    (p) => p.isAvailable === false
  ).length;

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(
    (r) => r.status === "PENDING"
  ).length;

  const totalRevenue = requests
    .filter((r) => r.status === "APPROVED" || r.status === "COMPLETED")
    .reduce((sum, r) => sum + (r.payment?.amount || r.property?.price || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto min-h-screen animate-in fade-in-50 duration-300">
      {/* 1. Dynamic Welcome Header */}
      <LandlordOverviewHeader
        landlordName={landlordName}
        landlordAvatar={landlordAvatar}
        landlordEmail={landlordEmail}
      />

      {/* 2. 6 Live Metric Overview Cards */}
      <LandlordOverviewCards
        totalProperties={totalProperties}
        availableProperties={availableProperties}
        rentedProperties={rentedProperties}
        totalRequests={totalRequests}
        pendingRequests={pendingRequests}
        totalRevenue={totalRevenue}
      />

      {/* 3. Full Width Revenue Overview Area Chart */}
      <LandlordRevenueChart requests={requests} />

      {/* 4. 2-Column Responsive Visualizations Grid (Rental Requests Bar Chart & Property Availability Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LandlordRequestChart requests={requests} />
        <LandlordAvailabilityChart properties={landlordProperties} />
      </div>

      {/* 5. Full Width Top Performing Properties Grid (3x2) */}
      <LandlordTopProperties properties={landlordProperties} />

      {/* 6. 2-Column Activity Grid (Recent Rental Requests & Recent Payments) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LandlordRecentRequests requests={requests} />
        <LandlordRecentPayments requests={requests} />
      </div>

      {/* 7. Full Width My Recent Properties Section */}
      <LandlordRecentProperties properties={landlordProperties} />

      {/* 8. Full Width Quick Actions Section */}
      <LandlordQuickActions />
    </div>
  );
}