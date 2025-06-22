import React from 'react';

const TestNewUser: React.FC = () => {
  const simulateNewUser = () => {
    localStorage.setItem('isNewUser', 'true');
    localStorage.removeItem('walkthroughCompleted');
    window.location.reload();
  };

  const resetWalkthrough = () => {
    localStorage.removeItem('isNewUser');
    localStorage.removeItem('walkthroughCompleted');
    localStorage.removeItem('userSocialAccounts');
    window.location.reload();
  };

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50">
      <h3 className="font-semibold mb-2">Developer Tools</h3>
      <div className="space-y-2">
        <button
          onClick={simulateNewUser}
          className="block w-full text-left text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          🆕 Simulate New User
        </button>
        <button
          onClick={resetWalkthrough}
          className="block w-full text-left text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          🔄 Reset All Data
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Current flags:
        <br />
        isNewUser: {localStorage.getItem('isNewUser') || 'false'}
        <br />
        walkthroughCompleted: {localStorage.getItem('walkthroughCompleted') || 'false'}
      </div>
    </div>
  );
};

export default TestNewUser; 