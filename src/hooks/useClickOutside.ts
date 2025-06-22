import { useRef, useEffect } from 'react';

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;

interface UseClickOutsideOptions {
  handler: ClickOutsideHandler;
  enabled?: boolean;
}

export function useClickOutside({
  handler,
  enabled = true
}: UseClickOutsideOptions) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
}

// Example usage:
// const ref = useClickOutside({
//   handler: () => {
//     // Handle click outside
//     setIsOpen(false);
//   },
//   enabled: isOpen
// });
//
// return (
//   <div ref={ref}>
//     {/* Content */}
//   </div>
// ); 