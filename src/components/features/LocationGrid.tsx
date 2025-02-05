'use client'

import React from 'react'
import { useLocationStore } from '@/lib/store'
import { Location } from '@/data/locations'
import Link from 'next/link'

interface LocationCardProps {
  location: Location
}

function LocationCard({ location }: LocationCardProps) {
  return (
    <Link href={`/location/${location.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {location.name}
          </h3>
          <div className="text-sm text-gray-500 mb-4">
            <p>{location.address.street}</p>
            <p>{location.address.district}, {location.address.city}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {location.features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
              >
                {feature}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {location.type}
            </span>
            <span className="text-sm text-gray-500">
              {location.priceRange === 'low' ? '$' : 
               location.priceRange === 'medium' ? '$$' : '$$$'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function LocationGrid() {
  const { filteredLocations } = useLocationStore()

  if (filteredLocations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No locations found</h3>
        <p className="mt-2 text-sm text-gray-500">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredLocations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  )
} 