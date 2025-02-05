'use client'

import { useParams } from 'next/navigation'
import { useRestaurantStore } from '@/lib/store'
import { useEffect } from 'react'
import { CuisineType, Restaurant } from '@/lib/types'
import RestaurantCard from '@/components/features/RestaurantCard'
import SearchBar from '@/components/features/SearchBar'

export default function CuisinePage() {
  const params = useParams()
  const { filteredRestaurants, setSelectedCuisine } = useRestaurantStore()
  
  useEffect(() => {
    const cuisine = params.cuisine as CuisineType
    setSelectedCuisine(cuisine)
  }, [params.cuisine, setSelectedCuisine])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
        {params.cuisine} Restaurants
      </h1>
      
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant: Restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
} 