import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { Filters } from '../components/Filters';
import { RestaurantGrid } from '../components/RestaurantGrid';
import { Footer } from '../components/Footer';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    rating: null as number | null,
    priceRange: null as string | null,
    distance: null as number | null,
    deliveryTime: null as number | null,
    pureVeg: false,
    freeDelivery: false,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <Categories 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters 
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
        />
        <RestaurantGrid 
          selectedCategory={selectedCategory}
          filters={selectedFilters}
        />
      </div>
      <Footer />
    </div>
  );
}
