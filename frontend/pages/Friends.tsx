import React from 'react';

const Friends: React.FC = () => {
  const importContacts = () => {
    alert('📱 Contact import feature would be implemented here. This would access phone contacts and find existing ScoopSocials users.');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">👥 Friends</h1>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold mb-3">📞 Import Phone Contacts</h3>
            <p className="text-gray-600 mb-4">
              Find friends who are already using ScoopSocials by importing your phone contacts.
            </p>
            <button 
              onClick={importContacts}
              className="w-full bg-blue-100 text-blue-800 py-3 rounded-lg hover:bg-blue-200 font-medium"
            >
              📱 Import Contacts
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold mb-3">🔗 Your Network</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">3 mutual connections</div>
                    <div className="text-sm text-yellow-600">⭐ Trust Score: 94/100</div>
                  </div>
                </div>
                <button className="bg-cyan-600 text-white px-3 py-1 text-sm rounded">
                  Connected
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Mike Davis</div>
                    <div className="text-sm text-gray-600">5 mutual connections</div>
                    <div className="text-sm text-yellow-600">⭐ Trust Score: 87/100</div>
                  </div>
                </div>
                <button className="bg-cyan-600 text-white px-3 py-1 text-sm rounded">
                  Connected
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Emma Wilson</div>
                    <div className="text-sm text-gray-600">2 mutual connections</div>
                    <div className="text-sm text-yellow-600">⭐ Trust Score: 91/100</div>
                  </div>
                </div>
                <button className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded">
                  + Connect
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold mb-3">📋 Recommended Connections</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Alex Chen</div>
                    <div className="text-sm text-gray-600">7 mutual connections</div>
                    <div className="text-sm text-yellow-600">⭐ Trust Score: 88/100</div>
                  </div>
                </div>
                <button className="bg-cyan-600 text-white px-3 py-1 text-sm rounded hover:bg-cyan-700">
                  + Connect
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Lisa Rodriguez</div>
                    <div className="text-sm text-gray-600">4 mutual connections</div>
                    <div className="text-sm text-yellow-600">⭐ Trust Score: 92/100</div>
                  </div>
                </div>
                <button className="bg-cyan-600 text-white px-3 py-1 text-sm rounded hover:bg-cyan-700">
                  + Connect
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold mb-3">📊 Network Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-600">24</div>
                <div className="text-sm text-gray-600">Connections</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-600">156</div>
                <div className="text-sm text-gray-600">Network Size</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-600">89%</div>
                <div className="text-sm text-gray-600">Avg Trust Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends; 