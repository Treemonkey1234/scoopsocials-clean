import { useEffect } from 'react';

export function useMount(callback: () => void) {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
// Only run on mount
  }, []);
} 