export enum CuisineType {
  Pizza = 'pizza',
  Burger = 'burger',
  American = 'american',
  Vietnamese = 'vietnamese',
  Mexican = 'mexican',
  Chinese = 'chinese',
  Dessert = 'dessert'
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: CuisineType;
  address: {
    street: string;
    district: string;
    city: string;
    postalCode: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  contact?: {
    phone?: string;
    email?: string;
  };
  priceRange?: 'low' | 'medium' | 'high';
  features?: string[];
} 