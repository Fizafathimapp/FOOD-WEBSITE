import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, CheckCircle, Package, Bike, Home as HomeIcon, Phone, MessageCircle } from 'lucide-react';

export function OrderTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Mock order data
  const order = {
    id: orderId,
    restaurant: "Mario's Italian Kitchen",
    restaurantAddress: '789 Restaurant Row, New York, NY',
    deliveryAddress: '123 Main St, New York, NY 10001',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
      { name: 'Carbonara Pasta', quantity: 1, price: 14.99 },
      { name: 'Tiramisu', quantity: 1, price: 7.99 },
    ],
    status: 'On the way',
    estimatedTime: '15-20 mins',
    driver: {
      name: 'Michael Johnson',
      phone: '+1 (555) 987-6543',
      rating: 4.8,
    },
    timeline: [
      { status: 'Order Placed', time: '2:30 PM', completed: true },
      { status: 'Order Confirmed', time: '2:32 PM', completed: true },
      { status: 'Preparing', time: '2:35 PM', completed: true },
      { status: 'Out for Delivery', time: '2:50 PM', completed: true },
      { status: 'Delivered', time: 'Expected 3:10 PM', completed: false },
    ],
  };

  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Order</h1>
        <p className="text-gray-600 mb-8">Order ID: {order.id}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{order.status}</h2>
                  <p className="text-orange-100">Estimated arrival: {order.estimatedTime}</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bike className="w-8 h-8" />
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-orange-100">Delivery Progress</span>
                  <span className="text-sm font-semibold">80%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Driver Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Delivery Partner</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {order.driver.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.driver.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{order.driver.rating} rating</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="p-3 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-6">Order Timeline</h3>
              <div className="space-y-6">
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            step.completed ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        ></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p
                        className={`font-semibold ${
                          step.completed ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {step.status}
                      </p>
                      <p className="text-sm text-gray-600">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Delivery Details</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Package className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Pickup</p>
                    <p className="text-sm text-gray-600">{order.restaurant}</p>
                    <p className="text-sm text-gray-500">{order.restaurantAddress}</p>
                  </div>
                </div>
                <div className="border-l-2 border-dashed border-gray-300 h-8 ml-3"></div>
                <div className="flex gap-4">
                  <HomeIcon className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Delivery</p>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>$3.99</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>${(total + 3.99 + total * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors mb-3">
                Get Help
              </button>
              
              <button
                onClick={() => navigate('/orders')}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition-colors"
              >
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
