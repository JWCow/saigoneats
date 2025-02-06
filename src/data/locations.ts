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
  // Asian Cuisines
  Vietnamese = 'vietnamese',
  Chinese = 'chinese',
  Japanese = 'japanese',
  Korean = 'korean',
  Thai = 'thai',

  // Western Cuisines
  American = 'american',
  Italian = 'italian',
  French = 'french',
  Mexican = 'mexican',

  // Categories
  Pizza = 'pizza',
  Burger = 'burger',
  Seafood = 'seafood',
  BBQ = 'bbq',

  // Other
  International = 'international',
  Fusion = 'fusion',
  StreetFood = 'street food',
  Cafe = 'cafe',
  Bakery = 'bakery',
  Dessert = 'dessert',
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
}

export const locations: Location[] = [
  {
    id: 'pizza-4ps-vivo',
    name: "Pizza 4P's - Vivo City",
    type: LocationType.Restaurant,
    cuisine: Cuisine.Pizza,
    fullAddress: 'SC Vivo City, 1058 Đ. Nguyễn Văn Linh, District 7, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Pizza+4Ps+Vivo+City',
    features: ['Dine-in', 'Takeaway', 'Delivery'],
    priceRange: 'high',
    description: 'Famous for their unique Japanese-Italian fusion pizzas',
    website: {
      url: 'https://pizza4ps.com',
      label: 'Visit Website',
    },
    contact: {
      phone: '1900 6043',
      phoneClickable: '+1900604343',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'pizza-4ps-thu-khoa-huan',
    name: "Pizza 4P's - Thu Khoa Huan",
    type: LocationType.Restaurant,
    cuisine: Cuisine.Pizza,
    fullAddress: '8 Thu Khoa Huan Street, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Pizza+4Ps+Thu+Khoa+Huan',
    features: ['Dine-in', 'Takeaway', 'Delivery'],
    priceRange: 'high',
    contact: {
      phone: '1900 6043',
      phoneClickable: '+1900604343',
    },
    description: 'Famous for their unique Japanese-Italian fusion pizzas - District 1 branch',
    suggestedBy: 'Moi',
  },
  {
    id: 'pho-hoa',
    name: 'Pho Hoa',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '260C Pasteur Street, District 3, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Pho+Hoa+Pasteur+Ho+Chi+Minh+City',
    features: ['Pho', 'Vietnamese', 'Breakfast', 'Dine-in', 'Takeaway'],
    priceRange: 'low',
    contact: {
      phone: '+84 28 3829 7943',
    },
    description: 'Traditional Vietnamese pho restaurant',
    suggestedBy: 'Moi',
  },
  {
    id: 'el-gaucho',
    name: 'El Gaucho',
    type: LocationType.Restaurant,
    cuisine: Cuisine.American,
    fullAddress: '74/1 Hai Ba Trung, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=El+Gaucho+Hai+Ba+Trung+Ho+Chi+Minh+City',
    features: ['Steakhouse', 'Fine Dining', 'Wine', 'Dine-in', 'Reservation'],
    priceRange: 'high',
    contact: {
      phone: '+84 28 3823 2227',
    },
    description: 'Premium steakhouse offering high-quality cuts and fine dining experience',
    website: {
      url: 'https://elgaucho.asia',
      label: 'Visit Website',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'paper-plate-pizza',
    name: 'Paper Plate Pizza',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Pizza,
    fullAddress: '25/26B Đ. Tôn Thất Tùng, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Paper+Plate+Pizza+Ho+Chi+Minh+City',
    features: ['NY Style Pizza', 'Dine-in', 'Takeaway'],
    priceRange: 'medium',
    description: 'Authentic New York style pizza in Saigon',
    contact: {
      phone: '+84 90 909 3726',
      phoneClickable: '+84909093726',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'archies-pizza',
    name: "Archie's American Pizza & Wing",
    type: LocationType.Restaurant,
    cuisine: Cuisine.Pizza,
    fullAddress: '624 Võ Văn Kiệt, District 5, Ho Chi Minh City, 70000',
    googleMapsUrl: 'https://maps.google.com/?q=Archies+American+Pizza+Wing+Ho+Chi+Minh+City',
    features: ['American Style', 'Wings', 'Dine-in'],
    priceRange: 'medium',
    contact: {
      phone: '+84 28 3838 6200',
      phoneClickable: '+842838386200',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'hungry-bunny',
    name: 'The HUNGRY BUNNY',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Burger,
    fullAddress: '1 Đ. Nguyễn Cửu Vân, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=The+Hungry+Bunny+Ho+Chi+Minh+City',
    features: ['American Bistro', 'Burgers', 'Dine-in'],
    priceRange: 'medium',
    description: 'American bistro specializing in gourmet burgers',
    website: {
      url: 'http://www.facebook.com/hungrybunnybistro',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3823 1111',
      phoneClickable: '+842838231111',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'mad-roosta',
    name: 'MAD ROOSTA',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Burger,
    fullAddress: 'Level 2, 95 Hai Bà Trưng, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Mad+Roosta+Ho+Chi+Minh+City',
    features: ['Burgers', 'Grill', 'Dine-in'],
    priceRange: 'medium',
    description: 'Specialty burger and grill restaurant',
    contact: {
      phone: '+84 28 3821 0101',
      phoneClickable: '+842838210101',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'red-bison',
    name: 'Red Bison Grill',
    type: LocationType.Restaurant,
    cuisine: Cuisine.American,
    fullAddress: '56 P. Đức Chính, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Red+Bison+Grill+Ho+Chi+Minh+City',
    features: ['Steakhouse', 'American Grill', 'Dine-in'],
    priceRange: 'high',
    contact: {
      phone: '+84 28 3823 8000',
      phoneClickable: '+842838238000',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'eddies-diner',
    name: "Eddie's New York Deli & Diner",
    type: LocationType.Restaurant,
    cuisine: Cuisine.American,
    fullAddress: '73 Pasteur, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Eddies+New+York+Deli+Diner+Ho+Chi+Minh+City',
    features: ['Deli', 'American Diner', 'Breakfast'],
    priceRange: 'medium',
    description: 'Authentic New York style deli and diner',
    contact: {
      phone: '+84 28 3822 7827',
      phoneClickable: '+842838227827',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'quan-ut-ut',
    name: 'Quán Ụt Ụt',
    type: LocationType.Restaurant,
    cuisine: Cuisine.American,
    fullAddress: '168 Võ Văn Kiệt, District 1, Ho Chi Minh City, 70000',
    googleMapsUrl: 'https://maps.google.com/?q=Quan+Ut+Ut+Ho+Chi+Minh+City',
    features: ['BBQ', 'American', 'Beer'],
    priceRange: 'medium',
    description: 'American-style BBQ restaurant',
    website: {
      url: 'https://quanutut.com',
      label: 'Visit Website',
    },
    contact: {
      phone: '+84 28 6259 2959',
      phoneClickable: '+842862592959',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'bun-thit-nuong',
    name: 'Bún Thịt Nướng Chả Giò',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '1 Đ. Nguyễn Trung Trực, District 1, Ho Chi Minh City',
    googleMapsUrl:
      'https://maps.google.com/?q=Bun+Thit+Nuong+Cha+Gio+Nguyen+Trung+Truc+Ho+Chi+Minh+City',
    features: ['Vietnamese', 'Local Cuisine', 'Street Food'],
    priceRange: 'low',
    contact: {
      phone: '+84 28 3823 1085',
      phoneClickable: '+842838231085',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'den-long',
    name: 'Den Long - Home Cooked Vietnamese Restaurant',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '130 Nguyễn Trãi, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Den+Long+Restaurant+Ho+Chi+Minh+City',
    features: ['Vietnamese', 'Home Style', 'Dine-in'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/denlongrestaurant',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3925 1248',
      phoneClickable: '+842839251248',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'pho-hung',
    name: 'Pho Hung',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '243 Nguyễn Trãi, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Pho+Hung+Nguyen+Trai+Ho+Chi+Minh+City',
    features: ['Pho', 'Vietnamese', 'Breakfast'],
    priceRange: 'low',
    contact: {
      phone: '+84 28 3836 3595',
      phoneClickable: '+842838363595',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'banh-mi-ba-huynh',
    name: 'Bánh Mì Bà Huynh',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '197A Nguyễn Trãi, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Banh+Mi+Ba+Huynh+Ho+Chi+Minh+City',
    features: ['Banh Mi', 'Street Food', 'Takeaway'],
    priceRange: 'low',
    contact: {
      phone: '+84 28 3925 0505',
      phoneClickable: '+842839250505',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'tippys-mexican',
    name: "Tippy's Mexican Food",
    type: LocationType.Restaurant,
    cuisine: Cuisine.Mexican,
    fullAddress: '99 Số 45, District 4, Ho Chi Minh City, 72800',
    googleMapsUrl: 'https://maps.google.com/?q=Tippys+Mexican+Food+Ho+Chi+Minh+City',
    features: ['Mexican', 'Casual Dining', 'Dine-in'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/tippysmexicanfood',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3825 7789',
      phoneClickable: '+842838257789',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'rico-taco',
    name: 'Rico Taco',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Mexican,
    fullAddress: '74/7 Hai Bà Trưng, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Rico+Taco+Ho+Chi+Minh+City',
    features: ['Mexican', 'Tacos', 'Casual'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/ricotacovn',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3823 4173',
      phoneClickable: '+842838234173',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'kowloon-bingsu',
    name: 'Kowloon Bingsu',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Chinese,
    fullAddress: '74 Bùi Hữu Nghĩa, District 5, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Kowloon+Bingsutt+Ho+Chi+Minh+City',
    features: ['Chinese', 'Dim Sum', 'Dessert'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/profile.php?id=100064631624687',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3838 6868',
      phoneClickable: '+842838386868',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'ho-ho-mei',
    name: 'HO HO MEI',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Chinese,
    fullAddress: '906 Đ. Tạ Quang Bửu, District 8, Ho Chi Minh City, 70000',
    googleMapsUrl: 'https://maps.google.com/?q=Ho+Ho+Mei+Ho+Chi+Minh+City',
    features: ['Chinese', 'Noodles', 'Dim Sum'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/HoHoMei.DiemTam.MiGia',
      label: 'Visit Facebook Page'
    },
    contact: {
      phone: '+84 28 3981 8181',
      phoneClickable: '+842839818181',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'dulce-de-saigon',
    name: 'Dulce de Saigon',
    type: LocationType.Dessert,
    cuisine: Cuisine.Dessert,
    fullAddress: '382/15 Nguyễn Thị Minh Khai, District 3, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Dulce+de+Saigon+Ho+Chi+Minh+City',
    features: ['Cakes', 'Pies', 'Cafe'],
    priceRange: 'medium',
    description: 'Specialty cakes and pies',
    website: {
      url: 'https://www.facebook.com/profile.php?id=100063623841689',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3930 2626',
      phoneClickable: '+842839302626',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'dosh-doughnuts',
    name: 'Dosh Doughnuts',
    type: LocationType.Dessert,
    cuisine: Cuisine.Dessert,
    fullAddress: '42 Nguyễn Huệ, District 1, Ho Chi Minh City, 70000',
    googleMapsUrl: 'https://maps.google.com/?q=Dosh+Doughnuts+Ho+Chi+Minh+City',
    features: ['Donuts', 'Coffee', 'Takeaway'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/profile.php?id=100090423393402',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 90 909 0042',
      phoneClickable: '+84909090042',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'maison-marou',
    name: 'Maison Marou Flagship',
    type: LocationType.Cafe,
    cuisine: Cuisine.Dessert,
    fullAddress: '90 Xuân Thủy, District 2, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Maison+Marou+Flagship+Ho+Chi+Minh+City',
    features: ['Chocolate', 'Cafe', 'Desserts'],
    priceRange: 'high',
    description: 'Premium chocolate cafe and manufacturer',
    website: {
      url: 'https://maisonmarou.com',
      label: 'Visit Website',
    },
    contact: {
      phone: '+84 28 3929 2753',
      phoneClickable: '+842839292753',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'little-hanoi',
    name: 'Little HaNoi Egg Coffee',
    type: LocationType.Cafe,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '119/5 Đ. Yersin, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Little+Hanoi+Egg+Coffee+Ho+Chi+Minh+City',
    features: ['Egg Coffee', 'Vietnamese Coffee', 'Cafe'],
    priceRange: 'medium',
    contact: {
      phone: '+84 90 167 8868',
      phoneClickable: '+84901678868',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'blank-lounge',
    name: 'Blank Lounge Landmark',
    type: LocationType.Bar,
    fullAddress:
      '208 Nguyen Huu Canh, Floor 75th - 76th, Landmark 81, Binh Thanh, Ho Chi Minh City, 70000',
    googleMapsUrl: 'https://maps.google.com/?q=Blank+Lounge+Landmark+81+Ho+Chi+Minh+City',
    features: ['Rooftop', 'Cocktails', 'View'],
    priceRange: 'high',
    website: {
      url: 'https://www.facebook.com/blankloungelandmark81',
      label: 'Visit Facebook Page'
    },
    contact: {
      phone: '+84 28 3827 2727',
      phoneClickable: '+842838272727',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'shadow-lounge',
    name: 'Shadow Lounge',
    type: LocationType.Bar,
    fullAddress: '244 Pasteur, District 3, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Shadow+Lounge+Pasteur+Ho+Chi+Minh+City',
    features: ['Cocktails', 'Nightlife', 'Music'],
    priceRange: 'high',
    contact: {
      phone: '+84 90 998 8889',
      phoneClickable: '+84909988889',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'the-workshop',
    name: 'The Workshop Coffee',
    type: LocationType.Cafe,
    cuisine: Cuisine.Cafe,
    fullAddress: '27 Ngô Đức Kế, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=The+Workshop+Coffee+Ho+Chi+Minh+City',
    features: ['Specialty Coffee', 'Workspace', 'Industrial Design'],
    priceRange: 'medium',
    description: 'Industrial-style specialty coffee roastery and cafe',
    website: {
      url: 'https://facebook.com/theworkshopsaigon',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3824 6801',
      phoneClickable: '+842838246801',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'the-cafe-apartment',
    name: 'The Cafe Apartment',
    type: LocationType.CoffeeShop,
    cuisine: Cuisine.Cafe,
    fullAddress: '42 Nguyễn Huệ, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Cafe+Apartment+Nguyen+Hue+Ho+Chi+Minh+City',
    features: ['Historic Building', 'Multiple Cafes', 'View'],
    priceRange: 'medium',
    description: 'Historic apartment building converted into multiple unique cafes',
    website: {
      url: 'https://www.facebook.com/cafeapartment42nguyenhue',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3824 1534',
      phoneClickable: '+842838241534',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'saigon-casa-cafe',
    name: 'Saigon Casa Café',
    type: LocationType.Cafe,
    cuisine: Cuisine.Cafe,
    fullAddress: '07 Phạm Ngọc Thạch, District 3, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Saigon+Casa+Cafe+Ho+Chi+Minh+City',
    features: ['Coffee', 'Workspace', 'Modern'],
    priceRange: 'medium',
    website: {
      url: 'https://saigoncasacafe.com.vn/',
      label: 'Visit Website',
    },
    contact: {
      phone: '+84 28 3933 3933',
      phoneClickable: '+842839333933',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'cong-caphe',
    name: 'Cong Caphe',
    type: LocationType.Cafe,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '26 Ly Tu Trong Level 1, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Cong+Caphe+Ly+Tu+Trong+Ho+Chi+Minh+City',
    features: ['Vietnamese Coffee', 'Retro Style', 'Chain'],
    priceRange: 'medium',
    website: {
      url: 'https://congcaphe.com',
      label: 'Visit Website',
    },
    contact: {
      phone: '+84 28 3821 0023',
      phoneClickable: '+842838210023',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'lusine-dong-khoi',
    name: "L'Usine Dong Khoi",
    type: LocationType.Cafe,
    cuisine: Cuisine.French,
    fullAddress: '151 Đ. Đồng Khởi, District 1, Ho Chi Minh City, 70000',
    googleMapsUrl: 'https://maps.google.com/?q=LUsine+Dong+Khoi+Ho+Chi+Minh+City',
    features: ['French Cafe', 'Art Shop', 'Brunch'],
    priceRange: 'high',
    website: {
      url: 'https://www.facebook.com/lusinespace',
      label: 'Visit Facebook Page'
    },
    contact: {
      phone: '+84 28 6674 3565',
      phoneClickable: '+842866743565',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'mister-waffle',
    name: 'Mister Waffle',
    type: LocationType.Cafe,
    cuisine: Cuisine.Dessert,
    fullAddress: '72 Hàm Nghi, District 1, Ho Chi Minh City, 710000',
    googleMapsUrl: 'https://maps.google.com/?q=Mister+Waffle+Ham+Nghi+Ho+Chi+Minh+City',
    features: ['Waffles', 'Desserts', 'Coffee'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/misterwaffle.vn',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3821 0068',
      phoneClickable: '+842838210068',
    },
    suggestedBy: 'Moi',
  },
  {
    id: '43-factory',
    name: '43 Factory Coffee Roaster',
    type: LocationType.CoffeeShop,
    cuisine: Cuisine.Cafe,
    fullAddress: '178a Pasteur, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=43+Factory+Coffee+Roaster+Ho+Chi+Minh+City',
    features: ['Specialty Coffee', 'Coffee Roastery', 'Modern'],
    priceRange: 'high',
    website: {
      url: 'https://www.facebook.com/43factory',
      label: 'Visit Facebook Page'
    },
    contact: {
      phone: '+84 90 671 4343',
      phoneClickable: '+84906714343',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'spa-nhan-tam',
    name: 'Spa Nhân Tâm',
    type: LocationType.Spa,
    fullAddress: '113 Đ. Bùi Thị Xuân, District 1, Ho Chi Minh City, 758000',
    googleMapsUrl: 'https://maps.google.com/?q=Spa+Nhan+Tam+Ho+Chi+Minh+City',
    features: ['Massage', 'Spa Services', 'Relaxation'],
    priceRange: 'medium',
    contact: {
      phone: '+84 28 3925 1724',
      phoneClickable: '+842839251724',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'faro-cafe',
    name: 'Faro Cafe Thảo Điền',
    type: LocationType.Cafe,
    cuisine: Cuisine.Cafe,
    fullAddress: '81 Xuân Thủy, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Faro+Cafe+Thao+Dien+Ho+Chi+Minh+City',
    features: ['Coffee', 'Modern Design', 'Workspace'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/farocafe.thaodien',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3519 4532',
      phoneClickable: '+842835194532',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'running-bean-htm',
    name: 'The Running Bean Hồ Tùng Mậu',
    type: LocationType.CoffeeShop,
    cuisine: Cuisine.Cafe,
    fullAddress: '115 Đ. Hồ Tùng Mậu, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=The+Running+Bean+Ho+Tung+Mau+Ho+Chi+Minh+City',
    features: ['Coffee', 'Breakfast', 'Casual'],
    priceRange: 'medium',
    contact: {
      phone: '+84 28 3821 0101',
      phoneClickable: '+842838210101',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'running-bean-mtb',
    name: 'The Running Bean Mạc Thị Bưởi',
    type: LocationType.CoffeeShop,
    cuisine: Cuisine.Cafe,
    fullAddress: '33 Mạc Thị Bưởi, District 1, Ho Chi Minh City, 70000',
    googleMapsUrl: 'https://maps.google.com/?q=The+Running+Bean+Mac+Thi+Buoi+Ho+Chi+Minh+City',
    features: ['Coffee', 'Breakfast', 'Business District'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/therunningbean.vn',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3521 0101',
      phoneClickable: '+842835210101',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'mojo-nguyen-hue',
    name: 'MOJO Boutique Coffee',
    type: LocationType.CoffeeShop,
    cuisine: Cuisine.Cafe,
    fullAddress: '129 Đ. Nguyễn Huệ, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=MOJO+Boutique+Coffee+Nguyen+Hue+Ho+Chi+Minh+City',
    features: ['Specialty Coffee', 'Modern', 'Central Location'],
    priceRange: 'medium',
    contact: {
      phone: '+84 28 3821 9766',
      phoneClickable: '+842838219766',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'tonkin-garden',
    name: 'Tonkin Garden Egg Coffee & Eatery',
    type: LocationType.Cafe,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '135/50 Trần Hưng Đạo, District 1, Ho Chi Minh City, 71009',
    googleMapsUrl: 'https://maps.google.com/?q=Tonkin+Garden+Egg+Coffee+Ho+Chi+Minh+City',
    features: ['Egg Coffee', 'Vietnamese Coffee', 'Croissants'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/profile.php?id=100063674682435',
      label: 'Visit Facebook Page'
    },
    contact: {
      phone: '+84 90 909 1135',
      phoneClickable: '+84909091135',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'signature-coffee-house',
    name: 'SIGNATURE By The Coffee House',
    type: LocationType.CoffeeShop,
    cuisine: Cuisine.Cafe,
    fullAddress: 'Crescent Mall, 101 Tôn Dật Tiên, District 7, Ho Chi Minh City',
    googleMapsUrl:
      'https://maps.google.com/?q=SIGNATURE+By+The+Coffee+House+Crescent+Mall+Ho+Chi+Minh+City',
    features: ['Premium Coffee', 'Mall Location', 'Modern'],
    priceRange: 'medium',
    website: {
      url: 'https://thecoffeehouse.com',
      label: 'Visit Website',
    },
    contact: {
      phone: '+84 28 7109 9909',
      phoneClickable: '+842871099909',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'fig-cafe',
    name: 'The Fig Café',
    type: LocationType.Cafe,
    cuisine: Cuisine.International,
    fullAddress: '7a Nguyễn Bính, District 7, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=The+Fig+Cafe+Ho+Chi+Minh+City',
    features: ['Cafe', 'International Menu', 'Cozy'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/thefigcafesaigon',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 5410 9956',
      phoneClickable: '+842854109956',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'agave-saigon',
    name: 'Agave Saigon Mexican Restaurant',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Mexican,
    fullAddress: '13 Pasteur, District 1, Ho Chi Minh City, 70000',
    googleMapsUrl: 'https://maps.google.com/?q=Agave+Saigon+Mexican+Restaurant+Ho+Chi+Minh+City',
    features: ['Mexican', 'Authentic', 'Bar'],
    priceRange: 'high',
    contact: {
      phone: '+84 28 3825 6373',
      phoneClickable: '+842838256373',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'chido-mexican',
    name: 'Chido Mexican',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Mexican,
    fullAddress: '32 Trần Ngọc Diện, District 1, Ho Chi Minh City, 713384',
    googleMapsUrl: 'https://maps.google.com/?q=Chido+Mexican+Ho+Chi+Minh+City',
    features: ['Mexican', 'Casual Dining', 'Tacos'],
    priceRange: 'medium',
    contact: {
      phone: '+84 28 6680 8895',
      phoneClickable: '+842866808895',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'el-camino',
    name: 'El Camino Taqueria',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Mexican,
    fullAddress: '32 Nguyễn Duy Hiệu, District 1, Ho Chi Minh City, 70000',
    googleMapsUrl: 'https://maps.google.com/?q=El+Camino+Taqueria+Ho+Chi+Minh+City',
    features: ['Tacos', 'Mexican', 'Casual'],
    priceRange: 'medium',
    contact: {
      phone: '+84 90 838 1313',
      phoneClickable: '+84908381313',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'sul-bingsu',
    name: 'Sul Bingsu',
    type: LocationType.Dessert,
    cuisine: Cuisine.Korean,
    fullAddress: '219 Nguyễn Trãi, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Sul+Bingsu+Ho+Chi+Minh+City',
    features: ['Korean Desserts', 'Bingsu', 'Ice Cream'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/sulbingsu.vn',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3925 9562',
      phoneClickable: '+842839259562',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'crispy-donuts',
    name: 'Crispy Donuts Thảo Điền',
    type: LocationType.Dessert,
    cuisine: Cuisine.Dessert,
    fullAddress: '97A Xuân Thủy, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=Crispy+Donuts+Thao+Dien+Ho+Chi+Minh+City',
    features: ['Donuts', 'Coffee', 'Takeaway'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/crispydonutsvn',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3519 4023',
      phoneClickable: '+842835194023',
    },
    suggestedBy: 'Moi',
  },
  {
    id: '350f',
    name: 'The 350F',
    type: LocationType.Bakery,
    cuisine: Cuisine.Bakery,
    fullAddress: '69A Xuân Thủy, District 1, Ho Chi Minh City, 700000',
    googleMapsUrl: 'https://maps.google.com/?q=The+350F+Xuan+Thuy+Ho+Chi+Minh+City',
    features: ['Bakery', 'Pastries', 'Coffee'],
    priceRange: 'medium',
    website: {
      url: 'https://www.facebook.com/the350f',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3519 0350',
      phoneClickable: '+842835190350',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'manki-artisan',
    name: 'Manki True Artisan Café',
    type: LocationType.CoffeeShop,
    cuisine: Cuisine.Cafe,
    fullAddress: 'Flat No.4, 1st floor, 42bis Lý Tự Trọng, District 1, Ho Chi Minh City, 760000',
    googleMapsUrl: 'https://maps.google.com/?q=Manki+True+Artisan+Cafe+Ho+Chi+Minh+City',
    features: ['Specialty Coffee', 'Artisan', 'Cozy'],
    priceRange: 'medium',
    contact: {
      phone: '+84 90 944 5544',
      phoneClickable: '+84909445544',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'balcony-coffee',
    name: 'The Balcony Coffee',
    type: LocationType.CoffeeShop,
    cuisine: Cuisine.Cafe,
    fullAddress: '26 Lý Tự Trọng, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=The+Balcony+Coffee+Ho+Chi+Minh+City',
    features: ['Coffee', 'View', 'Central Location'],
    priceRange: 'medium',
    description: 'Coffee shop with a view across from Vincom Center',
    website: {
      url: 'https://www.facebook.com/thebalconycoffee.vn',
      label: 'Visit Facebook Page',
    },
    contact: {
      phone: '+84 28 3824 1838',
      phoneClickable: '+842838241838',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'banh-mi-btx',
    name: 'Bánh mì Bùi Thị Xuân',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '122E Đ. Bùi Thị Xuân, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Banh+Mi+Bui+Thi+Xuan+Ho+Chi+Minh+City',
    features: ['Banh Mi', 'Street Food', 'Takeaway'],
    priceRange: 'low',
    contact: {
      phone: '+84 28 3925 0808',
      phoneClickable: '+842839250808',
    },
    suggestedBy: 'Moi',
  },
  {
    id: 'ben-nghe-street-food',
    name: 'Ben Nghe Street Food',
    type: LocationType.Restaurant,
    cuisine: Cuisine.Vietnamese,
    fullAddress: '134 Nam Kỳ Khởi Nghĩa, District 1, Ho Chi Minh City',
    googleMapsUrl: 'https://maps.google.com/?q=Ben+Nghe+Street+Food+Ho+Chi+Minh+City',
    features: ['Street Food', 'Local Cuisine', 'Casual'],
    priceRange: 'low',
    contact: {
      phone: '+84 28 3823 9000',
      phoneClickable: '+842838239000',
    },
    suggestedBy: 'Moi',
  },
];
