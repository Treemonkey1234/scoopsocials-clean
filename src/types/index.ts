export interface Event {
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

export interface Post {
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