import { useEffect, useCallback } from 'react';

type KeyCombo = string | string[];
type Handler = (event: KeyboardEvent) => void;

interface UseKeyboardShortcutOptions {
  key: KeyCombo;
  handler: Handler;
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

export function useKeyboardShortcut({
  key,
  handler,
  enabled = true,
  preventDefault = true,
  stopPropagation = false
}: UseKeyboardShortcutOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const keys = Array.isArray(key) ? key : [key];
      const pressedKey = event.key.toLowerCase();

      if (keys.includes(pressedKey)) {
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }
        handler(event);
      }
    },
    [key, handler, enabled, preventDefault, stopPropagation]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [enabled, handleKeyDown]);
}

// Example usage:
// useKeyboardShortcut({
//   key: ['Enter', 'NumpadEnter'],
//   handler: () => {
//     // Handle enter key press
//   },
//   enabled: isFormValid,
//   preventDefault: true
// }); 