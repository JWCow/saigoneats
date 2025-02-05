import { Restaurant } from '@/lib/types'

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {restaurant.name}
        </h3>
        <div className="text-sm text-gray-500 mb-4">
          <p>{restaurant.address.street}</p>
          <p>{restaurant.address.district}, {restaurant.address.city}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            {restaurant.cuisine}
          </span>
          <span className="text-sm text-gray-500">
            {restaurant.priceRange === 'low' ? '$' : 
             restaurant.priceRange === 'medium' ? '$$' : '$$$'}
          </span>
        </div>
        {restaurant.contact?.phone && (
          <div className="mt-4 text-sm text-gray-600">
            <p>📞 {restaurant.contact.phone}</p>
          </div>
        )}
        {restaurant.features && restaurant.features.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {restaurant.features.map(feature => (
              <span 
                key={feature}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 