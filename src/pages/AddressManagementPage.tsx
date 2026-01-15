import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, Briefcase, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { useState } from 'react';

interface Address {
  id: string;
  label: string;
  address: string;
  icon: typeof Home;
  isDefault: boolean;
}

export function AddressManagementPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      address: '123 Main St, New York, NY 10001',
      icon: Home,
      isDefault: true,
    },
    {
      id: '2',
      label: 'Work',
      address: '456 Office Ave, New York, NY 10002',
      icon: Briefcase,
      isDefault: false,
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.address) {
      const address: Address = {
        id: Date.now().toString(),
        label: newAddress.label,
        address: newAddress.address,
        icon: MapPin,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, address]);
      setNewAddress({ label: '', address: '' });
      setShowAddForm(false);
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Address
          </button>
        </div>

        {/* Add Address Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-2 border-orange-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label (e.g., Home, Work, Friend's Place)
                </label>
                <input
                  type="text"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter label"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complete Address
                </label>
                <textarea
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  rows={3}
                  placeholder="Enter complete address"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddAddress}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Save Address
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewAddress({ label: '', address: '' });
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Address List */}
        <div className="space-y-4">
          {addresses.map((address) => {
            const Icon = address.icon;
            return (
              <div
                key={address.id}
                className={`bg-white rounded-xl shadow-sm p-6 ${
                  address.isDefault ? 'border-2 border-orange-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900">{address.label}</h3>
                      {address.isDefault && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          <Check className="w-3 h-3" />
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{address.address}</p>
                    
                    <div className="flex gap-3">
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1"
                        >
                          Set as Default
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {addresses.length === 0 && !showAddForm && (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <MapPin className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No saved addresses</h2>
            <p className="text-gray-600 mb-8">Add your delivery addresses for faster checkout</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Address
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
