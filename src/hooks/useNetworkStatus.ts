import { useState, useEffect } from 'react';

interface NetworkStatus {
  online: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    online: navigator.onLine
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection;
      const newStatus: NetworkStatus = {
        online: navigator.onLine
      };

      if (connection) {
        newStatus.effectiveType = connection.effectiveType;
        newStatus.downlink = connection.downlink;
        newStatus.rtt = connection.rtt;
        newStatus.saveData = connection.saveData;
      }

      setStatus(newStatus);
    };

    // Initial status
    updateNetworkStatus();

    // Add event listeners
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Network Information API events
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return status;
}

// Example usage:
// const { online, effectiveType, downlink, rtt, saveData } = useNetworkStatus();
//
// // Show offline indicator
// if (!online) {
//   return <div>You are offline</div>;
// }
//
// // Adjust quality based on connection
// const videoQuality = effectiveType === '4g' ? 'high' : 'low';
//
// // Show connection info
// return (
//   <div>
//     <p>Connection type: {effectiveType}</p>
//     <p>Download speed: {downlink} Mbps</p>
//     <p>Round-trip time: {rtt} ms</p>
//     <p>Data saver: {saveData ? 'enabled' : 'disabled'}</p>
//   </div>
// ); 