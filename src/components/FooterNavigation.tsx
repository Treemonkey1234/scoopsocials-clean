import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

type ScreenType = 'home' | 'events' | 'search' | 'friends' | 'profile' | 'groups' | 'user-profile' | 'inbox';

interface FooterNavigationProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const FooterNavigation: React.FC<FooterNavigationProps> = ({ currentScreen, onNavigate }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleNavigation = (screen: ScreenType) => {
    if (screen === 'profile' && !isAuthenticated) {
      router.push('/signin');
      return;
    }
    onNavigate(screen);
  };

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <button 
        onClick={() => handleNavigation('home')}
        className={`flex flex-col items-center ${currentScreen === 'home' ? 'text-cyan-600' : 'text-gray-500'}`}
      >
        <span className="text-xl">🏠</span>
        <span className="text-xs mt-1">Home</span>
      </button>
      
      <button 
        onClick={() => handleNavigation('events')}
        className={`flex flex-col items-center ${currentScreen === 'events' ? 'text-cyan-600' : 'text-gray-500'}`}
      >
        <span className="text-xl">📅</span>
        <span className="text-xs mt-1">Events</span>
      </button>
      
      <button 
        onClick={() => handleNavigation('search')}
        className={`flex flex-col items-center ${currentScreen === 'search' ? 'text-cyan-600' : 'text-gray-500'}`}
      >
        <span className="text-xl">🔍</span>
        <span className="text-xs mt-1">Search</span>
      </button>
      
      <button 
        onClick={() => handleNavigation('friends')}
        className={`flex flex-col items-center ${currentScreen === 'friends' ? 'text-cyan-600' : 'text-gray-500'}`}
      >
        <span className="text-xl">👥</span>
        <span className="text-xs mt-1">Friends</span>
      </button>
      
      <button 
        onClick={() => handleNavigation('profile')}
        className={`flex flex-col items-center ${currentScreen === 'profile' ? 'text-cyan-600' : 'text-gray-500'}`}
      >
        <span className="text-xl">👤</span>
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  );
}; 