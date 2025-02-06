'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { Cuisine, Location } from '@/data/locations';
import Link from 'next/link';

const PriceRange = ({ priceRange }: { priceRange: Location['priceRange'] }) => {
  const priceSymbol = priceRange === 'low' ? '$' : priceRange === 'medium' ? '$$' : '$$$';
  return <span className="text-sm text-gray-500">{priceSymbol}</span>;
};

export default function CuisinePage() {
  const params = useParams();
  const { setSelectedCuisine, filteredLocations } = useLocationStore();

  useEffect(() => {
    if (params.cuisine && Object.values(Cuisine).includes(params.cuisine as Cuisine)) {
      setSelectedCuisine(params.cuisine as Cuisine);
    }
  }, [params.cuisine, setSelectedCuisine]);

  if (filteredLocations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 capitalize mb-8">
          {params.cuisine} Cuisine
        </h1>
        <p className="text-gray-600">No locations found for this cuisine type.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 capitalize mb-8">{params.cuisine} Cuisine</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <Link
            href={`/location/${location.id}`}
            key={location.id}
            className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
              <PriceRange priceRange={location.priceRange} />
            </div>
            <div className="text-sm text-gray-500 mb-4">
              <p>{location.fullAddress}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {location.type}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
