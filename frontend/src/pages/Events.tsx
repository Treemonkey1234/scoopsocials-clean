import React from 'react';

const Events: React.FC = () => {
  const checkWarnings = () => {
    const walkthroughCompleted = localStorage.getItem('walkthroughCompleted');
    const socialAccounts = localStorage.getItem('userSocialAccounts');
    
    if (!walkthroughCompleted || !socialAccounts) {
      alert('⚠️ Complete your profile setup to participate in events! Add social accounts and friends to boost your trust score.');
      return false;
    }
    return true;
  };

  const handleRSVP = () => {
    if (checkWarnings()) {
      alert('✅ RSVP successful!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🎉 Events</h1>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">🎯 Tech Meetup Tonight</h3>
                <p className="text-gray-600">📍 Downtown Cafe • 🕖 7:00 PM</p>
              </div>
              <div className="text-cyan-600 font-semibold">Tonight</div>
            </div>
            <p className="text-gray-700 mb-3">
              Join fellow developers for networking, discussions, and demos of the latest tech projects.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span>👥 12 going</span>
                <span className="ml-4">⭐ Trust score: 85+ required</span>
              </div>
              <button 
                onClick={handleRSVP}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
              >
                RSVP
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">🍕 Community Pizza Night</h3>
                <p className="text-gray-600">📍 Local Park • 🕕 6:00 PM</p>
              </div>
              <div className="text-green-600 font-semibold">Tomorrow</div>
            </div>
            <p className="text-gray-700 mb-3">
              Casual community gathering with free pizza! Great way to meet new people in a relaxed setting.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span>👥 28 going</span>
                <span className="ml-4">⭐ Trust score: 70+ required</span>
              </div>
              <button 
                onClick={handleRSVP}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
              >
                RSVP
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">🎨 Art Gallery Opening</h3>
                <p className="text-gray-600">📍 Modern Art Museum • 🕕 6:30 PM</p>
              </div>
              <div className="text-purple-600 font-semibold">Friday</div>
            </div>
            <p className="text-gray-700 mb-3">
              Exclusive opening of local artist showcase. Wine and networking with the creative community.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span>👥 45 going</span>
                <span className="ml-4">⭐ Trust score: 90+ required</span>
              </div>
              <button 
                onClick={handleRSVP}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
              >
                RSVP
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700">
            ➕ Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events; 