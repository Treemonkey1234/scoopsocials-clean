import { useEffect, useRef } from 'react';

export function useFocusTrap(active: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const focusableSelectors = [
      'a[href]', 'button', 'textarea', 'input', 'select', '[tabindex]:not([tabindex="-1"])'
    ];
    const focusableEls = ref.current.querySelectorAll<HTMLElement>(focusableSelectors.join(','));
    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    ref.current.addEventListener('keydown', handleKeyDown);
    return () => {
      ref.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);

  return ref;
} 