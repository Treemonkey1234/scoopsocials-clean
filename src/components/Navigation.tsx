import React from 'react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  showInbox: boolean;
  onToggleInbox: () => void;
  showSettings: boolean;
  onToggleSettings: () => void;
  notificationCount: number;
}

export function Navigation({
  currentScreen,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  showInbox,
  onToggleInbox,
  showSettings,
  onToggleSettings,
  notificationCount
}: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around px-2 py-1">
      <button 
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center py-1 px-1 min-w-0 flex-1 transition-colors ${
          currentScreen === 'home' ? 'text-cyan-600' : 'text-gray-500'
        }`}
      >
        <span className="text-lg mb-1">🏠</span>
        <span className="text-xs font-medium leading-tight">Home</span>
      </button>

      <button 
        onClick={() => onNavigate('groups')}
        className={`flex flex-col items-center justify-center py-1 px-1 min-w-0 flex-1 transition-colors ${
          currentScreen === 'groups' ? 'text-cyan-600' : 'text-gray-500'
        }`}
      >
        <span className="text-lg mb-1">📅</span>
        <span className="text-xs font-medium leading-tight">Events</span>
      </button>

      <button 
        onClick={() => onNavigate('search')}
        className={`flex flex-col items-center justify-center py-1 px-1 min-w-0 flex-1 transition-colors ${
          currentScreen === 'search' ? 'text-cyan-600' : 'text-gray-500'
        }`}
      >
        <span className="text-lg mb-1">🔍</span>
        <span className="text-xs font-medium leading-tight">Search</span>
      </button>

      <button 
        onClick={() => onNavigate('friends')}
        className={`flex flex-col items-center justify-center py-1 px-1 min-w-0 flex-1 transition-colors ${
          currentScreen === 'friends' ? 'text-cyan-600' : 'text-gray-500'
        }`}
      >
        <span className="text-lg mb-1">👥</span>
        <span className="text-xs font-medium leading-tight">Friends</span>
      </button>

      <button 
        onClick={onToggleInbox}
        className={`flex flex-col items-center justify-center py-1 px-1 min-w-0 flex-1 transition-colors ${
          showInbox ? 'text-cyan-600' : 'text-gray-500'
        }`}
      >
        <div className="relative">
          <span className="text-lg mb-1">📬</span>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </div>
        <span className="text-xs font-medium leading-tight">Inbox</span>
      </button>

      <button 
        onClick={onToggleSettings}
        className={`flex flex-col items-center justify-center py-1 px-1 min-w-0 flex-1 transition-colors ${
          showSettings ? 'text-cyan-600' : 'text-gray-500'
        }`}
      >
        <span className="text-lg mb-1">⚙️</span>
        <span className="text-xs font-medium leading-tight">Settings</span>
      </button>

      <button 
        onClick={onToggleDarkMode}
        className="flex flex-col items-center justify-center py-1 px-1 min-w-0 flex-1 transition-colors text-gray-500"
      >
        <span className="text-lg mb-1">{isDarkMode ? '🌙' : '☀️'}</span>
        <span className="text-xs font-medium leading-tight">Theme</span>
      </button>
    </div>
  );
} 