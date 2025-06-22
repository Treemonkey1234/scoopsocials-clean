import React, { useState } from 'react';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🔍 Search</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for people or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">📍 Nearby Users</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">Alex Chen</div>
                    <div className="text-sm text-gray-500">Software Dev • 0.5mi</div>
                  </div>
                </div>
                <div className="text-sm text-cyan-600 font-medium">95/100</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">Maria Lopez</div>
                    <div className="text-sm text-gray-500">Designer • 1.2mi</div>
                  </div>
                </div>
                <div className="text-sm text-cyan-600 font-medium">88/100</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">David Kim</div>
                    <div className="text-sm text-gray-500">Manager • 2.1mi</div>
                  </div>
                </div>
                <div className="text-sm text-cyan-600 font-medium">92/100</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">🏢 Popular Locations</h3>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">☕ Downtown Coffee Shop</div>
              <div className="text-sm text-gray-600">🏢 Tech Hub Coworking</div>
              <div className="text-sm text-gray-600">🎓 University Campus</div>
              <div className="text-sm text-gray-600">🏛️ Public Library</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">🔥 Trending Searches</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#reliable</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#teamwork</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#mentor</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#creative</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search; 