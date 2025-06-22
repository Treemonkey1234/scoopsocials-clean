import { useState, useCallback, useMemo, useRef } from 'react';
import { FakeUser } from '../data/fakeUsers';
import { Event, Post } from '../types';

interface SearchResults {
  events: Event[];
  people: FakeUser[];
  posts: Post[];
}

interface UseSearchProps {
  events: Event[];
  allUsers: FakeUser[];
  posts: Post[];
  isUserBlocked?: (username: string) => boolean;
}

export function useSearch({ events, allUsers, posts, isUserBlocked }: UseSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      return {
        events: [],
        people: [],
        posts: []
      };
    }

    const searchTerm = query.toLowerCase();
    
    // Search events
    const filteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm) ||
      event.organizer.toLowerCase().includes(searchTerm)
    );

    // Search people (excluding blocked users)
    const filteredPeople = allUsers.filter(user =>
      !isUserBlocked?.(user.name) &&
      (user.name.toLowerCase().includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm) ||
      user.location.city.toLowerCase().includes(searchTerm) ||
      user.location.state.toLowerCase().includes(searchTerm) ||
      (user.occupation && user.occupation.toLowerCase().includes(searchTerm)))
    );

    // Search posts (excluding blocked users)
    const filteredPosts = posts.filter(post =>
      !isUserBlocked?.(post.reviewer) && !isUserBlocked?.(post.reviewedPerson) &&
      (post.content.toLowerCase().includes(searchTerm) ||
      post.reviewer.toLowerCase().includes(searchTerm) ||
      post.reviewedPerson.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm))
    );

    return {
      events: filteredEvents,
      people: filteredPeople,
      posts: filteredPosts
    };
  }, [events, allUsers, posts, isUserBlocked]);

  const debouncedSearch = useCallback((query: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      const results = performSearch(query);
      setSearchResults(results);
    }, 300);
  }, [performSearch]);

  const [searchResults, setSearchResults] = useState<SearchResults>({
    events: [],
    people: [],
    posts: []
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  }, [debouncedSearch]);

  const filteredResults = useMemo(() => {
    if (searchFilter === 'all') return searchResults;
    
    return {
      events: searchFilter === 'events' ? searchResults.events : [],
      people: searchFilter === 'people' ? searchResults.people : [],
      posts: searchFilter === 'posts' ? searchResults.posts : []
    };
  }, [searchResults, searchFilter]);

  return {
    searchQuery,
    searchFilter,
    searchResults: filteredResults,
    handleSearch,
    setSearchFilter
  };
} 