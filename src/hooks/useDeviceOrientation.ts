import { useState, useEffect, useCallback } from 'react';

interface DeviceOrientation {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  absolute: boolean;
}

interface UseDeviceOrientationOptions {
  enabled?: boolean;
  requestPermission?: boolean;
}

export function useDeviceOrientation({
  enabled = true,
  requestPermission = false
}: UseDeviceOrientationOptions = {}) {
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false
  });
  const [permission, setPermission] = useState<PermissionState>('prompt');

  const requestOrientationPermission = useCallback(async () => {
    if (!requestPermission) return;

    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent) {
        const result = await (DeviceOrientationEvent as any).requestPermission();
        setPermission(result);
      }
    } catch (error) {
      console.error('Error requesting device orientation permission:', error);
    }
  }, [requestPermission]);

  useEffect(() => {
    if (!enabled) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
        absolute: event.absolute
      });
    };

    // Request permission if needed
    if (requestPermission) {
      requestOrientationPermission();
    }

    // Add event listener
    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [enabled, requestPermission, requestOrientationPermission]);

  return {
    orientation,
    permission,
    requestPermission: requestOrientationPermission
  };
}

// Example usage:
// const { orientation, permission, requestPermission } = useDeviceOrientation({
//   enabled: true,
//   requestPermission: true
// });
//
// // Show permission button if needed
// if (permission === 'prompt') {
//   return (
//     <button onClick={requestPermission}>
//       Enable device orientation
//     </button>
//   );
// }
//
// // Use orientation data
// const { alpha, beta, gamma } = orientation;
// return (
//   <div>
//     <p>Alpha: {alpha}°</p>
//     <p>Beta: {beta}°</p>
//     <p>Gamma: {gamma}°</p>
//   </div>
// ); 