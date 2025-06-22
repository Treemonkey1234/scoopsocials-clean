import { useState, useCallback, useEffect } from 'react';

interface UseIndexedDBOptions {
  dbName: string;
  version?: number;
  stores: { name: string; keyPath: string; autoIncrement?: boolean }[];
}

export function useIndexedDB(options: UseIndexedDBOptions) {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const open = useCallback(() => {
    const request = indexedDB.open(options.dbName, options.version ?? 1);

    request.onerror = (event) => {
      setError(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = (event) => {
      setDb((event.target as IDBOpenDBRequest).result);
      setError(null);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      options.stores.forEach((store) => {
        if (!db.objectStoreNames.contains(store.name)) {
          db.createObjectStore(store.name, {
            keyPath: store.keyPath,
            autoIncrement: store.autoIncrement ?? false
          });
        }
      });
    };
  }, [options]);

  const close = useCallback(() => {
    if (db) {
      db.close();
      setDb(null);
    }
  }, [db]);

  const add = useCallback(<T>(storeName: string, data: T): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not open'));
        return;
      }

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(data);
      request.onerror = () => reject(new Error('Failed to add data'));
    });
  }, [db]);

  const get = useCallback(<T>(storeName: string, key: string | number): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not open'));
        return;
      }

      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get data'));
    });
  }, [db]);

  const update = useCallback(<T>(storeName: string, data: T): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not open'));
        return;
      }

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(data);
      request.onerror = () => reject(new Error('Failed to update data'));
    });
  }, [db]);

  const remove = useCallback((storeName: string, key: string | number): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not open'));
        return;
      }

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete data'));
    });
  }, [db]);

  useEffect(() => {
    open();
    return () => {
      close();
    };
  }, [open, close]);

  return {
    db,
    error,
    add,
    get,
    update,
    remove
  };
} 