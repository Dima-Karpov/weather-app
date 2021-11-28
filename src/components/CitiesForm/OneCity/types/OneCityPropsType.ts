export type OneCityPropsType = {
  name: string;
  id: number;
  country: string;
  temp: number;
  hum: number;
  press: number;
  feel: number;
  iconId: string;
  vertSpeed: number;
  deg: number
  deletCity: (id: number) => void;
  updateCityData: (id: number) => void;
    hour: string | number;
    min: string | number;
    sec: string | number;
}