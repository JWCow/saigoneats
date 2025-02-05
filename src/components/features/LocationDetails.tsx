'use client';

import React from 'react';
import { Location } from '@/data/locations';
import Link from 'next/link';

interface LocationDetailsProps {
  location: Location;
}

export default function LocationDetails({ location }: LocationDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="mb-8">
          <Link
            href="/locations"
            className="text-orange-600 hover:text-orange-700 flex items-center"
          >
            ← Back to all locations
          </Link>
        </div>

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
                <h3 className="text-sm font-medium text-gray-500">Type</h3>
                <p className="mt-1">{location.type}</p>
              </div>

              {location.cuisine && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cuisine</h3>
                  <p className="mt-1">{location.cuisine}</p>
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
  );
}
