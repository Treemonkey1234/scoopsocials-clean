export interface FakeUser {
  id: string;
  username: string;
  trustScore: number;
  avatar: string;
  flagHistory: {
    flagsSubmitted: number;
    falseFlags: number;
  };
  scoops: {
    total: number;
    verified: number;
    pending: number;
  };
  badges: {
    name: string;
    description: string;
    icon: string;
  }[];
  recentActivity: {
    type: 'scoop' | 'flag' | 'verification';
    title: string;
    timestamp: string;
    status: 'success' | 'pending' | 'failed';
  }[];
}

export const fakeUsers: FakeUser[] = [
  {
    id: '1',
    username: 'scoop_master',
    trustScore: 95,
    avatar: '👨‍💼',
    flagHistory: {
      flagsSubmitted: 45,
      falseFlags: 2
    },
    scoops: {
      total: 120,
      verified: 115,
      pending: 5
    },
    badges: [
      {
        name: 'Verified Reporter',
        description: 'Has submitted 100+ verified scoops',
        icon: '🏆'
      },
      {
        name: 'Community Trusted',
        description: 'Maintains 90%+ trust score',
        icon: '⭐'
      }
    ],
    recentActivity: [
      {
        type: 'scoop',
        title: 'New Tech Launch',
        timestamp: '2024-02-15T10:30:00Z',
        status: 'success'
      }
    ]
  },
  {
    id: '2',
    username: 'news_hunter',
    trustScore: 88,
    avatar: '👩‍💻',
    flagHistory: {
      flagsSubmitted: 30,
      falseFlags: 3
    },
    scoops: {
      total: 85,
      verified: 80,
      pending: 5
    },
    badges: [
      {
        name: 'Rising Star',
        description: 'Consistently high-quality reports',
        icon: '🌟'
      }
    ],
    recentActivity: [
      {
        type: 'verification',
        title: 'Breaking News Verification',
        timestamp: '2024-02-14T15:45:00Z',
        status: 'success'
      }
    ]
  },
  {
    id: '3',
    username: 'truth_seeker',
    trustScore: 92,
    avatar: '🧐',
    flagHistory: {
      flagsSubmitted: 25,
      falseFlags: 1
    },
    scoops: {
      total: 95,
      verified: 90,
      pending: 5
    },
    badges: [
      {
        name: 'Accuracy Expert',
        description: 'Maintains 95%+ verification rate',
        icon: '🎯'
      }
    ],
    recentActivity: [
      {
        type: 'flag',
        title: 'Misinformation Report',
        timestamp: '2024-02-13T09:15:00Z',
        status: 'success'
      }
    ]
  }
]; 