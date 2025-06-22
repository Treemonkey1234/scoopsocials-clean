import { useState, useEffect, useCallback } from 'react';

type OrientationType = 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary' | 'natural' | 'any';

interface ScreenOrientation {
  type: OrientationType;
  angle: number;
  locked: boolean;
}

interface UseScreenOrientationOptions {
  lockOnMount?: boolean;
  defaultOrientation?: OrientationType;
}

export function useScreenOrientation({
  lockOnMount = false,
  defaultOrientation = 'any'
}: UseScreenOrientationOptions = {}) {
  const [orientation, setOrientation] = useState<ScreenOrientation>({
    type: 'any',
    angle: 0,
    locked: false
  });
  const [error, setError] = useState<Error | null>(null);

  const updateOrientation = useCallback(() => {
    if (!screen.orientation) {
      setError(new Error('Screen Orientation API not supported'));
      return;
    }

    setOrientation({
      type: screen.orientation.type as OrientationType,
      angle: screen.orientation.angle,
      locked: false // Default to false since locked property is not available
    });
  }, []);

  const lock = useCallback(async (type: OrientationType = defaultOrientation) => {
    if (!screen.orientation) {
      setError(new Error('Screen Orientation API not supported'));
      return;
    }

    try {
      // @ts-ignore - screen.orientation.lock exists but TypeScript doesn't know about it
      await screen.orientation.lock(type);
      setOrientation(prev => ({ ...prev, locked: true }));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to lock orientation'));
    }
  }, [defaultOrientation]);

  const unlock = useCallback(async () => {
    if (!screen.orientation) {
      setError(new Error('Screen Orientation API not supported'));
      return;
    }

    try {
      // @ts-ignore - screen.orientation.unlock exists but TypeScript doesn't know about it
      await screen.orientation.unlock();
      setOrientation(prev => ({ ...prev, locked: false }));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to unlock orientation'));
    }
  }, []);

  useEffect(() => {
    if (!screen.orientation) {
      setError(new Error('Screen Orientation API not supported'));
      return;
    }

    // Initial orientation
    updateOrientation();

    // Lock on mount if requested
    if (lockOnMount) {
      lock();
    }

    // Add event listener
    // @ts-ignore - screen.orientation.addEventListener exists but TypeScript doesn't know about it
    screen.orientation.addEventListener('change', updateOrientation);

    return () => {
      // @ts-ignore - screen.orientation.removeEventListener exists but TypeScript doesn't know about it
      screen.orientation.removeEventListener('change', updateOrientation);
      // Unlock on unmount if locked
      if (orientation.locked) {
        unlock();
      }
    };
  }, [lock, lockOnMount, orientation.locked, unlock, updateOrientation]);

  return {
    orientation,
    lock,
    unlock,
    error
  };
}

// Example usage:
// const {
//   orientation,
//   lock,
//   unlock,
//   error
// } = useScreenOrientation({
//   lockOnMount: true,
//   defaultOrientation: 'landscape-primary'
// });
//
// // Lock to portrait
// const handleLockPortrait = () => {
//   lock('portrait-primary');
// };
//
// // Lock to landscape
// const handleLockLandscape = () => {
//   lock('landscape-primary');
// };
//
// // Unlock
// const handleUnlock = () => {
//   unlock();
// };
//
// return (
//   <div>
//     <p>Type: {orientation.type}</p>
//     <p>Angle: {orientation.angle}°</p>
//     <p>Locked: {orientation.locked ? 'Yes' : 'No'}</p>
//     <button onClick={handleLockPortrait}>Lock Portrait</button>
//     <button onClick={handleLockLandscape}>Lock Landscape</button>
//     <button onClick={handleUnlock}>Unlock</button>
//     {error && <p>Error: {error.message}</p>}
//   </div>
// ); 