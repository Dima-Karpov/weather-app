
import { useState, useEffect } from 'react';

type LocationType = {
  coordinates: {lat: number, lon: number}
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>({
    coordinates: {lat: 0, lon: 0,},
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      coordinates: {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      },
    });
  };

  // useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  // }, [location]);

  return {
    lat: location.coordinates.lat,
    lon: location.coordinates.lon,
  }

}