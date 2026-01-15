import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, CreditCard, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedPhone, setEditedPhone] = useState(user?.phone || '');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    updateProfile({
      name: editedName,
      phone: editedPhone,
    });
    setIsEditing(false);
  };

  const menuItems = [
    { icon: MapPin, label: 'Manage Addresses', path: '/addresses' },
    { icon: CreditCard, label: 'Payment Methods', path: '/profile' },
    { icon: Settings, label: 'Account Settings', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-2xl font-bold text-gray-900 mb-2 border-b-2 border-orange-500 focus:outline-none"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h2>
                )}
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
            >
              {isEditing ? 'Save' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="font-medium text-gray-900 bg-transparent border-b border-orange-500 focus:outline-none"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{user?.phone || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-orange-600 mb-2">24</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-orange-600 mb-2">8</p>
            <p className="text-sm text-gray-600">Favorites</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-orange-600 mb-2">$342</p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-red-50 text-red-600 p-4 rounded-xl shadow-sm transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
}
