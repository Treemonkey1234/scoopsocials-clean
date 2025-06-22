import { useState, useCallback } from 'react';

interface UseFileSystemOptions {
  onError?: (error: Error) => void;
}

export function useFileSystem(options: UseFileSystemOptions = {}) {
  const [error, setError] = useState<Error | null>(null);

  const readFile = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => {
        const error = new Error('Failed to read file');
        setError(error);
        options.onError?.(error);
        reject(error);
      };
      reader.readAsText(file);
    });
  }, [options]);

  const writeFile = useCallback(async (content: string, fileName: string): Promise<void> => {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to write file');
      setError(error);
      options.onError?.(error);
      throw error;
    }
  }, [options]);

  const deleteFile = useCallback(async (file: File): Promise<void> => {
    try {
      // Note: Browser JavaScript cannot directly delete files from the user's system.
      // This is a placeholder for future implementation if needed.
      throw new Error('File deletion not supported in browser environment');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete file');
      setError(error);
      options.onError?.(error);
      throw error;
    }
  }, [options]);

  return {
    error,
    readFile,
    writeFile,
    deleteFile
  };
} 