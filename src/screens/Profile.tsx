import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { handleLogout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">👤 Profile</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-4">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Demo User'}</h2>
              <p className="text-gray-600">@{user?.username || 'demo_user'}</p>
              <p className="text-sm text-gray-500">Phoenix, AZ • Joined March 2024</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold">Trust Score</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-3xl font-bold text-cyan-600">95</span>
              <span className="text-gray-600 ml-1">/100</span>
              <div className="ml-4 flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-cyan-600 h-3 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 font-medium">
            📝 Write a Review
          </button>
          <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-medium">
            ⚙️ Settings
          </button>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-medium"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 