import {FC, useCallback, useEffect} from 'react';
import s from './CitiesFrom.module.css';

import {useDispatch, useSelector} from 'react-redux';
import {useGeoLocation} from '../../hooks/useGeoLocation';

import {addCity, deleteCity} from '../../store/reducers/actions/cityAction';
import {AddCurrentCityTC, GetCityIdTC, GetCityTC, UpdateCityTC} from '../../store/reducers/cities-reducers';
import {AppStoreType} from '../../store/reducers/store';

import {AddItemForm} from '../AddItemForm/AddItemForm';
import {OneCity} from './../AddItemForm/OneCity/OneCity';

import {CityType} from '../../api/types/CityType';

export const CitiesForm: FC = () => {
  const dispatch = useDispatch();
  const cities = useSelector<AppStoreType, CityType[]>(state => state.cities.cities);
  const citiId = useSelector<AppStoreType, number | undefined>(state => state.cities.cities.find(city => city.id)?.id);
  const {lat, lon} = useGeoLocation();

  const getCity = useCallback((city: string) => dispatch(GetCityTC(city)), [dispatch]);

  const deleteExtraCity = useCallback((id: number) => {
    const newCities = cities.filter((city) => id !== city.id);
    localStorage.setItem('cities', JSON.stringify(newCities));
    dispatch(deleteCity(id));
  }, [dispatch, cities]);

  const updateCityData = useCallback((id: number) => dispatch(GetCityIdTC(id)), [dispatch]);

  const updateData = useCallback(() => {
    dispatch(UpdateCityTC());
  }, [dispatch])

  const citiesMap = cities.map(({name, id, country, temp, hum, press, feel}) => cities.length === 0
    ? (<div className={s.message}>You have no saved cities</div>)
    :
    <OneCity
      key={id}
      name={name}
      id={id}
      country={country}
      temp={temp}
      hum={hum}
      press={press}
      feel={feel}
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
  }, [cities, lat, lon, dispatch]);



  // })  // useInterval(() => {
  //    updateData()
  // }, 5000);

  return (
    <div>
      <AddItemForm
        getCity={getCity}
        updateData={updateData}
      />
      <div>
        {citiesMap}
      </div>
    </div>
  )
}