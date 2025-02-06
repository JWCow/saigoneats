'use client';

import React from 'react';
import FilterSidebar from '@/components/features/FilterSidebar';
import LocationGrid from '@/components/features/LocationGrid';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { locations, District } from '@/data/locations';
import { useSearchParams } from 'next/navigation';

export default function LocationsPage() {
  const setLocations = useLocationStore((state) => state.setLocations);
  const setSelectedDistrict = useLocationStore((state) => state.setSelectedDistrict);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLocations(locations);

    // Get district from URL parameters and validate it
    const district = searchParams.get('district');
    if (district && Object.values(District).includes(district as District)) {
      setSelectedDistrict(district as District);
    }
  }, [setLocations, setSelectedDistrict, searchParams]);

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
