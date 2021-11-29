import { cityAPI } from '../../api/apiService';
import { CityType } from '../../api/types/CityType';

import { addCity, addCurrentCity, updateCity } from './actions/cityAction';
import { CityActionsType } from './actions/types/CityActionsType';

import { AppThunk } from '../store';
import {setStatus} from './actions/appAction';

const initialState = {
  cities: [],
};
type InitialStateType = {
  cities: CityType[];
};

export const citiesReducer = (
  state: InitialStateType = initialState,
  action: CityActionsType): InitialStateType => {
  switch (action.type) {
    case 'city/ADD-CURRENT-CITY': {
      if (state.cities.find(({id}) => id === action.newCity.id)) {
        return { ...state };
      }
      const copyCities = [...state.cities, action.newCity];
      return {
        ...state,
        cities: copyCities,
      };
    };

    case 'city/ADD-CITY': {
      if (state.cities.find(({id}) => id === action.newCity.id)) {
        return {
          ...state,
        };
      };
      const copyCities: CityType[] = [...state.cities, action.newCity];
      return {
        ...state,
        cities: copyCities,
      }
    };

    case 'city/UDATE-CITY':
      if (state.cities.find(({id}) => id === action.city.id)) {
        return (
          {
            ...state,
            cities: state.cities.map(city => (city.id === action.city.id) ? action.city : city)
          }
        )
      }
      return state;

    case 'city/DELETE-CITY':
      const newCities = state.cities.filter((city) => action.id !== city.id);
      return {
        ...state,
        cities: newCities,
      };
   
    default:
      return state;
  };
};


// thunks
export const GetCityTC = (cityName: string, sec: number | string, min: number | string, hour: number | string): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    const res = await cityAPI.getWeatherByName(cityName);

    if (res.data.cod === 404 || res.data.cod === 400) {
      console.log('input error');
    } else {
      dispatch(addCity({
        id: res.data.id,
        name: res.data.name,
        country: res.data.sys.country,
        temp: res.data.main.temp,
        hum: res.data.main.humidity,
        press: res.data.main.pressure,
        feel: res.data.main.feels_like,
        iconId: res.data.weather[0].icon,
        vertSpeed: res.data.wind.speed,
        deg: res.data.wind.deg,
        hour: hour,
        min: min,
        sec: sec,
      }));
      dispatch(setStatus('succeeded'));
    };
  } catch (e: any) {
    const error = e.res ? e.res.data.error : (e.message + ', Problem - coordinates not found');
    console.log(error);
    dispatch(setStatus('failed'));
  }
};

export const GetCityIdTC = (cityId: number, sec: number | string, min: number | string, hour: number | string): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    const res = await cityAPI.getWeatherById(cityId)
    if (res.data.cod === 404 || res.data.cod === 400) {
      console.log('input error')
    } else {
      dispatch(updateCity({
        id: res.data.id,
        name: res.data.name,
        country: res.data.sys.country,
        temp: res.data.main.temp,
        hum: res.data.main.humidity,
        press: res.data.main.pressure,
        feel: res.data.main.feels_like,
        iconId: res.data.weather[0].icon,
        vertSpeed: res.data.wind.speed,
        deg: res.data.wind.deg,
        hour: hour,
        min: min,
        sec: sec,
      }));
    }
    dispatch(setStatus('succeeded'));
  } catch (e: any) {
    const error = e.res ? e.res.data.error : (e.message + ', Problem - coordinates not found');
    console.log(error);
    dispatch(setStatus('failed'));
  }
};

export const AddCurrentCityTC = (lat: number, lon: number, sec: number | string, min: number | string, hour: number | string): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    const res = await cityAPI.getWeatherByCoordinates(lat, lon)
    dispatch(addCurrentCity({
      id: res.data.id,
      name: res.data.name,
      country: res.data.sys.country,
      temp: res.data.main.temp,
      hum: res.data.main.humidity,
      press: res.data.main.pressure,
      feel: res.data.main.feels_like,
      iconId: res.data.weather[0].icon,
      vertSpeed: res.data.wind.speed,
      deg: res.data.wind.deg,
      hour: hour,
      min: min,
      sec: sec,
    }));
    dispatch(setStatus('succeeded'));
  } catch (e: any) {
    const error = e.res ? e.res.data.error : (e.message + ', Problem - coordinates not found');
    console.log(error);
    dispatch(setStatus('failed'));
  }
};

export const UpdateCityTC = (sec: number | string, min: number | string, hour: number | string): AppThunk => async (dispatch, getState) => {
  const res: any = [];
  const state = getState().cities.cities;
  const cityId: number[] = state.map(city => city.id);
  try {
    dispatch(setStatus('loading'));
    cityId.forEach(async (elem) => {
      await cityAPI.getWeatherById(elem)
    });
    if (res.data.cod === 404 || res.data.cod === 400) {
      console.log('input error')
    } else {
      dispatch(updateCity({
        id: res.data.id,
        name: res.data.name,
        country: res.data.sys.country,
        temp: res.data.main.temp,
        hum: res.data.main.humidity,
        press: res.data.main.pressure,
        feel: res.data.main.feels_like,
        iconId: res.data.weather[0].icon,
        vertSpeed: res.data.wind.speed,
        deg: res.data.wind.deg,
        hour: hour,
        min: min,
        sec: sec,
      }));
      dispatch(setStatus('succeeded'));
    }
  } catch (e: any) {
    const error = e.res ? e.res.data.error : (e.message + ', Problem - coordinates not found');
    console.log(error);
    dispatch(setStatus('failed'));
  }
};