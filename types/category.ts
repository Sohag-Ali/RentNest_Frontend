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
  statusCode?: number;
  message?: string;
  data: Category[];
}

export interface CreateCategoryResponse {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: Category;
}

export interface CategoryActionResult<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

