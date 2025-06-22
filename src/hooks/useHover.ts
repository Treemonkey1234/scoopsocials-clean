import { useRef, useState, useCallback } from 'react';

export function useHover<T extends HTMLElement>() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T | null>(null);

  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  const callbackRef = useCallback((node: T | null) => {
    if (ref.current) {
      ref.current.removeEventListener('mouseenter', onMouseEnter);
      ref.current.removeEventListener('mouseleave', onMouseLeave);
    }
    if (node) {
      node.addEventListener('mouseenter', onMouseEnter);
      node.addEventListener('mouseleave', onMouseLeave);
    }
    ref.current = node;
  }, [onMouseEnter, onMouseLeave]);

  return [callbackRef, hovered] as const;
} 