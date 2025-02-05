'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { Cuisine } from '@/data/locations';
import Link from 'next/link';

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
          <Link key={location.id} href={`/location/${location.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{location.name}</h3>
                <div className="text-sm text-gray-500 mb-4">
                  <p>{location.address.street}</p>
                  <p>
                    {location.address.district}, {location.address.city}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {location.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {location.priceRange === 'low' ? '$' : location.priceRange === 'medium' ? '$$' : '$$$'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
