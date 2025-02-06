'use client';

import React, { useEffect } from 'react';
import FilterSidebar from '@/components/features/FilterSidebar';
import LocationGrid from '@/components/features/LocationGrid';
import { useLocationStore } from '@/lib/store';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { District, Cuisine, Location, LocationType } from '@/data/locations';
import { useSearchParams, useRouter } from 'next/navigation';
import UserSubmissions from '@/components/features/UserSubmissions';

export default function LocationsPage() {
  const setLocations = useLocationStore((state) => state.setLocations);
  const setSelectedDistrict = useLocationStore((state) => state.setSelectedDistrict);
  const setSelectedCuisine = useLocationStore((state) => state.setSelectedCuisine);
  const setSelectedType = useLocationStore((state) => state.setSelectedType);
  const resetFilters = useLocationStore((state) => state.resetFilters);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Load locations from Firebase
    const loadLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'locations'));
        const loadedLocations: Location[] = [];
        querySnapshot.forEach((doc) => {
          loadedLocations.push({ id: doc.id, ...doc.data() } as Location);
        });
        setLocations(loadedLocations);
      } catch (error) {
        console.error('Error loading locations:', error);
      }
    };

    loadLocations();
  }, [setLocations]);

  useEffect(() => {
    // Get parameters from URL and set filters
    const type = searchParams.get('type');
    const district = searchParams.get('district');
    const cuisine = searchParams.get('cuisine');

    if (type && Object.values(LocationType).includes(type.toLowerCase() as LocationType)) {
      setSelectedType(type.toLowerCase() as LocationType);
    }

    if (district && Object.values(District).includes(district as District)) {
      setSelectedDistrict(district as District);
    }

    if (cuisine) {
      const normalizedCuisine = cuisine
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');

      const matchingCuisine = Object.values(Cuisine).find(
        (c) => c.toLowerCase() === cuisine.toLowerCase()
      );

      if (matchingCuisine) {
        setSelectedCuisine(matchingCuisine);
      }
    }
  }, [searchParams, setSelectedDistrict, setSelectedCuisine, setSelectedType]);

  // Get the current filter values for the header text
  const district = searchParams.get('district');
  const cuisine = searchParams.get('cuisine');
  const type = searchParams.get('type');

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
    if (type) return `${formatName(type)}s`;
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

          {/* Hidden UserSubmissions to load data */}
          <div className="hidden">
            <UserSubmissions />
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
