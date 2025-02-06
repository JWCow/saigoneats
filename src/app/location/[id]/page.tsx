'use client';

import { useEffect, useState } from 'react';
import { Location } from '@/data/locations';
import { locations } from '@/data/locations';
import LocationDetails from '@/components/features/LocationDetails';
import Link from 'next/link';

interface LocationPageProps {
  params: {
    id: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const findLocation = () => {
      setIsLoading(true);
      const foundLocation = locations.find((loc) => loc.id === params.id);
      setLocation(foundLocation || null);
      setIsLoading(false);
    };

    findLocation();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
        <p className="text-gray-600 mb-8">Could not find the requested location.</p>
        <Link
          href="/locations"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
        >
          Return to All Locations
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LocationDetails location={location} />
    </div>
  );
}
