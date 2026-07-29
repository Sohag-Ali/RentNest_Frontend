export interface User {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: 'TENANT' | 'LANDLORD' | 'ADMIN' | 'tenant' | 'landlord' | 'admin';
  image?: string;
  avatar?: string;
  [key: string]: any;
}

export interface UserResponse {
  success: boolean;
  data: User | null;
  message?: string;
  statusCode?: number;
}
