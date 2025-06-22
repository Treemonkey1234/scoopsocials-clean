import React from 'react';

const Friends: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">👥 Friends</h1>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              👤
            </div>
            <div className="ml-3 flex-1">
              <div className="font-semibold text-gray-800">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Trust Score: 92 • Mutual connections: 5</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              👤
            </div>
            <div className="ml-3 flex-1">
              <div className="font-semibold text-gray-800">Mike Chen</div>
              <div className="text-sm text-gray-500">Trust Score: 88 • Mutual connections: 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends; 