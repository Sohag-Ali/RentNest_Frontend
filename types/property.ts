export interface Category {
  id?: string;
  name?: string;
}

export interface Landlord {
  id: string;
  name: string;
  avatar: string;
  isSuperhost?: boolean;
  isVerified?: boolean;
  rating?: number;
  responseRate?: string | null;
  responseTime?: string | null;
  joinedDate?: string;
  phone?: string;
  email?: string;
}

export interface PropertyOverview {
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  category?: string | Category;
  availableFrom?: string;
  status?: "Available" | "Pending" | "Rented" | string;
  yearBuilt?: number;
  depositAmount?: number;
  leaseTerm?: string;
  petPolicy?: string;
  parkingType?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription?: string;
  location: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isAvailable: boolean;
  category: string | Category;
  mainImage: string;
  images: string[];
  amenities: string[];
  createdAt: string;
  landlord?: Landlord;
  overview?: PropertyOverview;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  };
}

export interface SearchState {
  keyword: string;
  location: string;
  category: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
  availability: string;
}

export interface FilterState {
  category: string;
  city: string;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  selectedAmenities: string[];
  availableOnly: boolean;
  featuredOnly: boolean;
  minRating: number;
}

export const CATEGORIES = [
  "All",
  "Villa",
  "Penthouse",
  "Apartment",
  "Studio",
  "Loft",
  "Cottage",
];

export const CITIES = [
  "All",
  "Miami",
  "Malibu",
  "New York",
  "Chicago",
  "Aspen",
  "San Francisco",
  "Beverly Hills",
  "Austin",
];

export const AMENITIES_LIST = [
  "High-Speed Wi-Fi",
  "Private Pool",
  "Gym & Fitness Center",
  "Air Conditioning",
  "Pet Friendly",
  "Balcony / Terrace",
  "EV Charging",
  "24/7 Security",
  "Private Beach Access",
  "Fireplace",
];
