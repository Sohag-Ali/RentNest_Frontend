export interface BookingSummary {
  totalRentedProperties: number;
  totalRevenue: number;
  totalCompletedPayments: number;
  averagePropertyPrice: number;
}

export interface BookingMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface BookingCategory {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
}

export interface BookingCity {
  _id?: string;
  id?: string;
  name: string;
}

export interface BookingProperty {
  _id?: string;
  id?: string;
  title: string;
  category?: string | BookingCategory;
  city?: string | BookingCity;
  address?: string;
  location?: string;
  price?: number;
  images?: string[];
  mainImage?: string;
  image?: string;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
}

export interface BookingTenant {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  image?: string;
  phone?: string;
}

export interface BookingPayment {
  _id?: string;
  id?: string;
  amount: number;
  status: "Completed" | "Paid" | "Pending" | "COMPLETED" | "PAID" | "PENDING" | string;
  paidAt?: string;
  paidDate?: string;
  createdAt?: string;
  transactionId?: string;
  paymentMethod?: string;
}

export interface BookingReview {
  _id?: string;
  id?: string;
  rating: number;
  comment?: string;
  content?: string;
  createdAt?: string;
}

export interface BookingItem {
  _id?: string;
  id?: string;
  bookingId?: string;
  property: BookingProperty;
  tenant: BookingTenant;
  payment: BookingPayment;
  review?: BookingReview | null;
  moveInDate?: string;
  moveOutDate?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  status?: string;
}

export interface LandlordBookingsResponse {
  success?: boolean;
  message?: string;
  summary: BookingSummary;
  meta: BookingMeta;
  data: BookingItem[];
}

export interface LandlordBookingsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
  city?: string;
  paymentStatus?: string;
  startDate?: string;
  endDate?: string;
}
