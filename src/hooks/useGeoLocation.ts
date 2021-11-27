import { useState } from 'react';
import {LocationType} from './types/LocationType';


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
    navigator.geolocation.getCurrentPosition(onSuccess);

  return {
    lat: location.coordinates.lat,
    lon: location.coordinates.lon,
  }

}