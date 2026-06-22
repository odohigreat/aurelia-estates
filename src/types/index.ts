export interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    country: string;
  };
  metrics: {
    capRate: number;
    appreciationForecast: number;
    sqft: number;
    bedrooms: number;
    bathrooms: number;
  };
  tier: 'Ultra-Luxury' | 'Luxury' | 'Premium';
  images: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'uninitiated';
}
