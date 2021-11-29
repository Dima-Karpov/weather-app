export type CityType = {
  id: number;
  name: string;
  country: string;
  temp: number;
  hum: number;
  press: number;
  feel: number;
  iconId: string;
  vertSpeed: number;
  deg: number;

  hour: number | string,
  min: number | string,
  sec: number | string,
};