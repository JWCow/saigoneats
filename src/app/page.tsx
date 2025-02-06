'use client';

import React from 'react';
import Link from 'next/link';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { locations, District, Cuisine } from '@/data/locations';
import { MapPin, Utensils } from 'lucide-react';
import UserSubmissions from '@/components/features/UserSubmissions';

export default function Home() {
  const setLocations = useLocationStore((state) => state.setLocations);

  useEffect(() => {
    setLocations(locations);
  }, [setLocations]);

  // Helper function to format cuisine names
  const formatCuisineName = (cuisine: string) => {
    return cuisine
      .split(/[\s_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Get main cuisines (excluding unpopulated and utility categories)
  const mainCuisines = Object.values(Cuisine).filter(
    (cuisine) =>
      ![
        'cafe',
        'bakery',
        'dessert',
        'international',
        'fusion',
        'seafood',
        'bbq',
        'street_food',
      ].includes(cuisine)
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Discover the Best Food in</span>
              <span className="block text-orange-600">Ho Chi Minh City</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
              Find and explore the finest restaurants, cafes, and hidden gems in Saigon.
            </p>
          </div>
        </div>
      </section>

      {/* Districts Overview */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Where do you want to eat?
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
            {Object.values(District).map((district) => (
              <Link
                key={district}
                href={`/locations?district=${encodeURIComponent(district)}`}
                className="group relative bg-white p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-orange-200"
              >
                <div className="flex items-center space-x-1.5">
                  <MapPin className="h-3 w-3 text-orange-500" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                    {district}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cuisines Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            What are you craving?
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
            {mainCuisines.map((cuisine) => (
              <Link
                key={cuisine}
                href={`/locations?cuisine=${encodeURIComponent(cuisine)}`}
                className="group relative bg-white p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-orange-200"
              >
                <div className="flex items-center space-x-1.5">
                  <Utensils className="h-3 w-3 text-orange-500" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                    {formatCuisineName(cuisine)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Additions Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Latest Additions
              </h2>
              <p className="text-gray-600">Recent locations suggested by our community</p>
            </div>
            <Link href="/new" className="text-orange-600 hover:text-orange-700 font-medium">
              View all →
            </Link>
          </div>
          <UserSubmissions />
        </div>
      </section>
    </div>
  );
}
