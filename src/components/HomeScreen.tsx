import React from 'react';

const HomeScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Home Feed</h1>
      
      {/* Example reviews */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">📝 John reviewed Sarah</div>
            <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
          </div>
          <p className="text-gray-600 mb-3">"Great project partner, very reliable and always meets deadlines."</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>👍 12</span>
            <span>💬 3</span>
            <span>🔄 5</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">📝 Mike reviewed Lisa</div>
            <div className="text-yellow-500">⭐⭐⭐⭐</div>
          </div>
          <p className="text-gray-600 mb-3">"Helpful mentor, always on time for meetings and very knowledgeable."</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>👍 8</span>
            <span>💬 7</span>
            <span>🔄 2</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">📝 Alex reviewed Tom</div>
            <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
          </div>
          <p className="text-gray-600 mb-3">"Excellent communication skills and very professional to work with."</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>👍 15</span>
            <span>💬 2</span>
            <span>🔄 8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen; 