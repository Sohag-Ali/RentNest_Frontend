export interface Category {
  id: string;
  name: string;
  propertiesCount: number;
  slug?: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesApiResponse {
  success: boolean;
  data: Category[];
  message?: string;
}
