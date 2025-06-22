import { useState, useEffect, useCallback, useRef } from 'react';

interface UseWebSocketOptions {
  reconnectAttempts?: number;
  reconnectInterval?: number;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
}

export function useWebSocket(url: string, options: UseWebSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
      reconnectCountRef.current = 0;
      options.onOpen?.();
    };

    ws.onclose = () => {
      setIsConnected(false);
      options.onClose?.();
      if (reconnectCountRef.current < (options.reconnectAttempts ?? 3)) {
        setTimeout(() => {
          reconnectCountRef.current++;
          connect();
        }, options.reconnectInterval ?? 3000);
      }
    };

    ws.onerror = (event) => {
      setError(event);
      options.onError?.(event);
    };

    ws.onmessage = (event) => {
      setLastMessage(event.data);
    };
  }, [url, options]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const send = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    error,
    lastMessage,
    send,
    connect,
    disconnect
  };
} 