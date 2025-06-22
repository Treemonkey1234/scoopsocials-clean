import { useState, useCallback, useMemo } from 'react';
import { FakeUser } from '../data/fakeUsers';

interface UseFriendsProps {
  initialFriends: FakeUser[];
  isUserBlocked?: (username: string) => boolean;
}

export function useFriends({ initialFriends, isUserBlocked }: UseFriendsProps) {
  const [userFriends, setUserFriends] = useState<FakeUser[]>(initialFriends);
  const [friendsFilter, setFriendsFilter] = useState('all');
  const [friendsSearchQuery, setFriendsSearchQuery] = useState('');
  const [friendCategories, setFriendCategories] = useState<Record<string, 'professional_only' | 'personal_access'>>({});

  const removeFriend = useCallback((userId: string) => {
    setUserFriends(prev => prev.filter(friend => friend.id !== userId));
  }, []);

  const updateFriendCategory = useCallback((friendId: string, category: 'professional_only' | 'personal_access') => {
    setFriendCategories(prev => ({
      ...prev,
      [friendId]: category
    }));
  }, []);

  const getProfessionalRelationshipType = useCallback((friendId: string): 'professional_only' | 'personal_access' => {
    return friendCategories[friendId] || 'professional_only';
  }, [friendCategories]);

  const filteredFriends = useMemo(() => {
    let filtered = userFriends;

    // Apply search filter
    if (friendsSearchQuery.trim()) {
      filtered = filtered.filter(friend => 
        friend.name.toLowerCase().includes(friendsSearchQuery.toLowerCase()) ||
        friend.username.toLowerCase().includes(friendsSearchQuery.toLowerCase()) ||
        friend.location?.city.toLowerCase().includes(friendsSearchQuery.toLowerCase())
      );
    }

    // Apply category filter
    switch (friendsFilter) {
      case 'reciprocal':
        // For demo, just show friends with high connection counts as "reciprocal"
        filtered = filtered.filter(friend => friend.connectionCount > 20);
        break;
      case 'recent':
        // Sort by join date (most recent first)
        filtered = filtered.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
        break;
      case 'professional':
        // Show only friends categorized as professional-only
        filtered = filtered.filter(friend => getProfessionalRelationshipType(friend.id) === 'professional_only');
        break;
      case 'personal':
        // Show only friends with personal access
        filtered = filtered.filter(friend => getProfessionalRelationshipType(friend.id) === 'personal_access');
        break;
      default:
        // Show all friends
        break;
    }

    return filtered;
  }, [userFriends, friendsSearchQuery, friendsFilter, getProfessionalRelationshipType]);

  return {
    userFriends,
    setUserFriends,
    friendsFilter,
    setFriendsFilter,
    friendsSearchQuery,
    setFriendsSearchQuery,
    friendCategories,
    filteredFriends,
    removeFriend,
    updateFriendCategory,
    getProfessionalRelationshipType
  };
} 