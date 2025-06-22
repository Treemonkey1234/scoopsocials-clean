import React from 'react';
import { NotificationType } from '../hooks/useNotifications';

interface NotificationProps {
  id: string;
  type: NotificationType;
  message: string;
  onClose: (id: string) => void;
}

const typeStyles: Record<NotificationType, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500'
};

const typeIcons: Record<NotificationType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠'
};

export function Notification({ id, type, message, onClose }: NotificationProps) {
  return (
    <div
      className={`${typeStyles[type]} text-white px-4 py-3 rounded-lg shadow-lg mb-2 flex items-center justify-between transform transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="mr-2 text-lg">{typeIcons[type]}</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close notification"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    type: NotificationType;
    message: string;
  }>;
  onClose: (id: string) => void;
}

export function NotificationContainer({
  notifications,
  onClose
}: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
} 