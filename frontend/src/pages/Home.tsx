import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🏠 Home Feed</h1>
        
        <div className="space-y-4">
          {/* Sample posts */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-800">John reviewed Sarah</div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">"Great project partner, very reliable and always delivers on time."</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-cyan-600">
                <span>👍</span>
                <span>12</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-cyan-600">
                <span>👎</span>
                <span>3</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-cyan-600">
                <span>💬</span>
                <span>5</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-800">Mike reviewed Lisa</div>
                <div className="text-sm text-gray-500">4 hours ago</div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">"Helpful mentor, always on time for meetings and gives great feedback."</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-cyan-600">
                <span>👍</span>
                <span>8</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-cyan-600">
                <span>👎</span>
                <span>1</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-cyan-600">
                <span>💬</span>
                <span>2</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-800">Alex reviewed Tom</div>
                <div className="text-sm text-gray-500">6 hours ago</div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">"Excellent communication skills and very professional in all interactions."</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-cyan-600">
                <span>👍</span>
                <span>15</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-cyan-600">
                <span>👎</span>
                <span>0</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-cyan-600">
                <span>💬</span>
                <span>7</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 