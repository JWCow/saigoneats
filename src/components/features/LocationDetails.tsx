'use client';

import React from 'react';
import { Location } from '@/data/locations';
import Link from 'next/link';
import { MapPin, Phone, Globe, Clock, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface LocationDetailsProps {
  location: Location;
}

export default function LocationDetails({ location }: LocationDetailsProps) {
  const priceRangeMap = {
    low: { icon: <DollarSign className="h-4 w-4" />, label: 'Budget-friendly' },
    medium: { icon: <DollarSign className="h-4 w-4" />, label: 'Moderate' },
    high: { icon: <DollarSign className="h-4 w-4" />, label: 'High-end' },
  };

  // Default to 'medium' if priceRange is not set
  const priceRange = location.priceRange || 'medium';

  const getTagStyle = (feature: string) => {
    const normalizedFeature = feature.toLowerCase().replace(/-/g, ' ');

    // Type tag
    if (feature === location.type) {
      return 'bg-orange-100 text-orange-800';
    }

    // Cuisine tag
    if (feature === location.cuisine) {
      return 'bg-blue-100 text-blue-800';
    }

    // Food-related features
    if (
      normalizedFeature.includes('pizza') ||
      normalizedFeature.includes('burger') ||
      normalizedFeature.includes('seafood') ||
      normalizedFeature.includes('bbq') ||
      normalizedFeature.includes('grill') ||
      normalizedFeature.includes('steak') ||
      normalizedFeature.includes('bistro') ||
      normalizedFeature.includes('deli')
    ) {
      return 'bg-green-100 text-green-800';
    }

    // Service-related features
    if (
      normalizedFeature.includes('dine in') ||
      normalizedFeature.includes('takeaway') ||
      normalizedFeature.includes('delivery') ||
      normalizedFeature.includes('reservation')
    ) {
      return 'bg-purple-100 text-purple-800';
    }

    return 'bg-gray-100 text-gray-800';
  };

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
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1">{location.fullAddress}</p>
                </div>
              </div>

              {location.contact && (
                <div className="space-y-2">
                  {location.contact.phone && (
                    <div className="flex items-start space-x-2">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                        <a
                          href={`tel:${location.contact.phoneClickable}`}
                          className="mt-1 text-orange-600 hover:text-orange-700"
                        >
                          {location.contact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {location.contact.email && (
                    <div className="flex items-start space-x-2">
                      <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <a
                          href={`mailto:${location.contact.email}`}
                          className="mt-1 text-orange-600 hover:text-orange-700"
                        >
                          {location.contact.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500">Type</h3>
                <p className="mt-1">{location.type}</p>
                {location.cuisine && (
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-500">Cuisine</h3>
                    <p className="mt-1">{location.cuisine}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {priceRangeMap[priceRange].icon}
                <span>{priceRangeMap[priceRange].label}</span>
              </div>

              {location.openingHours && (
                <div className="flex items-start space-x-2">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Opening Hours</h3>
                    {Object.entries(location.openingHours).map(([day, hours]) => (
                      <div key={day} className="mt-1">
                        <span className="font-medium">{day}:</span> {hours}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {location.type}
              </span>
              {location.cuisine && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {location.cuisine}
                </span>
              )}
              {location.features.map((feature) => (
                <span
                  key={feature}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagStyle(feature)}`}
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

            {location.submittedAt && location.suggestedBy && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Submission Info</h2>
                <p className="text-gray-600">
                  Suggested by {location.suggestedBy}{' '}
                  {formatDistanceToNow(location.submittedAt, { addSuffix: true })}
                </p>
              </div>
            )}

            {location.website && (
              <div className="mt-8">
                <a
                  href={location.website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                >
                  {location.website.label}
                </a>
              </div>
            )}

            <div className="mt-4">
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
