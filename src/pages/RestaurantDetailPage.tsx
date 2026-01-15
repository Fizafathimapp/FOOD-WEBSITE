import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { restaurants } from '../data/restaurants';
import { Star, Clock, MapPin, ChevronLeft, Heart, Share2, Info } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const menuItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1680405620826-83b0f0f61b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBpdGFsaWFufGVufDF8fHx8MTc2ODM5NDY2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pizza',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Carbonara Pasta',
    description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1627207644206-a2040d60ecad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib25hcmElMjBwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzY4MzY0Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pasta',
    isVeg: false,
    isBestseller: true,
  },
  {
    id: '3',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnR8ZW58MXx8fHwxNzY4NDM4NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Desserts',
    isVeg: true,
    isBestseller: false,
  },
  {
    id: '4',
    name: 'Garlic Bread',
    description: 'Toasted bread with garlic butter and herbs',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1558679582-dac5f374f01c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJsaWMlMjBicmVhZCUyMGFwcGV0aXplcnxlbnwxfHx8fDE3NjgzNDUwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Appetizers',
    isVeg: true,
    isBestseller: false,
  },
];

export function RestaurantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const restaurant = restaurants.find((r) => r.id === id);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-orange-600 hover:text-orange-700"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-gray-800 to-gray-900">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-60"
        />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Actions */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg"
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg">
            <Share2 className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
            <p className="text-gray-200 mb-4">{restaurant.cuisines.join(', ')}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-white" />
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
                <span className="text-sm text-gray-300">2.5k ratings</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{restaurant.distance}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-semibold">{restaurant.priceForTwo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Banner */}
      {restaurant.offer && (
        <div className="bg-orange-50 border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-orange-700">
              <Info className="w-5 h-5" />
              <span className="font-semibold">{restaurant.offer}</span>
            </div>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu</h2>
          
          {/* Category Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/restaurant/${id}/item/${item.id}`)}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {item.isVeg && (
                          <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                        )}
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                      </div>
                      {item.isBestseller && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors active:scale-95"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
