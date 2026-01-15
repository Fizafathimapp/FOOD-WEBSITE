import { Star, Clock, MapPin, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisines: string[];
  offer?: string;
  distance?: string;
  priceForTwo?: string;
  isFeatured?: boolean;
}

export function RestaurantCard({
  id,
  name,
  image,
  rating,
  deliveryTime,
  cuisines,
  offer,
  distance,
  priceForTwo,
  isFeatured,
}: RestaurantCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/restaurant/${id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Offer Badge */}
        {offer && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-1 text-white">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-semibold">{offer}</span>
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-lg flex-shrink-0 ml-2">
            <Star className="w-3 h-3 fill-white" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>

        {/* Cuisines */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">{cuisines.join(', ')}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime}</span>
            </div>
            {distance && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{distance}</span>
              </div>
            )}
          </div>
          {priceForTwo && (
            <span className="font-medium">{priceForTwo}</span>
          )}
        </div>

        {/* Order Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/restaurant/${id}`);
          }}
          className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}