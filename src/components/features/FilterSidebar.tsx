'use client';

import React, { useState } from 'react';
import { useLocationStore } from '@/lib/store';
import { LocationType, Cuisine, District } from '@/data/locations';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

type PriceRange = 'low' | 'medium' | 'high';
const priceRanges: PriceRange[] = ['low', 'medium', 'high'];

type FilterSection = 'type' | 'cuisine' | 'district' | 'price';

export default function FilterSidebar() {
  const {
    selectedType,
    selectedCuisine,
    selectedDistrict,
    priceRange,
    setSelectedType,
    setSelectedCuisine,
    setSelectedDistrict,
    setPriceRange,
    resetFilters,
  } = useLocationStore();

  const [expandedSections, setExpandedSections] = useState<FilterSection[]>(['district']);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const toggleSection = (section: FilterSection) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const FilterHeader = ({ title, section }: { title: string; section: FilterSection }) => {
    const isExpanded = expandedSections.includes(section);
    return (
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-900"
      >
        {title}
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
    );
  };

  const filters = (
    <div className="divide-y divide-gray-200">
      {/* Mobile Filter Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="flex items-center space-x-2 text-gray-600"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
        <button onClick={resetFilters} className="text-sm text-orange-600 hover:text-orange-700">
          Reset
        </button>
      </div>

      <div className={cn('flex-col space-y-4', 'md:flex', isMobileFiltersOpen ? 'flex' : 'hidden')}>
        {/* District Filter */}
        <div className="p-4">
          <FilterHeader title="District" section="district" />
          {expandedSections.includes('district') && (
            <div className="mt-2 space-y-2">
              {Object.values(District).map((district) => (
                <label key={district} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDistrict === district}
                    onChange={() =>
                      setSelectedDistrict(selectedDistrict === district ? null : district)
                    }
                    className="form-checkbox text-orange-600 rounded"
                  />
                  <span className="ml-2 text-sm">{district}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Type Filter */}
        <div className="p-4">
          <FilterHeader title="Type" section="type" />
          {expandedSections.includes('type') && (
            <div className="mt-2 space-y-2">
              {Object.values(LocationType).map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedType === type}
                    onChange={() => setSelectedType(selectedType === type ? null : type)}
                    className="form-radio text-orange-600"
                  />
                  <span className="ml-2 text-sm capitalize">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Cuisine Filter */}
        <div className="p-4">
          <FilterHeader title="Cuisine" section="cuisine" />
          {expandedSections.includes('cuisine') && (
            <div className="mt-2 space-y-2">
              {Object.values(Cuisine).map((cuisine) => (
                <label key={cuisine} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCuisine === cuisine}
                    onChange={() =>
                      setSelectedCuisine(selectedCuisine === cuisine ? null : cuisine)
                    }
                    className="form-checkbox text-orange-600 rounded"
                  />
                  <span className="ml-2 text-sm capitalize">{cuisine}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="p-4">
          <FilterHeader title="Price Range" section="price" />
          {expandedSections.includes('price') && (
            <div className="mt-2 space-y-2">
              {priceRanges.map((price) => (
                <label key={price} className="flex items-center">
                  <input
                    type="radio"
                    checked={priceRange === price}
                    onChange={() => setPriceRange(priceRange === price ? null : price)}
                    className="form-radio text-orange-600"
                  />
                  <span className="ml-2 text-sm capitalize">
                    {price === 'low' ? '$' : price === 'medium' ? '$$' : '$$$'}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return <div className="bg-white rounded-lg shadow-md">{filters}</div>;
}
