import {CityType} from "../../../api/types/CityType";

export const addCurrentCity = (newCity: CityType) =>
  ({ type: 'city/ADD-CURRENT-CITY', newCity } as const);

export const addCity = (newCity: CityType) =>
  ({ type: 'city/ADD-CITY', newCity } as const);

export const deleteCity = (id: number) => ({ type: 'city/DELETE-CITY', id } as const);

export const loadingCities = () => ({ type: 'city/LOADING-CITIES' } as const);
