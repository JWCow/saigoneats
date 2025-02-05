'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { locations } from '@/data/locations';
import Link from 'next/link';

export default function LocationDetailPage() {
  const params = useParams();
  const location = locations.find((loc) => loc.id === params.id);

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Location not found</h1>
        <Link href="/locations" className="text-orange-600 hover:text-orange-700">
          Back to all locations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/locations" className="text-orange-600 hover:text-orange-700 flex items-center">
          ← Back to all locations
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{location.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1">{location.address.street}</p>
                  <p>
                    {location.address.district}, {location.address.city}
                  </p>
                  {location.address.postalCode && <p>{location.address.postalCode}</p>}
                </div>

                {location.contact && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                    {location.contact.phone && <p className="mt-1">📞 {location.contact.phone}</p>}
                    {location.contact.email && <p className="mt-1">✉️ {location.contact.email}</p>}
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price Range</h3>
                  <p className="mt-1">
                    {location.priceRange === 'low'
                      ? '$'
                      : location.priceRange === 'medium'
                        ? '$$'
                        : '$$$'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
              <div className="flex flex-wrap gap-2">
                {location.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {location.description && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600">{location.description}</p>
                </div>
              )}

              {location.website && (
                <div className="mt-8">
                  <a
                    href={location.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
