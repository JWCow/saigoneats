'use client';

import { useEffect, useState } from 'react';
import { Location } from '@/data/locations';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import LocationDetails from '@/components/features/LocationDetails';
import Link from 'next/link';
import Toast from '@/components/ui/Toast';

interface LocationPageProps {
  params: {
    id: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      try {
        // Fetch location from Firebase
        const locationRef = doc(db, 'locations', params.id);
        const locationDoc = await getDoc(locationRef);
        
        if (locationDoc.exists()) {
          // Convert Firestore document to Location type
          const locationData = { id: locationDoc.id, ...locationDoc.data() } as Location;
          setLocation(locationData);
        } else {
          setLocation(null);
          setToast({
            message: "The requested location could not be found.",
            type: "error"
          });
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setToast({
          message: "There was a problem loading the location details.",
          type: "error"
        });
        setLocation(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
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
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
