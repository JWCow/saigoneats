'use client';

import React from 'react';
import Link from 'next/link';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { locations, Cuisine, LocationType } from '@/data/locations';
import SearchBar from '@/components/features/SearchBar';

export default function Home() {
  const setLocations = useLocationStore((state) => state.setLocations);

  useEffect(() => {
    setLocations(locations);
  }, [setLocations]);

  const featuredLocations = locations.slice(0, 6);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Discover the Best Food in</span>
              <span className="block text-orange-600">Ho Chi Minh City</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Find and explore the finest restaurants across different cuisines in Saigon.
            </p>
            <div className="mt-8">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLocations.map((location) => (
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
                      {location.priceRange === 'low'
                        ? '$'
                        : location.priceRange === 'medium'
                          ? '$$'
                          : '$$$'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/locations"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
          >
            View All Locations
          </Link>
        </div>
      </section>

      {/* Browse by Type */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.values(LocationType).map((type) => (
              <Link
                key={type}
                href={`/locations?type=${type}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6 text-center">
                  <span className="text-lg font-medium text-gray-900 group-hover:text-orange-600">
                    {type}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Cuisine */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Cuisine</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.values(Cuisine).map((cuisine) => (
              <Link
                key={cuisine}
                href={`/locations?cuisine=${cuisine}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-orange-100 to-orange-50">
                  <div className="p-6 flex items-center justify-center">
                    <span className="text-xl font-semibold text-gray-900 group-hover:text-orange-600">
                      {cuisine}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
