import { useState, useRef, useEffect, useCallback } from 'react';

export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= delay) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, delay - (Date.now() - lastRan.current));
    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttledValue;
}

// Throttled callback version
export function useThrottledCallback<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const lastCalled = useRef(0);

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCalled.current >= delay) {
      callback(...args);
      lastCalled.current = now;
    }
  }, [callback, delay]);
} 