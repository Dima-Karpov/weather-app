
import {cityAPI, CityType} from '../../api/apiService';
import {addCity} from './actions/cityAction';
import { CityActionsType } from './actions/types/CityActionsType';
import {AppThunk} from './store';

const initialState = {
  cities: [
   { id: 8939,
    name: "Minsk", 
    country: "BY",
    temp: 274.01,
    hum: 88,
    press: 1008,
    feel: 268.8,}
  ] as CityType[],
  loading: false,
  cityShown: false,
  geolocalised: true,
};
type InitialStateType = typeof initialState;

export const CitiesReducers = (
  state: InitialStateType = initialState,
  action: CityActionsType): InitialStateType => {    
  switch (action.type) {
    case 'city/ADD-CURRENT-CITY': {
      if (state.cities.find(({ id }) => id === action.newCity.id)) {
        return {
          ...state, geolocalised: true
        };
      } 
        const copyCities = [...state.cities, action.newCity];
        localStorage.setItem('cities', JSON.stringify(copyCities));
        return {
          ...state,
          cities: copyCities,
          loading: false,
          cityShown: false,
        };
      }
    case 'city/ADD-CITY': {
      debugger
      if (state.cities.find(({ id }) => id === action.newCity.id)) {
        return {
          ...state,
          cityShown: true,
        };
      } 
      const copyCities: CityType[] = [...state.cities, action.newCity];
        localStorage.setItem('cities', JSON.stringify(copyCities));
        return {
          ...state,
          cities: copyCities,
          loading: false,
          cityShown: false,
      }
    }
    case 'city/DELETE-CITY':
      const newCities = state.cities.filter((city) => action.id !== city.id);
      localStorage.setItem('cities', JSON.stringify(newCities));
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
export const GetCityTC = (cityName: any): AppThunk => async (dispatch) => {
  try
  {
    // dispatch(setAppStatusAC('loading'));
    const res = await cityAPI.getWeatherByName(cityName.name)
    if(res.data.cod === 404 || res.data.cod === 400){
      console.log('input error')
    } else{
      dispatch(addCity({
        id: res.data.sys.id,
        name: res.data.name,
        country: res.data.sys.country,
        temp: res.data.main.temp,
        hum: res.data.main.humidity,
        press: res.data.main.pressure,
        feel: res.data.main.feels_like,
      }))
    }
    
    // dispatch(setAppStatusAC('succeeded'));
  } catch (e: any) {
    const error = e.res ? e.res.data.error : (e.message + ', Problem - coordinates not found');
    console.log(error);
    // dispatch(setAppStatusAC("failed"));
  }
};