import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ChevronLeft, Plus, Minus, Star } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export function MenuItemDetailPage() {
  const { restaurantId, itemId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);

  // Mock data - in real app, fetch from API
  const item = {
    id: itemId || '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil on a thin crispy crust. Made with authentic Italian ingredients.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1680405620826-83b0f0f61b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBpdGFsaWFufGVufDF8fHx8MTc2ODM5NDY2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    restaurantName: "Mario's Italian Kitchen",
    rating: 4.7,
    reviews: 245,
    isVeg: true,
  };

  const customizations = [
    {
      name: 'Size',
      options: ['Small', 'Medium', 'Large'],
      type: 'single',
    },
    {
      name: 'Add-ons',
      options: ['Extra Cheese (+$2)', 'Olives (+$1.5)', 'Mushrooms (+$2)', 'Pepperoni (+$3)'],
      type: 'multiple',
    },
  ];

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      image: item.image,
      restaurantId: restaurantId || '1',
      restaurantName: item.restaurantName,
      customizations: selectedCustomizations,
    });
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to menu</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image */}
          <div className="relative h-96">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {item.isVeg && (
              <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-green-600">Vegetarian</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
                  <span className="font-semibold text-gray-900">{item.rating}</span>
                  <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Customizations */}
            <div className="space-y-6 mb-8">
              {customizations.map((custom) => (
                <div key={custom.name}>
                  <h3 className="font-semibold text-gray-900 mb-3">{custom.name}</h3>
                  <div className="space-y-2">
                    {custom.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type={custom.type === 'single' ? 'radio' : 'checkbox'}
                          name={custom.name}
                          className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                          onChange={(e) => {
                            if (custom.type === 'single') {
                              setSelectedCustomizations((prev) =>
                                prev.filter((c) => !custom.options.some((o) => c === o)).concat(option)
                              );
                            } else {
                              if (e.target.checked) {
                                setSelectedCustomizations((prev) => [...prev, option]);
                              } else {
                                setSelectedCustomizations((prev) => prev.filter((c) => c !== option));
                              }
                            }
                          }}
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${(item.price * quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
