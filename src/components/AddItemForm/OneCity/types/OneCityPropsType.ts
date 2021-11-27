export type OneCityPropsType = {
  name: string;
  id: number;
  country: string;
  temp: number;
  hum: number;
  press: number;
  feel: number;
  deletCity: (id: number) => void;
  updateCityData: (id: number) => void;
  sec: number | string;
  min: number | string;
  hour: number | string;
};