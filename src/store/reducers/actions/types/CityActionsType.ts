import {addCity, addCurrentCity, deleteCity, loadingCities} from "../cityAction";

export type CityActionsType =
  ReturnType<typeof addCurrentCity>
  | ReturnType<typeof addCity>
  | ReturnType<typeof deleteCity>
  | ReturnType<typeof loadingCities>