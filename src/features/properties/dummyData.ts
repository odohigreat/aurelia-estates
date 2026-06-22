import type { Property } from '../../types';

export const DUMMY_PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    title: 'The Sky Penthouse',
    price: 15500000,
    currency: 'USD',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '111 West 57th Street',
      city: 'New York',
      country: 'USA'
    },
    metrics: {
      capRate: 4.2,
      appreciationForecast: 6.5,
      sqft: 4500,
      bedrooms: 4,
      bathrooms: 5.5
    },
    tier: 'Ultra-Luxury',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'prop-002',
    title: 'Villa d\'Este Estate',
    price: 22000000,
    currency: 'EUR',
    location: {
      lat: 45.8366,
      lng: 9.0967,
      address: 'Lake Como Shore',
      city: 'Como',
      country: 'Italy'
    },
    metrics: {
      capRate: 3.8,
      appreciationForecast: 8.2,
      sqft: 12000,
      bedrooms: 8,
      bathrooms: 10
    },
    tier: 'Ultra-Luxury',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'prop-003',
    title: 'Modern Minimalist Haven',
    price: 4500000,
    currency: 'USD',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: 'Beverly Hills',
      city: 'Los Angeles',
      country: 'USA'
    },
    metrics: {
      capRate: 5.5,
      appreciationForecast: 4.8,
      sqft: 3200,
      bedrooms: 3,
      bathrooms: 4
    },
    tier: 'Luxury',
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'prop-004',
    title: 'Alpine Retreat Chalet',
    price: 8900000,
    currency: 'CHF',
    location: {
      lat: 46.5098,
      lng: 9.8372,
      address: 'St. Moritz',
      city: 'Graubünden',
      country: 'Switzerland'
    },
    metrics: {
      capRate: 3.5,
      appreciationForecast: 7.1,
      sqft: 5000,
      bedrooms: 5,
      bathrooms: 6
    },
    tier: 'Premium',
    images: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80']
  }
];
