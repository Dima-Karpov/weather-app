import {FC, useCallback, useEffect} from 'react';
import s from './CitiesFrom.module.css';

import {useDispatch, useSelector} from 'react-redux';

import {useGeoLocation} from '../../hooks/useGeoLocation';
import {addCity, deleteCity} from '../../store/reducers/actions/cityAction';

import {AddCurrentCityTC, GetCityIdTC, GetCityTC} from '../../store/reducers/cities-reducers';
import {AppStoreType} from '../../store/reducers/store';

import {AddItemForm} from '../AddItemForm/AddItemForm';
import {OneCity} from './../AddItemForm/OneCity/OneCity';
import {CityType} from '../../api/types/CityType';

export const CitiesForm: FC = () => {
  const dispatch = useDispatch();
  const cities = useSelector<AppStoreType, CityType[]>(state => state.cities.cities);
  const {lat, lon} = useGeoLocation();

  const getCity = useCallback((city: string) => dispatch(GetCityTC(city)), [dispatch]);

  const deleteExtraCity = useCallback((id: number) => {
    const newCities = cities.filter((city) => id !== city.id);
    localStorage.setItem('cities', JSON.stringify(newCities));
    dispatch(deleteCity(id));
  }, [dispatch]);

  const updateCityData = useCallback((id: number) => dispatch(GetCityIdTC(id)), [dispatch]);

  const citiesMap = cities.map((city) => cities.length === 0
    ? (<div className={s.message}>You have no saved cities</div>)
    :
    <OneCity
      name={city.name}
      id={city.id}
      country={city.country}
      temp={city.temp}
      hum={city.hum}
      press={city.press}
      feel={city.feel}
      deletCity={deleteExtraCity}
      updateCityData={updateCityData}
    />
  );

  useEffect(() => {
    dispatch(AddCurrentCityTC(lat, lon));
    cities.length && localStorage.setItem('cities', JSON.stringify(cities));
    const citiesFromLocalStorage = JSON.parse(localStorage.getItem('cities')!);
    if (citiesFromLocalStorage)
    {
      citiesFromLocalStorage.forEach((city: CityType) => dispatch(addCity(city)));
    }
  }, [cities]);

  // useInterval(() => {
  //    updateData()
  // }, 5000);

  return (
    <div>
      <AddItemForm getCity={getCity} />
      <div>
        {citiesMap}
      </div>
    </div>
  )
}