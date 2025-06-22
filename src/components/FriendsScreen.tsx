import React from 'react';

const FriendsScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Friends</h1>
      
      <div className="space-y-4">
        <div className="text-sm font-semibold text-gray-600">🔗 Your Network</div>
        
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">👤 Sarah Johnson</div>
              <div className="text-sm text-gray-600">Product Designer</div>
              <div className="text-sm text-gray-500">Trust Score: 94</div>
            </div>
            <div className="text-green-600 text-sm">Connected</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">👤 Alex Chen</div>
              <div className="text-sm text-gray-600">Software Developer</div>
              <div className="text-sm text-gray-500">Trust Score: 87</div>
            </div>
            <div className="text-green-600 text-sm">Connected</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">👤 Mike Rodriguez</div>
              <div className="text-sm text-gray-600">Marketing Lead</div>
              <div className="text-sm text-gray-500">Trust Score: 91</div>
            </div>
            <div className="text-green-600 text-sm">Connected</div>
          </div>
        </div>

        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">Want to find more friends?</div>
          <button className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700">
            📱 Import Phone Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsScreen; 