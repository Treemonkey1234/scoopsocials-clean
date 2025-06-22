import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollPositionOptions {
  throttleMs?: number;
  element?: HTMLElement | null;
}

export function useScrollPosition({
  throttleMs = 100,
  element
}: UseScrollPositionOptions = {}) {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const target = element || window;
    const x = element ? element.scrollLeft : window.pageXOffset;
    const y = element ? element.scrollTop : window.pageYOffset;

    setPosition({ x, y });

    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, throttleMs);
  }, [element, isScrolling, throttleMs]);

  useEffect(() => {
    const target = element || window;
    target.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [element, handleScroll]);

  return {
    ...position,
    isScrolling
  };
}

// Example usage:
// const { x, y, isScrolling } = useScrollPosition({
//   throttleMs: 100,
//   element: containerRef.current
// });
//
// // Show scroll indicator
// const showScrollIndicator = y > 100;
//
// // Infinite scroll
// const isNearBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 100; 