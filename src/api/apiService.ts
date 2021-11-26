import axios from 'axios'
import {ResponseCityType} from './types/ResponseCityType';

// const KEY_URL = 'b702314ab6fb64cab3519c6f2aa8fa23';
const KEY_URL = '15860a445514fbd8dd267901c057961c';
// export const getWeatherByName = (cityName: string): Promise<any> => fetch
//   (`https://api.openweathermap.org/data/2.5/weather?q=${ cityName }&appid=${ KEY_URL }`,)
//     .then((responce) => responce.json())
//     .catch((error) => console.log(error, 'Problem - name not found'));

// export const getWeatherByCoordinates = (lat: any, lon: any): Promise<any> => fetch
//   (`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ KEY_URL }`,)
//     .then((response) => response.json())
//     .catch((error) => console.log(error, 'Problem - coordinates not found'));


// https://cors-anywhere.herokuapp.com/

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  withCredentials: true,
});

export const cityAPI = {
  getWeatherByName(cityName: string) {
    return instance.get<ResponseCityType>(`?q=${ cityName }&appid=${ KEY_URL }`);
  },
  getWeatherByCoordinates(lat: number, lon: number) {
    return instance.get<ResponseCityType>(`?lat=${ lat }&lon=${ lon }&appid=${ KEY_URL }`);
  },
  getWeatherById(cityId: number) {
    return instance.get<ResponseCityType>(`?id=${ cityId }&appid=${ KEY_URL }`);
  },
};
