import React, { createContext, useContext, useState } from 'react';

type ScreenType = 'home' | 'profile' | 'events' | 'search' | 'user-profile';

interface UIStateContextType {
  currentScreen: ScreenType;
  previousScreen: ScreenType;
  isDarkMode: boolean;
  showTrustBreakdown: boolean;
  showSocialAccounts: boolean;
  showEventModal: boolean;
  showCreatePost: boolean;
  showSettings: boolean;
  setCurrentScreen: (screen: ScreenType) => void;
  setPreviousScreen: (screen: ScreenType) => void;
  setIsDarkMode: (isDark: boolean) => void;
  setShowTrustBreakdown: (show: boolean) => void;
  setShowSocialAccounts: (show: boolean) => void;
  setShowEventModal: (show: boolean) => void;
  setShowCreatePost: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
}

const UIStateContext = createContext<UIStateContextType | null>(null);

export function useUIState() {
  const context = useContext(UIStateContext);
  if (!context) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
}

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTrustBreakdown, setShowTrustBreakdown] = useState(false);
  const [showSocialAccounts, setShowSocialAccounts] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <UIStateContext.Provider
      value={{
        currentScreen,
        previousScreen,
        isDarkMode,
        showTrustBreakdown,
        showSocialAccounts,
        showEventModal,
        showCreatePost,
        showSettings,
        setCurrentScreen,
        setPreviousScreen,
        setIsDarkMode,
        setShowTrustBreakdown,
        setShowSocialAccounts,
        setShowEventModal,
        setShowCreatePost,
        setShowSettings,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
} 