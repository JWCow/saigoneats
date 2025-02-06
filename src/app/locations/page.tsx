'use client';

import React from 'react';
import FilterSidebar from '@/components/features/FilterSidebar';
import LocationGrid from '@/components/features/LocationGrid';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { locations, District, Cuisine } from '@/data/locations';
import { useSearchParams } from 'next/navigation';

export default function LocationsPage() {
  const setLocations = useLocationStore((state) => state.setLocations);
  const setSelectedDistrict = useLocationStore((state) => state.setSelectedDistrict);
  const setSelectedCuisine = useLocationStore((state) => state.setSelectedCuisine);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLocations(locations);

    // Get district from URL parameters and validate it
    const district = searchParams.get('district');
    if (district && Object.values(District).includes(district as District)) {
      setSelectedDistrict(district as District);
    }

    // Get cuisine from URL parameters and validate it
    const cuisine = searchParams.get('cuisine');
    if (cuisine && Object.values(Cuisine).includes(cuisine as Cuisine)) {
      setSelectedCuisine(cuisine as Cuisine);
    }
  }, [setLocations, setSelectedDistrict, setSelectedCuisine, searchParams]);

  // Get the current filter values for the header text
  const district = searchParams.get('district');
  const cuisine = searchParams.get('cuisine');

  // Helper function to format names
  const formatName = (str: string) => {
    return str
      .split(/[\s_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Generate header text based on filters
  const getHeaderText = () => {
    if (cuisine) return `${formatName(cuisine)} Restaurants`;
    if (district) return `Restaurants in ${district}`;
    return 'All Locations';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getHeaderText()}</h1>
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
