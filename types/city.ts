export interface CityData {
  city: string;
  propertiesCount: number;
  featuredImage: string;
  startingPrice: number;
  id?: string;
  slug?: string;
}

export interface CitiesApiResponse {
  success: boolean;
  data: CityData[];
  message?: string;
}
