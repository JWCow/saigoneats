/* eslint-disable no-unused-vars */
export enum LocationType {
  Restaurant = 'restaurant',
  Cafe = 'cafe',
  Dessert = 'dessert',
  Spa = 'spa',
  Bar = 'bar',
  Bakery = 'bakery',
  CoffeeShop = 'coffee shop',
  Bistro = 'bistro',
}

export enum Cuisine {
  Vietnamese = 'vietnamese',
  Italian = 'italian',
  Japanese = 'japanese',
  Chinese = 'chinese',
  Korean = 'korean',
  Thai = 'thai',
  Indian = 'indian',
  American = 'american',
  Mexican = 'mexican',
  French = 'french',
  Spanish = 'spanish',
  Mediterranean = 'mediterranean',
  MiddleEastern = 'middle eastern',
  Vegetarian = 'vegetarian',
  Vegan = 'vegan',
  Seafood = 'seafood',
  Steakhouse = 'steakhouse',
  Fusion = 'fusion',
  Cafe = 'cafe',
  Dessert = 'dessert',
  Bakery = 'bakery',
  Pizza = 'pizza',
  Burger = 'burger',
  Sushi = 'sushi',
  Ramen = 'ramen',
  BBQ = 'bbq',
  Brunch = 'brunch',
  International = 'international',
}

export enum District {
  District1 = 'district 1',
  District2 = 'district 2',
  District3 = 'district 3',
  District4 = 'district 4',
  District5 = 'district 5',
  District6 = 'district 6',
  District7 = 'district 7',
  District8 = 'district 8',
  District9 = 'district 9',
  District10 = 'district 10',
  District11 = 'district 11',
  District12 = 'district 12',
  ThuDuc = 'thu duc',
  BinhThanh = 'binh thanh',
  GoVap = 'go vap',
  TanBinh = 'tan binh',
  TanPhu = 'tan phu',
  PhuNhuan = 'phu nhuan',
  BinhTan = 'binh tan',
}

export interface Address {
  street: string;
  district: District;
  city: string;
  postalCode?: string;
}

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  cuisine?: Cuisine;
  fullAddress: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  placeId?: string;
  features: string[];
  priceRange: 'low' | 'medium' | 'high';
  website?: {
    url: string;
    label: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    phoneClickable?: string;
  };
  openingHours?: {
    [key: string]: string;
  };
  description?: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  submittedAt?: Date;
  suggestedBy?: string;
  votes?: number;
  votedBy?: string[];
}

// Note: The static locations array has been removed as the application now uses Firebase
// for storing and retrieving location data. The type definitions above are still used
// throughout the application for type checking.
