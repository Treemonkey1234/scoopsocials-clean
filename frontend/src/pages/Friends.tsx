import React from 'react';

const Friends: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">👥 Friends</h1>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">📞 Import Phone Contacts</h3>
            <p className="text-sm text-gray-600 mb-3">Find friends who are already using ScoopSocials</p>
            <button className="w-full bg-blue-100 text-blue-800 py-2 rounded-lg hover:bg-blue-200">
              📱 Import Contacts
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">🔗 Your Network</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">3 mutual connections</div>
                  </div>
                </div>
                <div className="text-sm text-cyan-600 font-medium">94/100</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">Mike Chen</div>
                    <div className="text-sm text-gray-500">5 mutual connections</div>
                  </div>
                </div>
                <div className="text-sm text-cyan-600 font-medium">89/100</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">Lisa Park</div>
                    <div className="text-sm text-gray-500">2 mutual connections</div>
                  </div>
                </div>
                <div className="text-sm text-cyan-600 font-medium">91/100</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">💡 Recommended Connections</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">Tom Wilson</div>
                    <div className="text-sm text-gray-500">Works at Tech Corp</div>
                  </div>
                </div>
                <button className="text-sm bg-cyan-600 text-white px-3 py-1 rounded-lg">
                  Connect
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">Emma Davis</div>
                    <div className="text-sm text-gray-500">Designer at Studio X</div>
                  </div>
                </div>
                <button className="text-sm bg-cyan-600 text-white px-3 py-1 rounded-lg">
                  Connect
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">📊 Network Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-600">89</div>
                <div className="text-sm text-gray-600">Connections</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-600">156</div>
                <div className="text-sm text-gray-600">Network Size</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends; 