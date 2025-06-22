import React from 'react';

const SearchScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Search</h1>
      
      <div>
        <input
          type="text"
          placeholder="Search people, skills, locations..."
          className="w-full p-3 border rounded-lg mb-4"
        />
      </div>

      <div className="space-y-4">
        <div className="text-sm font-semibold text-gray-600">📍 Nearby Users</div>
        
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">👤 Alex Chen</div>
              <div className="text-sm text-gray-600">Software Developer</div>
              <div className="text-sm text-gray-500">Trust Score: 87 • 0.5mi away</div>
            </div>
            <button className="text-cyan-600 hover:text-cyan-700 text-sm">Connect</button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">👤 Maria Lopez</div>
              <div className="text-sm text-gray-600">UX Designer</div>
              <div className="text-sm text-gray-500">Trust Score: 92 • 1.2mi away</div>
            </div>
            <button className="text-cyan-600 hover:text-cyan-700 text-sm">Connect</button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">👤 James Wilson</div>
              <div className="text-sm text-gray-600">Project Manager</div>
              <div className="text-sm text-gray-500">Trust Score: 78 • 2.1mi away</div>
            </div>
            <button className="text-cyan-600 hover:text-cyan-700 text-sm">Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchScreen; 