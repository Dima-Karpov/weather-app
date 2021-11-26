import {cityAPI} from '../../api/apiService';
import {CityType} from '../../api/types/CityType';
import {addCity, addCurrentCity} from './actions/cityAction';
import {CityActionsType} from './actions/types/CityActionsType';
import {AppThunk} from './store';

const initialState = {
  cities: [] as CityType[],
  loading: false,
  cityShown: false,
  geolocalised: true,
};
type InitialStateType = typeof initialState;

export const CitiesReducers = (
  state: InitialStateType = initialState,
  action: CityActionsType): InitialStateType => {
  switch (action.type)
  {
    case 'city/ADD-CURRENT-CITY': {
      if (state.cities.find(({id}) => id === action.newCity.id))
      {
        return {
          ...state, geolocalised: true
        };
      }
      const copyCities = [...state.cities, action.newCity];
      return {
        ...state,
        cities: copyCities,
        loading: false,
        cityShown: false,
      };
    }
    case 'city/ADD-CITY': {
      debugger
      if (state.cities.find(({id}) => id === action.newCity.id))
      {
        return {
          ...state,
          cityShown: true,
        };
      }
      const copyCities: CityType[] = [...state.cities, action.newCity];
      return {
        ...state,
        cities: copyCities,
        loading: false,
        cityShown: false,
      }
    }
    case 'city/DELETE-CITY':
      const newCities = state.cities.filter((city) => action.id !== city.id);
      return {
        ...state,
        cities: newCities,
        cityShown: false,
      };

    case 'city/LOADING-CITIES':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};


// thunks
export const GetCityTC = (cityName: string): AppThunk => async (dispatch) => {
  try
  {
    // dispatch(setAppStatusAC('loading'));
    const res = await cityAPI.getWeatherByName(cityName)
    if (res.data.cod === 404 || res.data.cod === 400)
    {
      console.log('input error')
    } else
    {
      dispatch(addCity({
        id: res.data.id,
        name: res.data.name,
        country: res.data.sys.country,
        temp: res.data.main.temp,
        hum: res.data.main.humidity,
        press: res.data.main.pressure,
        feel: res.data.main.feels_like,
      }))
    }

    // dispatch(setAppStatusAC('succeeded'));
  } catch (e: any)
  {
    const error = e.res ? e.res.data.error : (e.message + ', Problem - coordinates not found');
    console.log(error);
    // dispatch(setAppStatusAC("failed"));
  }
};
export const GetCityIdTC = (cityId: number): AppThunk => async (dispatch) => {
  try
  {
    // dispatch(setAppStatusAC('loading'));
    const res = await cityAPI.getWeatherById(cityId)
    if (res.data.cod === 404 || res.data.cod === 400)
    {
      console.log('input error')
    } else
    {
      dispatch(addCity({
        id: res.data.id,
        name: res.data.name,
        country: res.data.sys.country,
        temp: res.data.main.temp,
        hum: res.data.main.humidity,
        press: res.data.main.pressure,
        feel: res.data.main.feels_like,
      }));
    }

    // dispatch(setAppStatusAC('succeeded'));
  } catch (e: any)
  {
    const error = e.res ? e.res.data.error : (e.message + ', Problem - coordinates not found');
    console.log(error);
    // dispatch(setAppStatusAC("failed"));
  }
};
export const AddCurrentCityTC = (lat: number, lon: number): AppThunk => async (dispatch) => {
  try
  {
    // dispatch(setAppStatusAC('loading'));
    const res = await cityAPI.getWeatherByCoordinates(lat, lon)
    dispatch(addCurrentCity({
      id: res.data.id,
      name: res.data.name,
      country: res.data.sys.country,
      temp: res.data.main.temp,
      hum: res.data.main.humidity,
      press: res.data.main.pressure,
      feel: res.data.main.feels_like,
    }))

    // dispatch(setAppStatusAC('succeeded'));
  } catch (e: any)
  {
    const error = e.res ? e.res.data.error : (e.message + ', Problem - coordinates not found');
    console.log(error);
    // dispatch(setAppStatusAC("failed"));
  }
};