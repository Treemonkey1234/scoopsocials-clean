import { useRef, useEffect, useCallback } from 'react';

interface UseKeyboardFocusOptions {
  enabled?: boolean;
  onEscape?: () => void;
  focusFirstElement?: boolean;
}

export function useKeyboardFocus({
  enabled = true,
  onEscape,
  focusFirstElement = true
}: UseKeyboardFocusOptions = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => {
      return (
        !element.hasAttribute('disabled') &&
        !element.hasAttribute('hidden') &&
        element.offsetParent !== null
      );
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || !containerRef.current) return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const currentElement = document.activeElement as HTMLElement;

      if (event.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (currentElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (currentElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [enabled, getFocusableElements, onEscape]
  );

  useEffect(() => {
    if (!enabled) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the first element if requested
    if (focusFirstElement) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus when unmounting
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [enabled, focusFirstElement, getFocusableElements, handleKeyDown]);

  return containerRef;
}

// Example usage:
// const ref = useKeyboardFocus({
//   enabled: isOpen,
//   onEscape: () => setIsOpen(false),
//   focusFirstElement: true
// });
//
// return (
//   <div ref={ref}>
//     {/* Focusable content */}
//   </div>
// ); 