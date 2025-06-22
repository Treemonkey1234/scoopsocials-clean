import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
}

interface UseGeolocationOptions {
  enabled?: boolean;
  requestPermission?: boolean;
  watch?: boolean;
  highAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export function useGeolocation({
  enabled = true,
  requestPermission = false,
  watch = false,
  highAccuracy = false,
  timeout = 5000,
  maximumAge = 0
}: UseGeolocationOptions = {}) {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null
  });

  const getCurrentPosition = useCallback(() => {
    if (!enabled || !navigator.geolocation) return;

    setState((prev) => ({ ...prev, loading: true }));

    const options: PositionOptions = {
      enableHighAccuracy: highAccuracy,
      timeout,
      maximumAge
    };

    const successCallback = (position: GeolocationPosition) => {
      setState({
        loading: false,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timestamp: position.timestamp,
        error: null
      });
    };

    const errorCallback = (error: GeolocationPositionError) => {
      setState((prev) => ({
        ...prev,
        loading: false,
        error
      }));
    };

    if (watch) {
      return navigator.geolocation.watchPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    }
  }, [enabled, highAccuracy, maximumAge, timeout, watch]);

  useEffect(() => {
    let watchId: number | undefined;

    if (enabled) {
      watchId = getCurrentPosition();
    }

    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [enabled, getCurrentPosition]);

  return state;
}

// Example usage:
// const {
//   loading,
//   latitude,
//   longitude,
//   accuracy,
//   error
// } = useGeolocation({
//   enabled: true,
//   watch: true,
//   highAccuracy: true
// });
//
// if (loading) {
//   return <div>Loading location...</div>;
// }
//
// if (error) {
//   return <div>Error: {error.message}</div>;
// }
//
// return (
//   <div>
//     <p>Latitude: {latitude}</p>
//     <p>Longitude: {longitude}</p>
//     <p>Accuracy: {accuracy} meters</p>
//   </div>
// ); 