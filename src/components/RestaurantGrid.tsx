import { RestaurantCard } from './RestaurantCard';
import { restaurants } from '../data/restaurants';
import { useMemo } from 'react';

interface RestaurantGridProps {
  selectedCategory: string | null;
  filters: {
    rating: number | null;
    priceRange: string | null;
    distance: number | null;
    deliveryTime: number | null;
    pureVeg: boolean;
    freeDelivery: boolean;
  };
}

export function RestaurantGrid({ selectedCategory, filters }: RestaurantGridProps) {
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      // Category filter
      if (selectedCategory && !restaurant.categories.includes(selectedCategory)) {
        return false;
      }

      // Rating filter
      if (filters.rating && restaurant.rating < filters.rating) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        if (filters.priceRange === 'budget' && restaurant.priceValue && restaurant.priceValue > 15) {
          return false;
        }
        if (filters.priceRange === 'moderate' && restaurant.priceValue && (restaurant.priceValue < 15 || restaurant.priceValue > 30)) {
          return false;
        }
        if (filters.priceRange === 'expensive' && restaurant.priceValue && restaurant.priceValue < 30) {
          return false;
        }
      }

      // Distance filter
      if (filters.distance && restaurant.distanceValue && restaurant.distanceValue > filters.distance) {
        return false;
      }

      // Delivery time filter
      if (filters.deliveryTime && restaurant.deliveryTimeValue && restaurant.deliveryTimeValue > filters.deliveryTime) {
        return false;
      }

      // Free delivery filter
      if (filters.freeDelivery && !restaurant.offer?.toLowerCase().includes('free delivery')) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, filters]);

  const featuredRestaurants = filteredRestaurants.filter((r) => r.isFeatured);
  const allRestaurants = filteredRestaurants.filter((r) => !r.isFeatured);

  return (
    <div>
      {/* Featured Section */}
      {featuredRestaurants.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-orange-600">⚡</span> Featured Restaurants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </div>
      )}

      {/* All Restaurants */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {selectedCategory ? `${selectedCategory} Restaurants` : 'All Restaurants'}
        </h3>
        {allRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants found matching your filters.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}