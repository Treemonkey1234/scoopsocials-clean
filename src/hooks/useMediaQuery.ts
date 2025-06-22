import { useState, useEffect } from 'react';

type MediaQueryCallback = (matches: boolean) => void;

interface UseMediaQueryOptions {
  query: string;
  defaultMatches?: boolean;
}

export function useMediaQuery({
  query,
  defaultMatches = false
}: UseMediaQueryOptions): boolean {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
    // Older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => {
        mediaQuery.removeListener(handleChange);
      };
    }
  }, [query]);

  return matches;
}

// Predefined breakpoints
export const breakpoints = {
  xs: '(max-width: 639px)',
  sm: '(min-width: 640px) and (max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 1023px)',
  lg: '(min-width: 1024px) and (max-width: 1279px)',
  xl: '(min-width: 1280px)'
};

// Helper hooks for common breakpoints
export function useIsMobile() {
  return useMediaQuery({ query: breakpoints.xs });
}

export function useIsTablet() {
  return useMediaQuery({ query: breakpoints.sm });
}

export function useIsDesktop() {
  return useMediaQuery({ query: breakpoints.lg });
}

export function useIsLargeDesktop() {
  return useMediaQuery({ query: breakpoints.xl });
}

// Example usage:
// const isMobile = useIsMobile();
// const isTablet = useIsTablet();
// const isDesktop = useIsDesktop();
// const isLargeDesktop = useIsLargeDesktop();
//
// // Custom media query
// const prefersDarkMode = useMediaQuery({
//   query: '(prefers-color-scheme: dark)'
// }); 