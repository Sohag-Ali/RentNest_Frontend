export interface OverviewStats {
  totalProperties: number;
  totalTenants: number;
  totalLandlords: number;
  totalRentalRequests: number;
  totalRevenue: number;
  totalWishlists: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
}

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export interface RentalStatusCount {
  status: RentalStatus;
  count: number;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface CityCount {
  city: string;
  count: number;
}

export interface UserGrowthData {
  date: string;
  tenants: number;
  landlords: number;
}

export interface PropertyAvailability {
  available: number;
  unavailable: number;
}

export interface RecentRental {
  id: string;
  status: RentalStatus;
  moveInDate: string | null;
  createdAt: string;
  tenantName: string;
  tenantEmail: string;
  propertyTitle: string;
  propertyMainImage: string;
  propertyPrice: number;
  landlordName: string;
}

export interface TopProperty {
  id: string;
  title: string;
  mainImage: string;
  location: string;
  price: number;
  wishlistCount: number;
  rentalRequestCount: number;
  rating: number;
}

export interface AdminAnalyticsData {
  overview: OverviewStats;
  revenueOverview: RevenueData[];
  rentalRequests: RentalStatusCount[];
  propertiesByCategory: CategoryCount[];
  propertiesByCity: CityCount[];
  userGrowth: UserGrowthData[];
  availability: PropertyAvailability;
  recentRentals: RecentRental[];
  topProperties: TopProperty[];
}

export interface AdminAnalyticsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminAnalyticsData;
}

export type AnalyticsPeriod = "7d" | "30d" | "90d" | "all";
