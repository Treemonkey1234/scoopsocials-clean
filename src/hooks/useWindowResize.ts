import { useState, useEffect, useCallback, useRef } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowResizeOptions {
  debounceMs?: number;
  initialSize?: WindowSize;
}

export function useWindowResize({
  debounceMs = 100,
  initialSize = { width: window.innerWidth, height: window.innerHeight }
}: UseWindowResizeOptions = {}) {
  const [size, setSize] = useState<WindowSize>(initialSize);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, debounceMs);
  }, [debounceMs]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize]);

  return size;
}

// Example usage:
// const { width, height } = useWindowResize({
//   debounceMs: 200,
//   initialSize: { width: 1024, height: 768 }
// });
//
// // Responsive layout
// const isMobile = width < 640;
// const isTablet = width >= 640 && width < 1024;
// const isDesktop = width >= 1024; 