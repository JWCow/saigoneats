'use client';

import { useRestaurantStore } from '@/lib/store';
import { CuisineType } from '@/lib/types';

export default function Filters() {
  const { selectedCuisine, setSelectedCuisine } = useRestaurantStore();

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="flex flex-wrap gap-2">
        {Object.values(CuisineType).map((cuisine) => (
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
