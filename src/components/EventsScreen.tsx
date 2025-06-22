import React from 'react';

const EventsScreen: React.FC = () => {
  // Check if user has completed walkthrough and has low trust score
  const walkthroughCompleted = localStorage.getItem('walkthroughCompleted') === 'true';
  const userSocialAccounts = JSON.parse(localStorage.getItem('userSocialAccounts') || '[]');
  const hasNoSocialAccounts = userSocialAccounts.length === 0;
  const showTrustWarning = !walkthroughCompleted || hasNoSocialAccounts;

  const handleRSVP = () => {
    if (showTrustWarning) {
      alert('⚠️ You need to add social accounts and friends to increase your trust score before RSVPing to events. Complete your profile setup to participate in the community.');
      return;
    }
    alert('RSVP functionality would be implemented here');
  };
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Events</h1>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">🎉 Tech Meetup Tonight</div>
            <button 
              onClick={handleRSVP}
              className="text-sm text-cyan-600 hover:text-cyan-700"
            >
              RSVP
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-2">📍 Downtown Cafe • 7:00 PM</div>
          <div className="text-sm text-gray-500">👥 12 going • Trust Req: 70+</div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">🍕 Pizza & Code Session</div>
            <button 
              onClick={handleRSVP}
              className="text-sm text-cyan-600 hover:text-cyan-700"
            >
              RSVP
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-2">📍 Library • Tomorrow 6PM</div>
          <div className="text-sm text-gray-500">👥 8 going • Trust Req: 50+</div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">☕ Coffee Chat</div>
            <button 
              onClick={handleRSVP}
              className="text-sm text-cyan-600 hover:text-cyan-700"
            >
              RSVP
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-2">📍 Starbucks • Friday 3PM</div>
          <div className="text-sm text-gray-500">👥 4 going • Trust Req: 60+</div>
        </div>
      </div>
    </div>
  );
};

export default EventsScreen; 