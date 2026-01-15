import { SlidersHorizontal, Star, DollarSign, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

interface FiltersProps {
  selectedFilters: {
    rating: number | null;
    priceRange: string | null;
    distance: number | null;
    deliveryTime: number | null;
    pureVeg: boolean;
    freeDelivery: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

export function Filters({ selectedFilters, onFiltersChange }: FiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (filterName: string, value?: any) => {
    if (filterName === 'pureVeg' || filterName === 'freeDelivery') {
      onFiltersChange({
        ...selectedFilters,
        [filterName]: !selectedFilters[filterName],
      });
    } else {
      onFiltersChange({
        ...selectedFilters,
        [filterName]: value,
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Restaurants near you</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => toggleFilter('rating', selectedFilters.rating === 4 ? null : 4)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all ${
            selectedFilters.rating === 4
              ? 'bg-orange-600 text-white border-orange-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Star className={`w-4 h-4 ${selectedFilters.rating === 4 ? 'fill-white' : ''}`} />
          <span className="text-sm font-medium">Rating 4.0+</span>
        </button>
        
        <button 
          onClick={() => toggleFilter('deliveryTime', selectedFilters.deliveryTime === 30 ? null : 30)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all ${
            selectedFilters.deliveryTime === 30
              ? 'bg-orange-600 text-white border-orange-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Fast Delivery</span>
        </button>
        
        <button 
          onClick={() => toggleFilter('priceRange', selectedFilters.priceRange === 'budget' ? null : 'budget')}
          className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all ${
            selectedFilters.priceRange === 'budget'
              ? 'bg-orange-600 text-white border-orange-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span className="text-sm font-medium">Under $15</span>
        </button>
        
        <button 
          onClick={() => toggleFilter('distance', selectedFilters.distance === 2 ? null : 2)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all ${
            selectedFilters.distance === 2
              ? 'bg-orange-600 text-white border-orange-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">Nearby</span>
        </button>

        <button 
          onClick={() => toggleFilter('pureVeg')}
          className={`px-4 py-2 border rounded-full transition-all ${
            selectedFilters.pureVeg
              ? 'bg-orange-600 text-white border-orange-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="text-sm font-medium">Pure Veg</span>
        </button>

        <button 
          onClick={() => toggleFilter('freeDelivery')}
          className={`px-4 py-2 border rounded-full transition-all ${
            selectedFilters.freeDelivery
              ? 'bg-orange-600 text-white border-orange-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="text-sm font-medium">Free Delivery</span>
        </button>
      </div>

      {/* Extended Filters Panel */}
      {showFilters && (
        <div className="mt-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select 
                value={selectedFilters.rating || ''}
                onChange={(e) => toggleFilter('rating', e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Any</option>
                <option value="4.5">4.5+</option>
                <option value="4">4.0+</option>
                <option value="3.5">3.5+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select 
                value={selectedFilters.priceRange || ''}
                onChange={(e) => toggleFilter('priceRange', e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Any</option>
                <option value="budget">$ (Under $15)</option>
                <option value="moderate">$$ ($15-$30)</option>
                <option value="expensive">$$$ ($30+)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
              <select 
                value={selectedFilters.distance || ''}
                onChange={(e) => toggleFilter('distance', e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Any</option>
                <option value="2">Within 2 miles</option>
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
              <select 
                value={selectedFilters.deliveryTime || ''}
                onChange={(e) => toggleFilter('deliveryTime', e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Any</option>
                <option value="30">Under 30 mins</option>
                <option value="45">30-45 mins</option>
                <option value="60">45-60 mins</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}