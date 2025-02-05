/* eslint-disable no-unused-vars */
export enum LocationType {
  Restaurant = 'restaurant',
  Cafe = 'cafe',
  Dessert = 'dessert',
  Spa = 'spa',
  Bar = 'bar',
}

export enum Cuisine {
  Pizza = 'pizza',
  Burger = 'burger',
  American = 'american',
  Vietnamese = 'vietnamese',
  Mexican = 'mexican',
  Chinese = 'chinese',
  Dessert = 'dessert',
  Coffee = 'coffee',
  International = 'international',
}

export enum District {
  D1 = 'District 1',
  D2 = 'District 2',
  D3 = 'District 3',
  D4 = 'District 4',
  D5 = 'District 5',
  D7 = 'District 7',
  D8 = 'District 8',
  BinhThanh = 'Binh Thanh',
  ThuDuc = 'Thu Duc',
}
/* eslint-enable no-unused-vars */

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  cuisine?: Cuisine;
  address: {
    street: string;
    district: District;
    city: string;
    postalCode?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  features: string[];
  priceRange: 'low' | 'medium' | 'high';
  website?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
  openingHours?: {
    [key: string]: string;
  };
  description?: string;
  images?: string[];
  rating?: number;
  reviews?: number;
}

export const locations: Location[] = [
  {
    id: 'pizza-4ps',
    name: "Pizza 4P's",
    type: LocationType.Restaurant,
    cuisine: Cuisine.Pizza,
    address: {
      street: 'SC Vivo City, 1058 Đ. Nguyễn Văn Linh',
      district: District.D7,
      city: 'Ho Chi Minh City',
      postalCode: '700000',
    },
    features: ['Dine-in', 'Takeaway', 'Delivery'],
    priceRange: 'high',
    description: 'Famous for their unique Japanese-Italian fusion pizzas',
  },
  {
    id: 'paper-plate-pizza',
    name: 'Paper Plate Pizza',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Pizza,
    address: {
      street: '25/26B Đ. Tôn Thất Tùng',
      district: District.D1,
      city: 'Ho Chi Minh City',
    },
    features: ['NY Style Pizza', 'Dine-in', 'Takeaway'],
    priceRange: 'medium',
    description: 'Authentic New York style pizza in Saigon',
  },
  {
    id: 'archies-pizza',
    name: "Archie's American Pizza & Wing",
    type: LocationType.Restaurant,
    cuisine: Cuisine.Pizza,
    address: {
      street: '624 Võ Văn Kiệt',
      district: District.D5,
      city: 'Ho Chi Minh City',
      postalCode: '70000',
    },
    features: ['American Style', 'Wings', 'Dine-in'],
    priceRange: 'medium',
  },
  {
    id: 'hungry-bunny',
    name: 'The HUNGRY BUNNY',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Burger,
    address: {
      street: '1 Đ. Nguyễn Cửu Vân',
      district: District.BinhThanh,
      city: 'Ho Chi Minh City',
    },
    features: ['American Bistro', 'Burgers', 'Dine-in'],
    priceRange: 'medium',
    description: 'American bistro specializing in gourmet burgers',
  },
  {
    id: 'mad-roosta',
    name: 'MAD ROOSTA',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Burger,
    address: {
      street: 'Level 2, 95 Hai Bà Trưng',
      district: District.D1,
      city: 'Ho Chi Minh City',
      postalCode: '700000',
    },
    features: ['Burgers', 'Grill', 'Dine-in'],
    priceRange: 'medium',
    description: 'Specialty burger and grill restaurant',
  },
  {
    id: 'red-bison',
    name: 'Red Bison Grill',
    type: LocationType.Restaurant,
    cuisine: Cuisine.American,
    address: {
      street: '56 P. Đức Chính',
      district: District.D1,
      city: 'Ho Chi Minh City',
    },
    features: ['Steakhouse', 'American Grill', 'Dine-in'],
    priceRange: 'high',
  },
  {
    id: 'eddies-diner',
    name: "Eddie's New York Deli & Diner",
    type: LocationType.Restaurant,
    cuisine: Cuisine.American,
    address: {
      street: '73 Pasteur',
      district: District.D1,
      city: 'Ho Chi Minh City',
    },
    features: ['Deli', 'American Diner', 'Breakfast'],
    priceRange: 'medium',
    description: 'Authentic New York style deli and diner',
  },
  {
    id: 'quan-ut-ut',
    name: 'Quán Ụt Ụt',
    type: LocationType.Restaurant,
    cuisine: Cuisine.American,
    address: {
      street: '168 Võ Văn Kiệt',
      district: District.D1,
      city: 'Ho Chi Minh City',
      postalCode: '70000',
    },
    features: ['BBQ', 'American', 'Beer'],
    priceRange: 'medium',
    description: 'American-style BBQ restaurant',
  },
  {
    id: 'bun-thit-nuong',
    name: 'Bún Thịt Nướng Chả Giò',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    address: {
      street: '1 Đ. Nguyễn Trung Trực',
      district: District.D1,
      city: 'Ho Chi Minh City',
    },
    features: ['Vietnamese', 'Local Cuisine', 'Street Food'],
    priceRange: 'low',
  },
  {
    id: 'den-long',
    name: 'Den Long - Home Cooked Vietnamese Restaurant',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    address: {
      street: '130 Nguyễn Trãi',
      district: District.D1,
      city: 'Ho Chi Minh City',
      postalCode: '700000',
    },
    features: ['Vietnamese', 'Home Style', 'Dine-in'],
    priceRange: 'medium',
  },
  {
    id: 'pho-hung',
    name: 'Pho Hung',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    address: {
      street: '243 Nguyễn Trãi',
      district: District.D1,
      city: 'Ho Chi Minh City',
      postalCode: '700000',
    },
    features: ['Pho', 'Vietnamese', 'Breakfast'],
    priceRange: 'low',
  },
  {
    id: 'banh-mi-ba-huynh',
    name: 'Bánh Mì Bà Huynh',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    address: {
      street: '197A Nguyễn Trãi',
      district: District.D1,
      city: 'Ho Chi Minh City',
      postalCode: '700000',
    },
    features: ['Banh Mi', 'Street Food', 'Takeaway'],
    priceRange: 'low',
  },
  {
    id: 'tippys-mexican',
    name: "Tippy's Mexican Food",
    type: LocationType.Restaurant,
    cuisine: Cuisine.Mexican,
    address: {
      street: '99 Số 45',
      district: District.D4,
      city: 'Ho Chi Minh City',
      postalCode: '72800',
    },
    features: ['Mexican', 'Casual Dining', 'Dine-in'],
    priceRange: 'medium',
  },
  {
    id: 'rico-taco',
    name: 'Rico Taco',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Mexican,
    address: {
      street: '74/7 Hai Bà Trưng',
      district: District.D1,
      city: 'Ho Chi Minh City',
    },
    features: ['Mexican', 'Tacos', 'Casual'],
    priceRange: 'medium',
  },
  {
    id: 'kowloon-bingsutt',
    name: 'Kowloon Bingsutt',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Chinese,
    address: {
      street: '74 Bùi Hữu Nghĩa',
      district: District.D5,
      city: 'Ho Chi Minh City',
    },
    features: ['Chinese', 'Dim Sum', 'Dessert'],
    priceRange: 'medium',
  },
  {
    id: 'ho-ho-mei',
    name: 'HO HO MEI',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Chinese,
    address: {
      street: '906 Đ. Tạ Quang Bửu',
      district: District.D8,
      city: 'Ho Chi Minh City',
      postalCode: '70000',
    },
    features: ['Chinese', 'Noodles', 'Dim Sum'],
    priceRange: 'medium',
  },
  {
    id: 'dulce-de-saigon',
    name: 'Dulce de Saigon',
    type: LocationType.Dessert,
    cuisine: Cuisine.Dessert,
    address: {
      street: '382/15 Nguyễn Thị Minh Khai',
      district: District.D3,
      city: 'Ho Chi Minh City',
    },
    features: ['Cakes', 'Pies', 'Cafe'],
    priceRange: 'medium',
    description: 'Specialty cakes and pies',
  },
  {
    id: 'dosh-doughnuts',
    name: 'Dosh Doughnuts',
    type: LocationType.Dessert,
    cuisine: Cuisine.Dessert,
    address: {
      street: '42 Nguyễn Huệ',
      district: District.D1,
      city: 'Ho Chi Minh City',
      postalCode: '70000',
    },
    features: ['Donuts', 'Coffee', 'Takeaway'],
    priceRange: 'medium',
  },
  {
    id: 'maison-marou',
    name: 'Maison Marou Flagship',
    type: LocationType.Cafe,
    cuisine: Cuisine.Dessert,
    address: {
      street: '90 Xuân Thủy',
      district: District.D2,
      city: 'Ho Chi Minh City',
      postalCode: '700000',
    },
    features: ['Chocolate', 'Cafe', 'Desserts'],
    priceRange: 'high',
    description: 'Premium chocolate cafe and manufacturer',
  },
  {
    id: 'little-hanoi',
    name: 'Little HaNoi Egg Coffee',
    type: LocationType.Cafe,
    cuisine: Cuisine.Coffee,
    address: {
      street: '119/5 Đ. Yersin',
      district: District.D1,
      city: 'Ho Chi Minh City',
    },
    features: ['Egg Coffee', 'Vietnamese Coffee', 'Cafe'],
    priceRange: 'medium',
    website: 'http://littlehanoieggcoffee.vn/',
  },
  {
    id: 'blank-lounge',
    name: 'Blank Lounge Landmark',
    type: LocationType.Bar,
    address: {
      street: '208 Nguyen Huu Canh, Floor 75th - 76th, Landmark 81',
      district: District.BinhThanh,
      city: 'Ho Chi Minh City',
      postalCode: '70000',
    },
    features: ['Rooftop', 'Cocktails', 'View'],
    priceRange: 'high',
    website: 'http://www.blank-lounge.com/',
  },
  {
    id: 'shadow-lounge',
    name: 'Shadow Lounge',
    type: LocationType.Bar,
    address: {
      street: '244 Pasteur',
      district: District.D3,
      city: 'Ho Chi Minh City',
      postalCode: '700000',
    },
    features: ['Cocktails', 'Nightlife', 'Music'],
    priceRange: 'high',
  },
  {
    id: 'the-workshop',
    name: 'The Workshop Coffee',
    type: LocationType.Cafe,
    cuisine: Cuisine.Coffee,
    address: {
      street: '27 Ngô Đức Kế',
      district: District.D1,
      city: 'Ho Chi Minh City',
      postalCode: '700000',
    },
    features: ['Specialty Coffee', 'Workspace', 'Industrial Design'],
    priceRange: 'medium',
    description: 'Industrial-style specialty coffee roastery and cafe',
  },
];
