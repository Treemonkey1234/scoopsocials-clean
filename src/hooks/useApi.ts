import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Event, Post } from '../types';
import { FakeUser } from '../data/fakeUsers';
import { getFakeUsers, getFriendsForUser } from '../data/fakeUsers';

// Posts API
export function usePosts() {
  return useQuery<Post[]>('posts', async () => {
    // In a real app, this would be an API call
    return [
      {
        id: '1',
        reviewer: 'Jessica Wong',
        reviewerTrustScore: 95,
        reviewedPerson: 'David Kim',
        content: 'Great project manager! Jessica helped coordinate our agency collaboration and was incredibly organized.',
        timestamp: '2 days ago',
        votes: 18,
        userVote: null,
        comments: 3,
        category: 'Professional',
        engagement: { agrees: 22, disagrees: 4, communityValidation: 85 }
      },
      // Add more posts here
    ];
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (newPost: Omit<Post, 'id'>) => {
      // In a real app, this would be an API call
      return { ...newPost, id: Date.now().toString() };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      }
    }
  );
}

// Events API
export function useEvents() {
  return useQuery<Event[]>('events', async () => {
    // In a real app, this would be an API call
    return [
      {
        id: '1',
        title: 'Tech Meetup Phoenix',
        date: '2024-03-15',
        time: '18:00',
        endTime: '20:00',
        organizer: 'Mike Johnson',
        goingCount: 45,
        trustRequired: 75,
        category: 'Technology',
        location: 'Phoenix Convention Center'
      },
      // Add more events here
    ];
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (newEvent: Omit<Event, 'id'>) => {
      // In a real app, this would be an API call
      return { ...newEvent, id: Date.now().toString() };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
      }
    }
  );
}

// Friends API
export function useFriends(userId: string) {
  return useQuery<FakeUser[]>(
    ['friends', userId],
    async () => {
      // In a real app, this would be an API call
      return getFriendsForUser(userId);
    },
    {
      enabled: !!userId
    }
  );
}

export function useAllUsers() {
  return useQuery<FakeUser[]>('users', async () => {
    // In a real app, this would be an API call
    return getFakeUsers();
  });
}

export function useAddFriend() {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ userId, friendId }: { userId: string; friendId: string }) => {
      // In a real app, this would be an API call
      return { success: true };
    },
    {
      onSuccess: (_, { userId }) => {
        queryClient.invalidateQueries(['friends', userId]);
      }
    }
  );
}

export function useRemoveFriend() {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ userId, friendId }: { userId: string; friendId: string }) => {
      // In a real app, this would be an API call
      return { success: true };
    },
    {
      onSuccess: (_, { userId }) => {
        queryClient.invalidateQueries(['friends', userId]);
      }
    }
  );
} 