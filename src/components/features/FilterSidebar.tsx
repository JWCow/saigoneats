'use client'

import React from 'react'
import { useLocationStore } from '@/lib/store'
import { LocationType, Cuisine, District } from '@/data/locations'

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
    resetFilters
  } = useLocationStore()

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-orange-600 hover:text-orange-700"
        >
          Reset
        </button>
      </div>

      {/* Location Type Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Type</h3>
        <div className="space-y-2">
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
      </div>

      {/* Cuisine Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Cuisine</h3>
        <div className="space-y-2">
          {Object.values(Cuisine).map((cuisine) => (
            <label key={cuisine} className="flex items-center">
              <input
                type="radio"
                checked={selectedCuisine === cuisine}
                onChange={() => setSelectedCuisine(selectedCuisine === cuisine ? null : cuisine)}
                className="form-radio text-orange-600"
              />
              <span className="ml-2 text-sm capitalize">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* District Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">District</h3>
        <div className="space-y-2">
          {Object.values(District).map((district) => (
            <label key={district} className="flex items-center">
              <input
                type="radio"
                checked={selectedDistrict === district}
                onChange={() => setSelectedDistrict(selectedDistrict === district ? null : district)}
                className="form-radio text-orange-600"
              />
              <span className="ml-2 text-sm">{district}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Price Range</h3>
        <div className="space-y-2">
          {['low', 'medium', 'high'].map((price) => (
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
      </div>
    </div>
  )
} 