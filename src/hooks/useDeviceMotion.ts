import { useState, useEffect, useCallback } from 'react';

interface DeviceMotion {
  acceleration: {
    x: number | null;
    y: number | null;
    z: number | null;
  };
  accelerationIncludingGravity: {
    x: number | null;
    y: number | null;
    z: number | null;
  };
  rotationRate: {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
  };
  interval: number;
}

interface UseDeviceMotionOptions {
  enabled?: boolean;
  requestPermission?: boolean;
}

export function useDeviceMotion({
  enabled = true,
  requestPermission = false
}: UseDeviceMotionOptions = {}) {
  const [motion, setMotion] = useState<DeviceMotion>({
    acceleration: { x: null, y: null, z: null },
    accelerationIncludingGravity: { x: null, y: null, z: null },
    rotationRate: { alpha: null, beta: null, gamma: null },
    interval: 0
  });
  const [permission, setPermission] = useState<PermissionState>('prompt');

  const requestMotionPermission = useCallback(async () => {
    if (!requestPermission) return;

    try {
      if (typeof DeviceMotionEvent !== 'undefined' && 'requestPermission' in DeviceMotionEvent) {
        const result = await (DeviceMotionEvent as any).requestPermission();
        setPermission(result);
      }
    } catch (error) {
      console.error('Error requesting device motion permission:', error);
    }
  }, [requestPermission]);

  useEffect(() => {
    if (!enabled) return;

    const handleMotion = (event: DeviceMotionEvent) => {
      setMotion({
        acceleration: {
          x: event.acceleration?.x ?? null,
          y: event.acceleration?.y ?? null,
          z: event.acceleration?.z ?? null
        },
        accelerationIncludingGravity: {
          x: event.accelerationIncludingGravity?.x ?? null,
          y: event.accelerationIncludingGravity?.y ?? null,
          z: event.accelerationIncludingGravity?.z ?? null
        },
        rotationRate: {
          alpha: event.rotationRate?.alpha ?? null,
          beta: event.rotationRate?.beta ?? null,
          gamma: event.rotationRate?.gamma ?? null
        },
        interval: event.interval
      });
    };

    // Request permission if needed
    if (requestPermission) {
      requestMotionPermission();
    }

    // Add event listener
    window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [enabled, requestPermission, requestMotionPermission]);

  return {
    motion,
    permission,
    requestPermission: requestMotionPermission
  };
}

// Example usage:
// const { motion, permission, requestPermission } = useDeviceMotion({
//   enabled: true,
//   requestPermission: true
// });
//
// // Show permission button if needed
// if (permission === 'prompt') {
//   return (
//     <button onClick={requestPermission}>
//       Enable device motion
//     </button>
//   );
// }
//
// // Use motion data
// const { acceleration, rotationRate } = motion;
// return (
//   <div>
//     <h3>Acceleration</h3>
//     <p>X: {acceleration.x} m/s²</p>
//     <p>Y: {acceleration.y} m/s²</p>
//     <p>Z: {acceleration.z} m/s²</p>
//
//     <h3>Rotation Rate</h3>
//     <p>Alpha: {rotationRate.alpha}°/s</p>
//     <p>Beta: {rotationRate.beta}°/s</p>
//     <p>Gamma: {rotationRate.gamma}°/s</p>
//   </div>
// ); 