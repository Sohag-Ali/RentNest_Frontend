export interface PropertyOverview {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  availableFrom: string;
  status: string;
  yearBuilt: number;
  depositAmount: number;
  leaseTerm: string;
  petPolicy: string;
  parkingType: string;
  category?: string;
}

export interface Landlord {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  avatar?: string;
  phone?: string;
  rating?: number;
  reviewsCount?: number;
  responseRate?: string;
  responseTime?: string;
  joinedDate?: string;
  isSuperhost?: boolean;
  isVerified?: boolean;
}

export interface CreatePropertyInput {
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  location: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  isFeatured?: boolean;
  isAvailable?: boolean;
  mainImage: string;
  images: string[];
  amenities: string[];
  categoryId: string;
  overview: PropertyOverview;
}

export interface Property extends CreatePropertyInput {
  id: string;
  category?: string | { id: string; name: string };
  rating?: number;
  averageRating?: number;
  reviewsCount?: number;
  reviewCount?: number;
  wishlistCount?: number;
  landlord?: Landlord;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyResponse {
  success: boolean;
  message?: string;
  data?: Property;
}

export interface FeaturedPropertiesResponse {
  success: boolean;
  message?: string;
  data: Property[];
}

export interface SearchState {
  keyword: string;
  location: string;
  category: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
  availability: string;
  query?: string;
  city?: string;
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
  priceRange?: [number, number];
  amenities?: string[];
}

export const CATEGORIES = [
  "Apartment",
  "Flat",
  "Family House",
  "Studio Apartment",
  "Bachelor Mess",
  "Sublet",
  "Duplex",
  "Villa",
  "Penthouse",
  "Office Space",
  "Shop / Showroom",
  "Warehouse",
];

export const CITIES = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Comilla",
  "Malibu",
  "New York",
  "Los Angeles",
  "Miami",
];

export const AMENITIES_LIST = [
  "Private Beach Access",
  "Infinity Pool",
  "Sauna & Spa",
  "High-Speed Wi-Fi",
  "Fireplace",
  "Garden / Courtyard",
  "Security System",
  "Air Conditioning",
  "Garage Parking",
  "Gym / Fitness Center",
  "Balcony",
  "Pet Friendly",
  "Solar Power",
  "Smart Home System",
];
