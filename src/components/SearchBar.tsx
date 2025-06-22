import React, { useCallback } from 'react';
import { useSearch } from '../hooks/useSearch';
import { Event, Post } from '../types';
import { FakeUser } from '../data/fakeUsers';

interface SearchBarProps {
  events: Event[];
  allUsers: FakeUser[];
  posts: Post[];
  isUserBlocked?: (username: string) => boolean;
  onSearchResults: (results: {
    events: Event[];
    people: FakeUser[];
    posts: Post[];
  }) => void;
}

export function SearchBar({
  events,
  allUsers,
  posts,
  isUserBlocked,
  onSearchResults
}: SearchBarProps) {
  const {
    searchQuery,
    searchFilter,
    searchResults,
    handleSearch,
    setSearchFilter
  } = useSearch({
    events,
    allUsers,
    posts,
    isUserBlocked
  });

  const handleFilterChange = useCallback((filter: string) => {
    setSearchFilter(filter);
  }, [setSearchFilter]);

  // Notify parent component of search results
  React.useEffect(() => {
    onSearchResults(searchResults);
  }, [searchResults, onSearchResults]);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search events, people, or posts..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm ${
            searchFilter === 'all'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('events')}
          className={`px-3 py-1 rounded-full text-sm ${
            searchFilter === 'events'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => handleFilterChange('people')}
          className={`px-3 py-1 rounded-full text-sm ${
            searchFilter === 'people'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          People
        </button>
        <button
          onClick={() => handleFilterChange('posts')}
          className={`px-3 py-1 rounded-full text-sm ${
            searchFilter === 'posts'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Posts
        </button>
      </div>
    </div>
  );
} 