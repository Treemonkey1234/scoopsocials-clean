import React, { useState } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  organizer: string;
  goingCount: number;
  trustRequired: number;
  category: string;
  location: string;
}

interface EventDetailsModalProps {
  onClose: () => void;
  event: Event;
  onRSVP: (eventId: string, status: 'going' | 'maybe' | 'not_going') => void;
  onViewAttendees: (eventId: string) => void;
  isUserBlocked?: (username: string) => boolean;
  onViewProfile?: (userName: string) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ onClose, event, onRSVP, onViewAttendees, isUserBlocked, onViewProfile }) => {
  const [userStatus, setUserStatus] = useState<'going' | 'maybe' | 'not_going' | null>(null);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-sm max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Event Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Event Title */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
            <span className="inline-block bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-xs font-medium">
              {event.category}
            </span>
          </div>

          {/* Date & Time */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="text-gray-600 text-sm mr-2">📅</span>
              <span className="text-sm font-medium text-gray-900">{event.date}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-gray-600 text-sm mr-2">🕐</span>
              <span className="text-sm text-gray-700">{event.time}</span>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="text-gray-600 text-sm mr-2">📍</span>
              <span className="text-sm font-medium text-gray-900">{event.location}</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-3 text-xs text-gray-600">
              <div className="font-medium mb-1">Getting There:</div>
              <div>• Parking available on-site</div>
              <div>• Public transit: Light Rail to Central/Van Buren</div>
              <div>• Rideshare pickup zone at main entrance</div>
            </div>
          </div>

          {/* Organizer */}
          <div className="mb-4">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div>
                <div className="text-sm font-medium text-gray-900">Organized by</div>
                <div className="text-sm text-gray-700">{event.organizer}</div>
              </div>
              <button 
                onClick={() => {
                  // Extract name from organizer string (e.g., "John Doe (Trust: 85)" -> "John Doe")
                  const organizerName = event.organizer.split(' (')[0];
                  onViewProfile?.(organizerName);
                }}
                className="text-cyan-600 text-sm hover:text-cyan-700"
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Event Details */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">About This Event</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Join us for an amazing community gathering! This event is perfect for meeting new people, 
              sharing experiences, and building meaningful connections in a trusted environment.
            </p>
          </div>

          {/* Requirements */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-green-600 text-sm mr-2">✓</span>
                <span className="text-sm text-gray-700">Minimum Trust Score: {event.trustRequired}</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 text-sm mr-2">✓</span>
                <span className="text-sm text-gray-700">Verified ScoopSocials profile</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 text-sm mr-2">✓</span>
                <span className="text-sm text-gray-700">Community guidelines compliance</span>
              </div>
            </div>
          </div>

          {/* Attendees */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Attendees ({event.goingCount})</h4>
              <button 
                onClick={() => onViewAttendees(event.id)}
                className="text-cyan-600 text-sm hover:text-cyan-700"
              >
                View All
              </button>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                SM
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                MJ
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                ED
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">
                +{event.goingCount - 3}
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        {userStatus && (
          <div className="px-4 mb-4">
            <div className={`p-3 rounded-lg text-center ${
              userStatus === 'going' ? 'bg-green-100 text-green-800' :
              userStatus === 'maybe' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              You are: <strong>{userStatus === 'going' ? 'Going' : userStatus === 'maybe' ? 'Maybe' : 'Not Going'}</strong>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setUserStatus('going');
                  onRSVP(event.id, 'going');
                }}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  userStatus === 'going' ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                ✓ Going
              </button>
              <button
                onClick={() => {
                  setUserStatus('maybe');
                  onRSVP(event.id, 'maybe');
                }}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  userStatus === 'maybe' ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                ? Maybe
              </button>
              <button
                onClick={() => {
                  setUserStatus('not_going');
                  onRSVP(event.id, 'not_going');
                }}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  userStatus === 'not_going' ? 'bg-red-600 text-white' : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                ✗ Not Going
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;