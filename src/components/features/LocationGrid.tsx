'use client';

import React from 'react';
import { useLocationStore } from '@/lib/store';
import { Location } from '@/data/locations';
import Link from 'next/link';
import { MapPin, ExternalLink, DollarSign } from 'lucide-react';

interface LocationCardProps {
  location: Location;
}

function LocationCard({ location }: LocationCardProps) {
  const priceRangeMap = {
    low: { icon: <DollarSign className="h-4 w-4" />, label: 'Budget-friendly' },
    medium: { icon: <DollarSign className="h-4 w-4" />, label: 'Moderate' },
    high: { icon: <DollarSign className="h-4 w-4" />, label: 'High-end' },
  };

  // Helper function to normalize text capitalization
  const normalizeText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  // Helper function to determine tag style based on feature
  const getTagStyle = (feature: string) => {
    const normalizedFeature = feature.toLowerCase().replace(/-/g, ' ');
    
    // Cuisine-related features
    if (normalizedFeature.includes('vietnamese') || 
        normalizedFeature.includes('chinese') || 
        normalizedFeature.includes('japanese') || 
        normalizedFeature.includes('korean') || 
        normalizedFeature.includes('thai') || 
        normalizedFeature.includes('american') || 
        normalizedFeature.includes('italian') || 
        normalizedFeature.includes('french') || 
        normalizedFeature.includes('mexican')) {
      return 'bg-blue-200 text-blue-900 border border-blue-300';
    }
    
    // Food type features
    if (normalizedFeature.includes('pizza') || 
        normalizedFeature.includes('burger') || 
        normalizedFeature.includes('seafood') || 
        normalizedFeature.includes('bbq') || 
        normalizedFeature.includes('grill') || 
        normalizedFeature.includes('steak') || 
        normalizedFeature.includes('sushi') || 
        normalizedFeature.includes('ramen') || 
        normalizedFeature.includes('pho') || 
        normalizedFeature.includes('banh mi') || 
        normalizedFeature.includes('wings')) {
      return 'bg-green-200 text-green-900 border border-green-300';
    }
    
    // Service features
    if (normalizedFeature.includes('dine in') || 
        normalizedFeature.includes('takeaway') || 
        normalizedFeature.includes('delivery') || 
        normalizedFeature.includes('reservation') || 
        normalizedFeature.includes('breakfast')) {
      return 'bg-purple-200 text-purple-900 border border-purple-300';
    }
    
    // Ambiance/style features
    if (normalizedFeature.includes('fine dining') || 
        normalizedFeature.includes('casual') || 
        normalizedFeature.includes('bistro') || 
        normalizedFeature.includes('street food') || 
        normalizedFeature.includes('rooftop') || 
        normalizedFeature.includes('steakhouse') || 
        normalizedFeature.includes('wine')) {
      return 'bg-pink-200 text-pink-900 border border-pink-300';
    }

    // Special features
    if (normalizedFeature.includes('ny style') || 
        normalizedFeature.includes('american style')) {
      return 'bg-teal-200 text-teal-900 border border-teal-300';
    }
    
    // Default style
    return 'bg-gray-200 text-gray-900 border border-gray-300';
  };

  // Helper function to get background color for location type
  const getLocationTypeStyle = (type: string) => {
    const normalizedType = type.toLowerCase();
    switch (normalizedType) {
      case 'restaurant':
        return 'bg-amber-50';
      case 'cafe':
        return 'bg-emerald-50';
      case 'bar':
        return 'bg-purple-50';
      case 'dessert':
        return 'bg-pink-50';
      case 'bakery':
        return 'bg-orange-50';
      case 'coffee shop':
        return 'bg-blue-50';
      case 'bistro':
        return 'bg-rose-50';
      case 'spa':
        return 'bg-teal-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <Link href={`/location/${location.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Image placeholder with dynamic background color */}
        <div className={`aspect-w-16 aspect-h-9 ${getLocationTypeStyle(location.type)}`}>
          <div className="p-4 flex items-end">
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-gray-800">
              {normalizeText(location.type)}
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
              {priceRangeMap[location.priceRange].icon}
              <span>{priceRangeMap[location.priceRange].label}</span>
            </div>

            {/* Features */}
            {location.features && location.features.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {location.features.map((feature) => (
                  <span
                    key={feature}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagStyle(feature)} shadow-sm`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Google Maps Link */}
          {location.googleMapsUrl && (
            <div className="mt-4 pt-4 border-t">
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
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function LocationGrid() {
  const { filteredLocations } = useLocationStore();

  if (filteredLocations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No locations found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredLocations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
