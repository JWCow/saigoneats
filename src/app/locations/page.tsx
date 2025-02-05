'use client';

import React, { useState } from 'react';
import FilterSidebar from '@/components/features/FilterSidebar';
import LocationGrid from '@/components/features/LocationGrid';
import SuggestionForm from '@/components/features/SuggestionForm';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { locations } from '@/data/locations';

export default function LocationsPage() {
  const setLocations = useLocationStore((state) => state.setLocations);
  const [isSuggestionFormOpen, setIsSuggestionFormOpen] = useState(false);

  useEffect(() => {
    console.log('All locations:', locations);
    setLocations(locations);
  }, [setLocations]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Locations</h1>
        <button
          onClick={() => setIsSuggestionFormOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700"
        >
          Suggest a Location
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <FilterSidebar />
        </div>
        <div className="flex-1">
          <LocationGrid />
        </div>
      </div>
      <SuggestionForm
        isOpen={isSuggestionFormOpen}
        onClose={() => setIsSuggestionFormOpen(false)}
      />
    </div>
  );
}
