// ScoopSocials App - Updated: 2025-01-07 18:30 UTC
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { WalkthroughModal } from './components/WalkthroughModal';
import { TestNewUser } from './components/TestNewUser';
import Home from './pages/Home';
import Events from './pages/Events';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Friends from './pages/Friends';

type ScreenType = 'home' | 'events' | 'search' | 'friends' | 'profile';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const { isAuthenticated, showAuthModal, setShowAuthModal, handleAuthSuccess } = useAuth();

  useEffect(() => {
    // Check if user is new and should see walkthrough
    const isNewUser = localStorage.getItem('isNewUser') === 'true';
    const walkthroughCompleted = localStorage.getItem('walkthroughCompleted');
    
    if (isAuthenticated && isNewUser && !walkthroughCompleted) {
      setShowWalkthrough(true);
    }
  }, [isAuthenticated]);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
    localStorage.setItem('walkthroughCompleted', 'true');
    localStorage.removeItem('isNewUser');
  };

  const handleWalkthroughClose = () => {
    setShowWalkthrough(false);
    localStorage.removeItem('isNewUser');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home />;
      case 'events':
        return <Events />;
      case 'search':
        return <Search />;
      case 'friends':
        return <Friends />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-16">
        {renderScreen()}
      </div>

      {/* Footer Navigation */}
      <FooterNavigation currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Walkthrough Modal */}
      <WalkthroughModal
        isOpen={showWalkthrough}
        onClose={handleWalkthroughClose}
        onComplete={handleWalkthroughComplete}
      />

      {/* Development Tools */}
      {process.env.NODE_ENV === 'development' && <TestNewUser />}
    </div>
  );
}

// Footer Navigation Component
interface FooterNavigationProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

const FooterNavigation: React.FC<FooterNavigationProps> = ({ currentScreen, onNavigate }) => {
  const { requireAuth } = useAuth();

  const handleNavigation = (screen: ScreenType) => {
    if (screen === 'profile' || screen === 'friends') {
      requireAuth(() => onNavigate(screen));
    } else {
      onNavigate(screen);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between z-30">
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App; 