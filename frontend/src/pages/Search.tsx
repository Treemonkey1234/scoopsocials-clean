import React, { useState } from 'react';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🔍 Search</h1>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search for people, locations, or reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 border rounded-lg text-lg"
          />

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold mb-3">📍 Nearby Users</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Alex Chen</div>
                    <div className="text-sm text-gray-600">Software Developer • 0.5mi</div>
                    <div className="text-sm text-yellow-600">⭐ Trust Score: 88/100</div>
                  </div>
                </div>
                <button className="bg-cyan-600 text-white px-3 py-1 text-sm rounded">
                  Review
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Maria Lopez</div>
                    <div className="text-sm text-gray-600">UX Designer • 1.2mi</div>
                    <div className="text-sm text-yellow-600">⭐ Trust Score: 94/100</div>
                  </div>
                </div>
                <button className="bg-cyan-600 text-white px-3 py-1 text-sm rounded">
                  Review
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">James Wilson</div>
                    <div className="text-sm text-gray-600">Marketing Manager • 2.1mi</div>
                    <div className="text-sm text-yellow-600">⭐ Trust Score: 76/100</div>
                  </div>
                </div>
                <button className="bg-cyan-600 text-white px-3 py-1 text-sm rounded">
                  Review
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold mb-3">🏢 Popular Locations</h3>
            <div className="space-y-2">
              <div className="text-gray-700">📍 Downtown Coffee Shop (24 reviews)</div>
              <div className="text-gray-700">📍 City Library (18 reviews)</div>
              <div className="text-gray-700">📍 Tech Hub Coworking (31 reviews)</div>
              <div className="text-gray-700">📍 Central Park (12 reviews)</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold mb-3">🔥 Trending Reviews</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-cyan-500 pl-3">
                <div className="font-medium">Sarah Johnson - Excellent mentor</div>
                <div className="text-sm text-gray-600">45 people found this helpful</div>
              </div>
              <div className="border-l-4 border-cyan-500 pl-3">
                <div className="font-medium">Mike Davis - Great team player</div>
                <div className="text-sm text-gray-600">32 people found this helpful</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search; 