import React from 'react';

const Events: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📅 Events</h1>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h3 className="font-semibold text-gray-800 mb-2">🎯 Tech Meetup Tonight</h3>
          <p className="text-sm text-gray-600">📍 Downtown Cafe • 🕖 7:00 PM</p>
          <p className="text-sm text-gray-500">👥 12 going • ⭐ Trust score: 85+ required</p>
        </div>
      </div>
    </div>
  );
};

export default Events; 