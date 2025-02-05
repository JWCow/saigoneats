'use client';

import { useLocationStore } from '@/lib/store';
import { Cuisine } from '@/data/locations';

export default function Filters() {
  const { selectedCuisine, setSelectedCuisine } = useLocationStore();

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="flex flex-wrap gap-2">
        {Object.values(Cuisine).map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setSelectedCuisine(cuisine === selectedCuisine ? null : cuisine)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                cuisine === selectedCuisine
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
}
