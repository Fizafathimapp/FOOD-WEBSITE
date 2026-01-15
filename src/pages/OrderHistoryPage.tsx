import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const orders = [
  {
    id: 'ORD12345ABC',
    date: 'Jan 14, 2026',
    status: 'Delivered',
    items: 3,
    total: 34.97,
    restaurant: "Mario's Italian Kitchen",
    image: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc2ODM4NDIyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ORD12344XYZ',
    date: 'Jan 12, 2026',
    status: 'Delivered',
    items: 2,
    total: 27.98,
    restaurant: 'Burger Paradise',
    image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBnb3VybWV0JTIwZm9vZHxlbnwxfHx8fDE3NjgzODYwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ORD12343DEF',
    date: 'Jan 10, 2026',
    status: 'Cancelled',
    items: 1,
    total: 22.50,
    restaurant: 'Biryani House',
    image: 'https://images.unsplash.com/photo-1714611626323-5ba6204453be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwaW5kaWFuJTIwZm9vZHxlbnwxfHx8fDE3Njg0NTYzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function OrderHistoryPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'Cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-orange-100 text-orange-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <span className="text-gray-600">{orders.length} orders</span>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
            >
              <div className="flex gap-6">
                {/* Restaurant Image */}
                <img
                  src={order.image}
                  alt={order.restaurant}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Order Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{order.restaurant}</h3>
                      <p className="text-sm text-gray-600">{order.items} items • ${order.total.toFixed(2)}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium">{order.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Order ID: {order.id}</span>
                      <span>•</span>
                      <span>{order.date}</span>
                    </div>

                    <div className="flex gap-3">
                      {order.status === 'Delivered' && (
                        <button className="px-4 py-2 border border-orange-600 text-orange-600 hover:bg-orange-50 rounded-lg text-sm font-medium transition-colors">
                          Reorder
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/order-tracking/${order.id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start ordering from your favorite restaurants</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Restaurants
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
