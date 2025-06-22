import { useState, useEffect, useCallback } from 'react';

type StorageValue<T> = T | null;

interface UseLocalStorageOptions<T> {
  key: string;
  initialValue?: T;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

export function useLocalStorage<T>({
  key,
  initialValue,
  serializer = JSON.stringify,
  deserializer = JSON.parse
}: UseLocalStorageOptions<T>) {
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue ?? null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue ?? null;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: StorageValue<T>) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, serializer(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(null);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  // Listen for changes to this localStorage key in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(deserializer(event.newValue));
        } catch (error) {
          console.error(`Error deserializing localStorage key "${key}":`, error);
        }
      } else if (event.key === key && event.newValue === null) {
        setStoredValue(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, deserializer]);

  return [storedValue, setValue, removeValue] as [StorageValue<T>, typeof setValue, typeof removeValue];
}

// Example usage:
// const { value, setValue, removeValue } = useLocalStorage({
//   key: 'user-preferences',
//   initialValue: { theme: 'light', notifications: true }
// }); 