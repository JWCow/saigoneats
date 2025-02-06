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
    setLocations(locations);
  }, [setLocations]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Locations</h1>
            <p className="mt-2 text-sm text-gray-500">
              Discover great places to eat and drink in Ho Chi Minh City
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="w-full md:w-64 flex-none">
              <FilterSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <LocationGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
