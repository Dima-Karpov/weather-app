import axios from 'axios'

const KEY_URL = 'b702314ab6fb64cab3519c6f2aa8fa23';
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
  getWeatherByName(cityName: string){
    return instance.get<ResponseCityType>(`?q=${ cityName }&appid=${ KEY_URL}`)
  },
  getWeatherByCoordinates(lat: number, lon: number){
    return instance.get(`?lat=${ lat }&lon=${ lon }&appid=${ KEY_URL }`)
  }
};



export type ResponseCityType = {
  base: string
  clouds: {
    all: number
  }
  all: number
  cod: number
  coord: {
    lon: number,
    lat: number
  }
  dt: number
  id: number
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  }
  name: string
  sys: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
  }
  timezone: number
  visibility: number
  weather:
  [
    {
      id: number, main: string, description: string, icon: string
    }
  ]
  0:
  {
    id: number,
    main: string,
    description: string,
    icon: string
  }
  wind: {
    speed: number,
    deg: number,
    gust: number
  }
};
export type CityType = {
  id: number
  name: string
  country: string,
  temp: number,
  hum: number
  press: number,
  feel: number,
}