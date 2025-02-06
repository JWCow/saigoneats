'use client';

import { Location } from '@/data/locations';
import { MapPin } from 'lucide-react';

interface MapLinkProps {
  location: Location;
}

export default function MapLink({ location }: MapLinkProps) {
  return (
    <a
      href={location.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-1 text-sm text-orange-600 hover:text-orange-700"
      onClick={(e) => e.stopPropagation()}
    >
      <MapPin className="h-4 w-4" />
      <span>View on Maps</span>
    </a>
  );
}
