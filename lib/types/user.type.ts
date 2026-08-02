export interface User {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  avatar?: string | null;
  image?: string | null;
  phone?: string | null;
  bio?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  occupation?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  website?: string | null;
  github?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  role?: 'TENANT' | 'LANDLORD' | 'ADMIN' | 'tenant' | 'landlord' | 'admin';
  status?: string;
  rating?: number;
  isVerified?: boolean;
  isSuperhost?: boolean;
  responseRate?: number | null;
  responseTime?: string | null;
  createdAt?: string;
  [key: string]: any;
}

export interface UserResponse {
  success: boolean;
  data: User | null;
  message?: string;
  statusCode?: number;
}
