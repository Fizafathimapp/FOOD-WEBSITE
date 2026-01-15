import { Pizza, UtensilsCrossed, Cookie, IceCream, Coffee, Salad, Soup, Drumstick } from 'lucide-react';

const categories = [
  { name: 'Pizza', icon: Pizza, color: 'bg-orange-100 text-orange-600' },
  { name: 'Burgers', icon: UtensilsCrossed, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Biryani', icon: Soup, color: 'bg-red-100 text-red-600' },
  { name: 'Desserts', icon: Cookie, color: 'bg-pink-100 text-pink-600' },
  { name: 'Ice Cream', icon: IceCream, color: 'bg-purple-100 text-purple-600' },
  { name: 'Beverages', icon: Coffee, color: 'bg-blue-100 text-blue-600' },
  { name: 'Salads', icon: Salad, color: 'bg-green-100 text-green-600' },
  { name: 'Chicken', icon: Drumstick, color: 'bg-amber-100 text-amber-600' },
];

interface CategoriesProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function Categories({ selectedCategory, onCategorySelect }: CategoriesProps) {
  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      onCategorySelect(null);
    } else {
      onCategorySelect(categoryName);
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's on your mind?</h2>
        
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all group ${
                  isSelected ? 'bg-orange-50 ring-2 ring-orange-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`${category.color} p-4 rounded-full group-hover:scale-110 transition-transform ${
                  isSelected ? 'scale-110' : ''
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium text-center ${
                  isSelected ? 'text-orange-600' : 'text-gray-700'
                }`}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}