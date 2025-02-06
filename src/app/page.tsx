'use client';

import React from 'react';
import Link from 'next/link';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { locations, District } from '@/data/locations';
import SearchBar from '@/components/features/SearchBar';
import { MapPin } from 'lucide-react';
import UserSubmissions from '@/components/features/UserSubmissions';

const cuisines = [
  { name: 'Vietnamese', href: '/vietnamese', image: '/cuisines/vietnamese.jpg' },
  { name: 'American', href: '/american', image: '/cuisines/american.jpg' },
  { name: 'Japanese', href: '/japanese', image: '/cuisines/japanese.jpg' },
  { name: 'Italian', href: '/italian', image: '/cuisines/italian.jpg' },
  { name: 'Korean', href: '/korean', image: '/cuisines/korean.jpg' },
  { name: 'Thai', href: '/thai', image: '/cuisines/thai.jpg' },
];

export default function Home() {
  const setLocations = useLocationStore((state) => state.setLocations);

  useEffect(() => {
    setLocations(locations);
  }, [setLocations]);

  const featuredLocations = locations.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Improved mobile spacing */}
      <section className="relative bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-gray-900">
              <span className="block mb-2">Discover the Best Food in</span>
              <span className="block text-orange-600">Ho Chi Minh City</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl px-4 sm:px-0">
              Find and explore the finest restaurants across different cuisines in Saigon.
            </p>
            <div className="mt-6 sm:mt-8 max-w-xl mx-auto px-4 sm:px-6">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* District Selection */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Where do you want to eat?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {Object.values(District).map((district) => (
              <Link
                key={district}
                href={`/locations?district=${encodeURIComponent(district)}`}
                className="group relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-orange-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                      {district}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent User Submissions */}
      <section className="py-8 sm:py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Community Suggestions
            </h2>
            <p className="text-gray-600">Recent locations suggested by our community</p>
          </div>
          <UserSubmissions />
        </div>
      </section>

      {/* Featured Locations - Improved card layout */}
      <section className="py-8 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Featured Locations
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredLocations.map((location) => (
              <Link key={location.id} href={`/location/${location.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {location.name}
                    </h3>
                    <div className="mt-3 sm:mt-4 text-sm text-gray-500 space-y-1">
                      <p className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        {`${location.address.street}, ${location.address.district}`}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Cuisine - Improved grid for mobile */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Browse by Cuisine
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {cuisines.map((cuisine) => (
              <Link
                key={cuisine.name}
                href={cuisine.href}
                className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden hover:opacity-75 transition-opacity"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-end p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-medium text-white">{cuisine.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
