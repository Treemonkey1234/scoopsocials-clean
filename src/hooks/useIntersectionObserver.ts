import { useRef, useEffect, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  enabled?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  enabled = true
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<Element | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    },
    []
  );

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      root,
      rootMargin
    });

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [enabled, handleIntersection, root, rootMargin, threshold]);

  const setRef = useCallback((element: Element | null) => {
    elementRef.current = element;
  }, []);

  return {
    ref: setRef,
    isIntersecting,
    entry
  };
}

// Example usage:
// const { ref, isIntersecting, entry } = useIntersectionObserver({
//   threshold: [0, 0.5, 1],
//   rootMargin: '50px',
//   enabled: true
// });
//
// // Lazy loading images
// useEffect(() => {
//   if (isIntersecting && imgRef.current) {
//     imgRef.current.src = imgRef.current.dataset.src;
//   }
// }, [isIntersecting]);
//
// // Infinite scroll
// useEffect(() => {
//   if (isIntersecting) {
//     loadMore();
//   }
// }, [isIntersecting]); 