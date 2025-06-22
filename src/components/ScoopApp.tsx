import React, { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from 'react';
import TrustScoreBreakdown from './TrustScoreBreakdown';
import SocialAccountsModal from './SocialAccountsModal';
import AddAccountModal from './AddAccountModal';
import CreatePostModal from './CreatePostModal';
import FlagModal from './FlagModal';
import CommentsModal from './CommentsModal';
import CreateEventModal from './CreateEventModal';
import EventDetailsModal from './EventDetailsModal';
import AttendeesModal from './AttendeesModal';
import EventReviewModal from './EventReviewModal';
import ModeratorInterface from './ModeratorInterface';
import AuthModal from './AuthModal';
import { FooterNavigation } from './FooterNavigation';
import { getFakeUsers, getFriendsForUser, getRecommendedFriends, searchUsers, getNetworkAnalytics, FakeUser } from '../data/fakeUsers';
import { authService, User } from '../services/authService';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import EventsScreen from './EventsScreen';
import SearchScreen from './SearchScreen';
import FriendsScreen from './FriendsScreen';
import TestNewUser from './TestNewUser';
import { AuthProvider } from '../contexts/AuthContext';
import { UIStateProvider } from '../contexts/UIStateContext';
import { ProfileProvider } from '../contexts/ProfileContext';
import { WalkthroughModal } from './WalkthroughModal';

interface NavigationProps {
  onNavigate: (screen: string) => void;
}

interface Post {
  id: string;
  reviewer: string;
  reviewerTrustScore: number;
  reviewedPerson: string;
  content: string;
  timestamp: string;
  votes: number;
  userVote: 'up' | 'down' | null;
  comments: number;
  category: string;
  engagement: {
    agrees: number;
    disagrees: number;
    communityValidation: number;
  };
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  organizer: string;
  goingCount: number;
  trustRequired: number;
  category: string;
  location: string;
  isPrivate?: boolean;
  userRSVP?: 'going' | 'maybe' | 'not_going' | null;
}

type ScreenType = 'home' | 'events' | 'search' | 'friends' | 'profile' | 'groups' | 'user-profile' | 'inbox';

export default function ScoopApp() {
  return (
    <AuthProvider>
      <UIStateProvider>
        <ProfileProvider>
          <AppContent />
        </ProfileProvider>
      </UIStateProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  
  useEffect(() => {
    // Check if user is new and hasn't completed walkthrough
    const walkthroughCompleted = localStorage.getItem('walkthroughCompleted');
    const isNewUser = localStorage.getItem('isNewUser') === 'true';
    
    if (isNewUser && !walkthroughCompleted) {
      setShowWalkthrough(true);
    }
  }, []);
  
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };
  
  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
    localStorage.removeItem('isNewUser');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'events' && <EventsScreen />}
        {currentScreen === 'search' && <SearchScreen />}
        {currentScreen === 'friends' && <FriendsScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
      </div>

      {/* Footer Navigation */}
      <FooterNavigation currentScreen={currentScreen} onNavigate={handleNavigate} />
      
      {/* Walkthrough Modal */}
      <WalkthroughModal
        isOpen={showWalkthrough}
        onClose={() => setShowWalkthrough(false)}
        onComplete={handleWalkthroughComplete}
      />
      
      {/* Developer Tools */}
      <TestNewUser />
    </div>
  );
}