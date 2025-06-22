import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function usePortal(id = 'portal-root') {
  const rootElemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let portalRoot = document.getElementById(id);
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.setAttribute('id', id);
      document.body.appendChild(portalRoot);
    }
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    portalRoot.appendChild(rootElemRef.current);
    return () => {
      if (rootElemRef.current) {
        portalRoot?.removeChild(rootElemRef.current);
      }
    };
  }, [id]);

  function Portal({ children }: { children: React.ReactNode }) {
    return rootElemRef.current ? createPortal(children, rootElemRef.current) : null;
  }

  return Portal;
} 