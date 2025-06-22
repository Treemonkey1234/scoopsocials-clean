import React from 'react';

const Events: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📅 Events</h1>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">🎯 Tech Meetup Tonight</h3>
              <span className="text-sm text-green-600 font-medium">Going</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">📍 Downtown Cafe • 🕖 7:00 PM</p>
            <p className="text-sm text-gray-500 mb-3">👥 12 going • ⭐ Trust score: 85+ required</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-cyan-600 text-white py-2 rounded-lg text-sm">
                View Details
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm">
                Share
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">🍕 Community Pizza Night</h3>
              <span className="text-sm text-yellow-600 font-medium">Maybe</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">📍 Local Park • 🕕 6:00 PM</p>
            <p className="text-sm text-gray-500 mb-3">👥 28 going • ⭐ Trust score: 70+ required</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-cyan-600 text-white py-2 rounded-lg text-sm">
                View Details
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm">
                Share
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">🎨 Creative Workshop</h3>
              <span className="text-sm text-gray-500 font-medium">Interested</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">📍 Art Studio • 🕐 2:00 PM</p>
            <p className="text-sm text-gray-500 mb-3">👥 8 going • ⭐ Trust score: 60+ required</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-cyan-600 text-white py-2 rounded-lg text-sm">
                View Details
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm">
                Share
              </button>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 bg-cyan-600 text-white py-3 rounded-lg font-medium">
          ➕ Create New Event
        </button>
      </div>
    </div>
  );
};

export default Events; 