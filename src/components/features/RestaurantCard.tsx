'use client';

import Image from 'next/image';
import { Location } from '@/data/locations';

interface RestaurantCardProps {
  restaurant: Location;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={restaurant.images?.[0] || '/placeholder-restaurant.jpg'}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{restaurant.address.street}</p>
        <div className="flex justify-between items-center">
          <span className="text-orange-600 font-medium">
            {restaurant.priceRange === 'low'
              ? '$'
              : restaurant.priceRange === 'medium'
                ? '$$'
                : '$$$'}
          </span>
          {restaurant.rating && (
            <span className="text-sm text-gray-600">⭐ {restaurant.rating.toFixed(1)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
