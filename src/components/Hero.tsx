import { Search, MapPin } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Order food from your
            <br />
            favorite restaurants
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-orange-100">
            Delicious food delivered to your doorstep in minutes
          </p>

          {/* Search Boxes */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Location Input */}
                <div className="md:col-span-5">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-600 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter your delivery location"
                      className="w-full pl-12 pr-4 py-4 text-gray-700 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Search Input */}
                <div className="md:col-span-5">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-600 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search for restaurant or cuisine"
                      className="w-full pl-12 pr-4 py-4 text-gray-700 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:col-span-2">
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="text-orange-100 text-sm">Popular:</span>
            {['Pizza', 'Burgers', 'Biryani', 'Sushi', 'Desserts'].map((item) => (
              <button
                key={item}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm backdrop-blur-sm transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
