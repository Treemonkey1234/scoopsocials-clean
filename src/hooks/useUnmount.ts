import { useEffect } from 'react';

export function useUnmount(callback: () => void) {
  useEffect(() => {
    return () => {
      callback();
    };
    // eslint-disable-next-line
// Only run on unmount
  }, []);
} 