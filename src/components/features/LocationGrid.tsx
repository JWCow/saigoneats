'use client';

import React from 'react';
import { useLocationStore } from '@/lib/store';
import { Location } from '@/data/locations';
import Link from 'next/link';
import { MapPin, ExternalLink, DollarSign } from 'lucide-react';

interface LocationCardProps {
  location: Location;
}

function LocationCard({ location }: LocationCardProps) {
  const priceRangeMap = {
    low: { icon: <DollarSign className="h-4 w-4" />, label: 'Budget-friendly' },
    medium: { icon: <DollarSign className="h-4 w-4" />, label: 'Moderate' },
    high: { icon: <DollarSign className="h-4 w-4" />, label: 'High-end' },
  };

  return (
    <Link href={`/location/${location.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Image placeholder - replace with actual image when available */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <div className="p-4 flex items-end">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800">
              {location.type}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
            {location.name}
          </h3>

          <div className="mt-4 space-y-2">
            {/* Address */}
            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p>{location.address.street}</p>
                <p>
                  {location.address.district}, {location.address.city}
                </p>
              </div>
            </div>

            {/* Price Range */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {priceRangeMap[location.priceRange].icon}
              <span>{priceRangeMap[location.priceRange].label}</span>
            </div>

            {/* Features */}
            {location.features && location.features.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {location.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Google Maps Link */}
          {location.googleMapsUrl && (
            <div className="mt-4 pt-4 border-t">
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm text-orange-600 hover:text-orange-700"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View on Google Maps</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function LocationGrid() {
  const { filteredLocations } = useLocationStore();

  if (filteredLocations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No locations found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredLocations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
