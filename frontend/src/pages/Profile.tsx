import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [showTrustBreakdown, setShowTrustBreakdown] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);

  // Check for incomplete profile setup
  const walkthroughCompleted = localStorage.getItem('walkthroughCompleted');
  const socialAccounts = localStorage.getItem('userSocialAccounts');
  const hasIncompleteSetup = !walkthroughCompleted || !socialAccounts;

  const checkPostWarning = () => {
    if (hasIncompleteSetup) {
      alert('⚠️ Complete your profile setup to post reviews! Add social accounts and friends to boost your trust score and unlock full participation.');
      return false;
    }
    return true;
  };

  const trustFactors = [
    { name: 'Social Media Verification', score: 85, weight: '20%', color: 'bg-blue-500' },
    { name: 'Community Network', score: 92, weight: '20%', color: 'bg-green-500' },
    { name: 'Platform Activity', score: 78, weight: '15%', color: 'bg-purple-500' },
    { name: 'Content Quality', score: 94, weight: '15%', color: 'bg-yellow-500' },
    { name: 'Time Investment', score: 88, weight: '10%', color: 'bg-red-500' },
    { name: 'Comment Engagement', score: 91, weight: '10%', color: 'bg-indigo-500' },
    { name: 'Event Participation', score: 76, weight: '5%', color: 'bg-pink-500' },
    { name: 'Validation Accuracy', score: 89, weight: '5%', color: 'bg-cyan-500' },
  ];

  const connectedPlatforms = [
    { name: 'Twitter', verified: true, username: '@nickhemingway9' },
    { name: 'LinkedIn', verified: true, username: 'nick-hemingway' },
    { name: 'GitHub', verified: true, username: 'nickhemingway' },
    { name: 'Instagram', verified: false, username: '@nick_hemingway' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="p-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-4">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-800">Nick Hemingway</h1>
              <p className="text-gray-600">@nickhemingway9</p>
              <p className="text-sm text-gray-500">Phoenix, AZ • Joined March 2024</p>
            </div>
          </div>

          {/* Trust Score with Warning */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold">Trust Score</span>
              <button
                onClick={() => setShowTrustBreakdown(true)}
                className="text-cyan-600 text-sm hover:underline"
              >
                View Breakdown
              </button>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-3xl font-bold text-cyan-600">95</span>
              <span className="text-gray-600 ml-1">/100</span>
              <div className="ml-4 flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-cyan-600 h-3 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            
            {/* 🚨 CRITICAL: Trust Score Warning */}
            {hasIncompleteSetup && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">
                  ⚠️ Complete your profile setup to unlock full participation! Your trust score is limited until you add social accounts and friends.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg p-4 shadow-sm border mb-4">
          <h2 className="font-semibold mb-3">📊 Activity Stats</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-600">127</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-600">89</div>
              <div className="text-sm text-gray-600">Connections</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-600">15</div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-white rounded-lg p-4 shadow-sm border mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">🔗 Connected Accounts</h2>
            <button
              onClick={() => setShowSocialModal(true)}
              className="text-cyan-600 text-sm hover:underline"
            >
              Manage
            </button>
          </div>
          <div className="space-y-2">
            {connectedPlatforms.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">{platform.name}</span>
                  <span className="text-xs text-gray-600 ml-2">{platform.username}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  platform.verified 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {platform.verified ? '✓ Verified' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={checkPostWarning}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 font-medium"
          >
            📝 Write a Review
          </button>
          <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-medium">
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Trust Score Breakdown Modal */}
      {showTrustBreakdown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Trust Score Breakdown</h3>
                <button
                  onClick={() => setShowTrustBreakdown(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {trustFactors.map((factor) => (
                <div key={factor.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <span className="text-sm text-gray-600">{factor.weight}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className={`h-2 rounded-full ${factor.color}`}
                        style={{ width: `${factor.score}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{factor.score}</span>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">95/100</div>
                  <div className="text-sm text-gray-600">Overall Trust Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Accounts Management Modal */}
      {showSocialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Manage Social Accounts</h3>
                <button
                  onClick={() => setShowSocialModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {connectedPlatforms.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-gray-600">{platform.username}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      Remove
                    </button>
                    {!platform.verified && (
                      <button className="text-xs bg-cyan-600 text-white px-2 py-1 rounded">
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-cyan-500 hover:text-cyan-600">
                ➕ Add New Platform
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 