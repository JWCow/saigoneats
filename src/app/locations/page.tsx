'use client';

import React from 'react';
import FilterSidebar from '@/components/features/FilterSidebar';
import LocationGrid from '@/components/features/LocationGrid';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { locations } from '@/data/locations';

export default function LocationsPage() {
  const setLocations = useLocationStore((state) => state.setLocations);

  useEffect(() => {
    console.log('All locations:', locations);
    setLocations(locations);
  }, [setLocations]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Locations</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <FilterSidebar />
        </div>
        <div className="flex-1">
          <LocationGrid />
        </div>
      </div>
    </div>
  );
}
