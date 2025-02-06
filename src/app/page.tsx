'use client';

import React from 'react';
import Link from 'next/link';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { locations } from '@/data/locations';
import SearchBar from '@/components/features/SearchBar';
import { MapPin, Utensils, Clock } from 'lucide-react';

const categories = [
  { name: 'Restaurants', icon: Utensils, count: 150 },
  { name: 'Cafes', icon: Clock, count: 75 },
  { name: 'Street Food', icon: MapPin, count: 100 },
];

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Discover the Best Food in</span>
              <span className="block text-orange-600">Ho Chi Minh City</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Find and explore the finest restaurants across different cuisines in Saigon.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-orange-50 text-orange-600 ring-4 ring-white">
                    <category.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <Link href={`/${category.name.toLowerCase()}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {category.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{category.count}+ locations</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Locations</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredLocations.map((location) => (
              <Link key={location.id} href={`/location/${location.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {location.name}
                    </h3>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
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

      {/* Browse by Cuisine */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Cuisine</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {cuisines.map((cuisine) => (
              <Link
                key={cuisine.name}
                href={cuisine.href}
                className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden hover:opacity-75 transition-opacity"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4">
                  <h3 className="text-lg font-medium text-white">{cuisine.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
