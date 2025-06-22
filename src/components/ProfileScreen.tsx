import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUIState } from '../contexts/UIStateContext';
import { useProfile } from '../contexts/ProfileContext';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { 
    showTrustBreakdown, 
    setShowTrustBreakdown,
    showSocialAccounts,
    setShowSocialAccounts,
    showCreatePost,
    setShowCreatePost,
    showSettings,
    setShowSettings
  } = useUIState();
  
  const {
    currentUser,
    showProfessionalLayer,
    setShowProfessionalLayer,
    userFriends
  } = useProfile();

  // Check if user has completed walkthrough and has low trust score
  const walkthroughCompleted = localStorage.getItem('walkthroughCompleted') === 'true';
  const userSocialAccounts = JSON.parse(localStorage.getItem('userSocialAccounts') || '[]');
  const hasLowTrustScore = currentUser && currentUser.trustScore < 50;
  const hasNoSocialAccounts = userSocialAccounts.length === 0;
  const showTrustWarning = !walkthroughCompleted || hasLowTrustScore || hasNoSocialAccounts;

  const handleCreatePost = () => {
    if (showTrustWarning) {
      alert('⚠️ You need to add social accounts and friends to increase your trust score before posting. Complete your profile setup to participate in the community.');
      return;
    }
    setShowCreatePost(true);
  };

  if (!user || !currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
          <button
            onClick={() => setShowSettings(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl">
            {currentUser.name[0]}
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="text-gray-600">@{currentUser.username}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowTrustBreakdown(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Trust Score: {currentUser.trustScore}
          </button>
          <button
            onClick={() => setShowSocialAccounts(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Social Accounts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h3 className="font-semibold">Friends</h3>
          <p className="text-2xl font-bold">{userFriends.length}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h3 className="font-semibold">Trust Score</h3>
          <p className="text-2xl font-bold">{currentUser.trustScore}</p>
          {showTrustWarning && (
            <p className="text-xs text-red-500 mt-1">
              ⚠️ Add social accounts and friends to increase trust score
            </p>
          )}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h3 className="font-semibold">Account Type</h3>
          <p className="text-2xl font-bold">{currentUser.accountType}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCreatePost}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Create Post
        </button>
        <button
          onClick={() => setShowProfessionalLayer(!showProfessionalLayer)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {showProfessionalLayer ? 'Hide Professional' : 'Show Professional'}
        </button>
      </div>
    </div>
  );
} 