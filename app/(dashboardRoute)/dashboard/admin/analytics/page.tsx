'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnalyticsPeriod, AdminAnalyticsData } from '@/types/analytics';
import { getAdminAnalytics } from '../_actions/admin-analytics.actions';
import { AnalyticsHeader } from './_components/analytics-header';
import { AnalyticsOverviewCards } from './_components/analytics-overview-cards';
import { RevenueChart } from './_components/revenue-chart';
import { RentalStatusChart } from './_components/rental-status-chart';
import { CategoryDistributionChart } from './_components/category-distribution-chart';
import { CityDistributionChart } from './_components/city-distribution-chart';
import { UserGrowthChart } from './_components/user-growth-chart';
import { AvailabilityChart } from './_components/availability-chart';
import { RecentRentalsTable } from './_components/recent-rentals-table';
import { TopProperties } from './_components/top-properties';
import { AnalyticsSkeleton } from './_components/analytics-skeleton';
import { AnalyticsErrorState } from './_components/analytics-error-state';
import { toast } from 'sonner';

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>('30d');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>(200);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [analyticsData, setAnalyticsData] = useState<AdminAnalyticsData | null>(null);

  const fetchAnalytics = useCallback(async (selectedPeriod: AnalyticsPeriod) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getAdminAnalytics(selectedPeriod);

      if (!response.success || response.statusCode !== 200) {
        setIsError(true);
        setStatusCode(response.statusCode);
        setErrorMessage(response.message);
        setAnalyticsData(null);
      } else {
        setAnalyticsData(response.data);
        setIsError(false);
      }
    } catch (err: any) {
      console.error('Failed to fetch analytics:', err);
      setIsError(true);
      setStatusCode(500);
      setErrorMessage('Failed to connect to backend analytics server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics(period);
  }, [period, fetchAnalytics]);

  const handlePeriodChange = (newPeriod: AnalyticsPeriod) => {
    if (newPeriod !== period) {
      setPeriod(newPeriod);
    }
  };

  const handleRefresh = async () => {
    toast.info('Refreshing analytics data...');
    await fetchAnalytics(period);
  };

  if (isError && !analyticsData) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <AnalyticsHeader
          period={period}
          onPeriodChange={handlePeriodChange}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />
        <AnalyticsErrorState
          statusCode={statusCode}
          message={errorMessage}
          onRetry={() => fetchAnalytics(period)}
          isRetrying={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in-50 duration-300">
      {/* Header with period filter */}
      <AnalyticsHeader
        period={period}
        onPeriodChange={handlePeriodChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      {isLoading && !analyticsData ? (
        <AnalyticsSkeleton />
      ) : analyticsData ? (
        <div className="space-y-6 sm:space-y-8">
          {/* 6 KPI Overview Cards */}
          <AnalyticsOverviewCards overview={analyticsData.overview} />

          {/* Full Width Revenue Chart */}
          <RevenueChart data={analyticsData.revenueOverview} />

          {/* Grid Row 1: Rental Requests + User Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RentalStatusChart data={analyticsData.rentalRequests} />
            <UserGrowthChart data={analyticsData.userGrowth} />
          </div>

          {/* Grid Row 2: Category Distribution + Availability (Height Matched Donut Charts) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryDistributionChart data={analyticsData.propertiesByCategory} />
            <AvailabilityChart data={analyticsData.availability} />
          </div>

          {/* Full Width City Distribution Chart */}
          <CityDistributionChart data={analyticsData.propertiesByCity} />

          {/* Full Width Top 6 Performing Properties Section (3x2 Grid) */}
          <TopProperties data={analyticsData.topProperties} />

          {/* Full Width Recent Rental Activity Table */}
          <RecentRentalsTable data={analyticsData.recentRentals} />
        </div>
      ) : null}
    </div>
  );
}
