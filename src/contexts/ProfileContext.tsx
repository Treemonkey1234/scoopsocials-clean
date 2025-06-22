import React, { createContext, useContext, useState, useEffect } from 'react';
import { FakeUser, getFakeUsers, getFriendsForUser } from '../data/fakeUsers';
import { useAuth } from './AuthContext';

interface ProfileContextType {
  currentUser: FakeUser | null;
  userFriends: FakeUser[];
  showProfessionalLayer: boolean;
  setShowProfessionalLayer: (show: boolean) => void;
  friendCategories: Record<string, 'professional_only' | 'personal_access'>;
  updateFriendCategory: (friendId: string, category: 'professional_only' | 'personal_access') => void;
  blockUser: (username: string) => void;
  unblockUser: (username: string) => void;
  isUserBlocked: (username: string) => boolean;
  removeFriend: (userId: string) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<FakeUser | null>(null);
  const [userFriends, setUserFriends] = useState<FakeUser[]>([]);
  const [showProfessionalLayer, setShowProfessionalLayer] = useState(false);
  const [friendCategories, setFriendCategories] = useState<Record<string, 'professional_only' | 'personal_access'>>({});
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with fake data for demo
    const users = getFakeUsers();
    if (users.length > 0) {
      const demoUser = users.find(u => u.name === 'Riesling LeFluuf') || users[0];
      setCurrentUser(demoUser);
      const friends = getFriendsForUser(demoUser.id);
      const limitedFriends = friends.slice(0, Math.max(15, friends.length - 1));
      setUserFriends(limitedFriends);
    }
  }, [user]); // Re-run when authenticated user changes

  const updateFriendCategory = (friendId: string, category: 'professional_only' | 'personal_access') => {
    setFriendCategories(prev => ({
      ...prev,
      [friendId]: category
    }));
  };

  const blockUser = (username: string) => {
    setBlockedUsers(prev => [...prev, username]);
    setUserFriends(prev => prev.filter(friend => friend.name !== username));
  };

  const unblockUser = (username: string) => {
    setBlockedUsers(prev => prev.filter(blocked => blocked !== username));
  };

  const isUserBlocked = (username: string) => {
    return blockedUsers.includes(username);
  };

  const removeFriend = (userId: string) => {
    setUserFriends(prev => prev.filter(friend => friend.id !== userId));
  };

  return (
    <ProfileContext.Provider
      value={{
        currentUser,
        userFriends,
        showProfessionalLayer,
        setShowProfessionalLayer,
        friendCategories,
        updateFriendCategory,
        blockUser,
        unblockUser,
        isUserBlocked,
        removeFriend,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
} 