'use client';

import { Location } from '@/data/locations';
import { generateMapsUrl } from '@/lib/utils/maps';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface MapLinkProps {
  location: Location;
  className?: string;
}

export default function MapLink({ location, className = '' }: MapLinkProps) {
  const mapUrl = generateMapsUrl(location.address);

  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors group ${className}`}
      aria-label={`Open ${location.name} in Google Maps`}
    >
      <MapPinIcon className="w-4 h-4" />
      <span className="text-sm group-hover:underline">View on Map</span>
    </a>
  );
}
