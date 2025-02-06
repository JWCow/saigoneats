'use client';

import Image from 'next/image';
import { Location } from '@/data/locations';
import MapLink from '@/components/ui/MapLink';

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
        <div className="space-y-2">
          <p className="text-gray-600 text-sm">{restaurant.fullAddress}</p>
          <MapLink location={restaurant} />
          <div className="flex justify-between items-center">
            {restaurant.submittedAt && (
              <span className="text-sm text-gray-500">
                Added {new Date(restaurant.submittedAt).toLocaleDateString()}
              </span>
            )}
            <span className="text-orange-600 font-medium">
              {restaurant.priceRange === 'low'
                ? '$'
                : restaurant.priceRange === 'medium'
                  ? '$$'
                  : '$$$'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
