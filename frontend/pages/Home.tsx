import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🏠 Home Feed</h1>
        
        <div className="space-y-4">
          {/* Sample reviews */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <div className="ml-3">
                <div className="font-semibold">John reviewed Sarah</div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">
              "Great project partner, very reliable and always delivers quality work on time."
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>👍 12</span>
              <span>👎 3</span>
              <span>💬 5</span>
              <span className="text-yellow-600">⭐ Trust Score: 94/100</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <div className="ml-3">
                <div className="font-semibold">Mike reviewed Lisa</div>
                <div className="text-sm text-gray-500">5 hours ago</div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">
              "Helpful mentor, always on time for our weekly check-ins. Highly recommend!"
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>👍 8</span>
              <span>👎 7</span>
              <span>💬 2</span>
              <span className="text-yellow-600">⭐ Trust Score: 87/100</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <div className="ml-3">
                <div className="font-semibold">Emma reviewed David</div>
                <div className="text-sm text-gray-500">1 day ago</div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">
              "Excellent communicator and team player. Made our group project so much easier."
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>👍 15</span>
              <span>👎 1</span>
              <span>💬 8</span>
              <span className="text-yellow-600">⭐ Trust Score: 92/100</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700">
            📝 Write a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 