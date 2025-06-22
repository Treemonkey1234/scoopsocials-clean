import React from 'react';

const Search: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🔍 Search</h1>
        <input
          type="text"
          placeholder="Search for people or locations..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
        />
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h3 className="font-semibold text-gray-800 mb-3">📍 Nearby Users</h3>
          <div className="text-sm text-gray-600">Alex Chen - Software Dev • 0.5mi</div>
          <div className="text-sm text-gray-600">Maria Lopez - Designer • 1.2mi</div>
        </div>
      </div>
    </div>
  );
};

export default Search; 