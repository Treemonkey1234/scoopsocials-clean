import { useRef, useCallback, useEffect } from 'react';

type EasingFunction = (t: number) => number;

interface AnimationOptions {
  duration: number;
  easing?: EasingFunction;
  onComplete?: () => void;
}

// Common easing functions
export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
};

export function useAnimation({
  duration,
  easing = easings.linear,
  onComplete
}: AnimationOptions) {
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const animate = useCallback(
    (callback: (progress: number) => void) => {
      const startTime = startTimeRef.current ?? performance.now();
      startTimeRef.current = startTime;

      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);

        callback(easedProgress);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(update);
        } else {
          onComplete?.();
        }
      };

      frameRef.current = requestAnimationFrame(update);
    },
    [duration, easing, onComplete]
  );

  const stop = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }
    startTimeRef.current = undefined;
  }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    animate,
    stop
  };
}

// Example usage:
// const { animate, stop } = useAnimation({
//   duration: 1000,
//   easing: easings.easeInOutQuad,
//   onComplete: () => console.log('Animation complete')
// });
//
// // Animate a value from 0 to 100
// animate((progress) => {
//   const value = progress * 100;
//   element.style.transform = `translateX(${value}px)`;
// }); 