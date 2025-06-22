import { useState, useCallback, useRef, useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface UseNotificationsOptions {
  maxNotifications?: number;
  defaultDuration?: number;
}

export function useNotifications({
  maxNotifications = 3,
  defaultDuration = 3000
}: UseNotificationsOptions = {}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const queue = useRef<Notification[]>([]);

  const addNotification = useCallback(
    (type: NotificationType, message: string, duration = defaultDuration) => {
      const id = Math.random().toString(36).substr(2, 9);
      const notification: Notification = { id, type, message, duration };

      setNotifications((prev) => {
        if (prev.length >= maxNotifications) {
          queue.current.push(notification);
          return prev;
        }
        return [...prev, notification];
      });

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
    },
    [maxNotifications, defaultDuration]
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const filtered = prev.filter((n) => n.id !== id);
      if (queue.current.length > 0 && filtered.length < maxNotifications) {
        const next = queue.current.shift();
        if (next) {
          return [...filtered, next];
        }
      }
      return filtered;
    });
  }, [maxNotifications]);

  const clearAll = useCallback(() => {
    setNotifications([]);
    queue.current = [];
  }, []);

  // Success notification helper
  const success = useCallback(
    (message: string, duration?: number) => {
      addNotification('success', message, duration);
    },
    [addNotification]
  );

  // Error notification helper
  const error = useCallback(
    (message: string, duration?: number) => {
      addNotification('error', message, duration);
    },
    [addNotification]
  );

  // Info notification helper
  const info = useCallback(
    (message: string, duration?: number) => {
      addNotification('info', message, duration);
    },
    [addNotification]
  );

  // Warning notification helper
  const warning = useCallback(
    (message: string, duration?: number) => {
      addNotification('warning', message, duration);
    },
    [addNotification]
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    info,
    warning
  };
} 