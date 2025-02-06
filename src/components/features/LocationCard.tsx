/* eslint-disable no-console */
'use client';

import React from 'react';
import { Location } from '@/data/locations';
import Link from 'next/link';
import { MapPin, ExternalLink, DollarSign } from 'lucide-react';
import VoteButton from '@/components/ui/VoteButton';

interface LocationCardProps {
  location: Location;
}

function LocationCard({ location }: LocationCardProps) {
  const priceRangeMap = {
    low: { icon: <DollarSign className="h-4 w-4" />, label: 'Budget-friendly' },
    medium: { icon: <DollarSign className="h-4 w-4" />, label: 'Moderate' },
    high: { icon: <DollarSign className="h-4 w-4" />, label: 'High-end' },
  };

  // Default to 'medium' if priceRange is not set
  const priceRange = location.priceRange || 'medium';

  // Helper function to determine tag style based on feature
  const getTagStyle = (feature: string) => {
    // Convert to lowercase and remove any special characters
    const normalizedFeature = feature.toLowerCase().replace(/-/g, ' ');
    console.log('Processing feature:', feature, 'normalized:', normalizedFeature);

    // Cuisine-related features
    if (
      normalizedFeature.includes('vietnamese') ||
      normalizedFeature.includes('chinese') ||
      normalizedFeature.includes('japanese') ||
      normalizedFeature.includes('korean') ||
      normalizedFeature.includes('thai') ||
      normalizedFeature.includes('american') ||
      normalizedFeature.includes('italian') ||
      normalizedFeature.includes('french') ||
      normalizedFeature.includes('mexican')
    ) {
      console.log('Cuisine match:', feature);
      return 'bg-blue-200 text-blue-900 border border-blue-300'; // Stronger blue
    }

    // Food type features
    if (
      normalizedFeature.includes('pizza') ||
      normalizedFeature.includes('burger') ||
      normalizedFeature.includes('seafood') ||
      normalizedFeature.includes('bbq') ||
      normalizedFeature.includes('grill') ||
      normalizedFeature.includes('steak') ||
      normalizedFeature.includes('sushi') ||
      normalizedFeature.includes('ramen') ||
      normalizedFeature.includes('pho') ||
      normalizedFeature.includes('banh mi') ||
      normalizedFeature.includes('wings')
    ) {
      console.log('Food type match:', feature);
      return 'bg-green-200 text-green-900 border border-green-300'; // Stronger green
    }

    // Service features
    if (
      normalizedFeature.includes('dine in') ||
      normalizedFeature.includes('takeaway') ||
      normalizedFeature.includes('delivery') ||
      normalizedFeature.includes('reservation') ||
      normalizedFeature.includes('breakfast')
    ) {
      console.log('Service match:', feature);
      return 'bg-purple-200 text-purple-900 border border-purple-300'; // Stronger purple
    }

    // Ambiance/style features
    if (
      normalizedFeature.includes('fine dining') ||
      normalizedFeature.includes('casual') ||
      normalizedFeature.includes('bistro') ||
      normalizedFeature.includes('street food') ||
      normalizedFeature.includes('rooftop') ||
      normalizedFeature.includes('steakhouse') ||
      normalizedFeature.includes('wine')
    ) {
      console.log('Ambiance match:', feature);
      return 'bg-pink-200 text-pink-900 border border-pink-300'; // Stronger pink
    }

    // Special features
    if (normalizedFeature.includes('ny style') || normalizedFeature.includes('american style')) {
      console.log('Special match:', feature);
      return 'bg-teal-200 text-teal-900 border border-teal-300'; // Stronger teal
    }

    // Default style
    console.log('No category match, using default:', feature);
    return 'bg-gray-200 text-gray-900 border border-gray-300'; // Stronger gray
  };

  return (
    <Link href={`/location/${location.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Image placeholder - replace with actual image when available */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <div className="p-4 flex items-end">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-900 border border-yellow-300">
              {location.type}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
            {location.name}
          </h3>

          <div className="mt-4 space-y-2">
            {/* Address */}
            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p>{location.fullAddress}</p>
              </div>
            </div>

            {/* Price Range */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {priceRangeMap[priceRange].icon}
              <span>{priceRangeMap[priceRange].label}</span>
            </div>

            {/* Features */}
            {location.features && location.features.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {location.features.map((feature) => {
                  const style = getTagStyle(feature);
                  console.log(`Applying style for ${feature}:`, style);
                  return (
                    <span
                      key={feature}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style} shadow-sm`}
                    >
                      {feature}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer with Google Maps Link and Vote Button */}
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-orange-600 hover:text-orange-700"
              onClick={(e) => e.stopPropagation()}
            >
              <span>View on Google Maps</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <VoteButton location={location} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LocationCard;
