import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
  email?: string;
  accountType: 'FREE' | 'PROFESSIONAL' | 'VENUE';
  bio?: string;
  trustScore: number;
  isNewUser?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  handleAuthSuccess: (isNewUser?: boolean) => Promise<void>;
  handleLogout: () => void;
  requireAuth: (action: () => void) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setIsAuthenticated(true);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
        }
      }
    };
    checkAuth();
  }, []);

  const handleAuthSuccess = async (isNewUser: boolean = false) => {
    setShowAuthModal(false);
    
    // For demo purposes, create a mock user
    const mockUser: User = {
      id: 'demo_user_' + Date.now(),
      name: 'Demo User',
      username: 'demo_user',
      phone: '+1234567890',
      email: 'demo@example.com',
      accountType: 'FREE',
      bio: 'New to ScoopSocials!',
      trustScore: 85,
      isNewUser
    };
    
    // Store auth data
    localStorage.setItem('auth_token', 'demo_token_' + Date.now());
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    
    if (isNewUser) {
      localStorage.setItem('isNewUser', 'true');
    }
    
    setIsAuthenticated(true);
    setUser(mockUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('isNewUser');
    localStorage.removeItem('walkthroughCompleted');
    setIsAuthenticated(false);
    setUser(null);
  };

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    action();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        showAuthModal,
        setShowAuthModal,
        handleAuthSuccess,
        handleLogout,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
} 