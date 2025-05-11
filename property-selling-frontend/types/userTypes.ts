interface User {
  _id: string;
  fullName: string;
  email: string;
  companyName?: string;
  licenseNumber?: string;
  phoneNumber?: string;
  userType?: string | null;
}
export interface UserState {
  userType: string | null;
  user: User | null;
}
export interface PropertyType {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  videoUrl?: string; // Add optional video URL
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  createdAt: string;
  videoName: string | null;
  _id: string;
}
