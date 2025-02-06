'use client';

import React from 'react';
import { useLocationStore } from '@/lib/store';
import { Location } from '@/data/locations';
import { MapPin, DollarSign, Phone, Globe, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import VoteButton from '@/components/ui/VoteButton';

interface LocationCardProps {
  location: Location;
}

function LocationCard({ location }: LocationCardProps) {
  // Helper function to safely format date
  const formatSubmissionDate = (date: Date | null | undefined) => {
    if (!date) return null;
    try {
      // Ensure we have a valid Date object
      const submissionDate = date instanceof Date ? date : new Date(date);
      return formatDistanceToNow(submissionDate, { addSuffix: true });
    } catch {
      return null;
    }
  };

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

  const priceRangeMap = {
    low: { icon: <DollarSign className="h-4 w-4" />, label: 'Budget-friendly' },
    medium: { icon: <DollarSign className="h-4 w-4" />, label: 'Moderate' },
    high: { icon: <DollarSign className="h-4 w-4" />, label: 'High-end' },
  };

  // Default to 'medium' if priceRange is not set
  const priceRange = location.priceRange || 'medium';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6">
      <div className="space-y-4">
        {/* Header with name and date */}
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{location.name}</h3>
          {location.submittedAt && (
            <span className="text-sm text-orange-600 font-medium">
              {formatSubmissionDate(location.submittedAt)}
            </span>
          )}
        </div>

        {/* Address */}
        <div className="flex items-start space-x-2 text-gray-500">
          <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <span>{location.fullAddress}</span>
        </div>

        {/* Phone */}
        {location.contact?.phone && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Phone className="h-5 w-5 flex-shrink-0" />
            <a
              href={`tel:${location.contact.phoneClickable}`}
              className="hover:text-orange-600"
              onClick={(e) => e.stopPropagation()}
            >
              {location.contact.phone}
            </a>
          </div>
        )}

        {/* Website */}
        {location.website && (
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 flex-shrink-0 text-gray-500" />
            <a
              href={location.website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700"
              onClick={(e) => e.stopPropagation()}
            >
              {location.website.label}
            </a>
          </div>
        )}

        {/* Price Range */}
        <div className="flex items-center space-x-2 text-gray-500">
          {priceRangeMap[priceRange].icon}
          <span>{priceRangeMap[priceRange].label}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            {location.type}
          </span>
          {location.cuisine && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {location.cuisine}
            </span>
          )}
          {location.features &&
            location.features.map((feature) => (
              <span
                key={feature}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagStyle(feature)}`}
              >
                {feature}
              </span>
            ))}
        </div>

        {/* Description */}
        {location.description && (
          <div className="text-gray-600 italic">&ldquo;{location.description}&rdquo;</div>
        )}

        {/* Opening Hours */}
        {location.openingHours && (
          <div className="flex items-start space-x-2">
            <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="text-sm text-gray-500">
              {Object.entries(location.openingHours).map(([day, hours]) => (
                <div key={day}>
                  <span className="font-medium">{day}:</span> {hours}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {location.suggestedBy && `Suggested by ${location.suggestedBy}`}
          </div>
          <div className="flex items-center space-x-4">
            <VoteButton location={location} />
            {location.googleMapsUrl && (
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-orange-600 hover:text-orange-700"
                onClick={(e) => e.stopPropagation()}
              >
                View on Maps →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
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
    <div className="grid gap-6">
      {filteredLocations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
