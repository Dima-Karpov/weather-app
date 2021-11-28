import {FC, useCallback, useEffect} from 'react';
import s from './CitiesFrom.module.css';

import {useDispatch, useSelector} from 'react-redux';
import {useGeoLocation} from '../../hooks/useGeoLocation';

import {addCity, deleteCity} from '../../store/reducers/actions/cityAction';
import {AddCurrentCityTC, GetCityIdTC, GetCityTC, UpdateCityTC} from '../../store/reducers/cities-reducers';
import {AppStoreType} from '../../store/reducers/store';

import {AddItemForm} from '../AddItemForm/AddItemForm';
import {OneCity} from './OneCity/OneCity';

import {CityType} from '../../api/types/CityType';
import {useTime} from '../../hooks/useTime';

// export type CitiesFormPropsType = {
//   setTime: any;
//   hour: any;
//   min: any;
//   sec: any;
// };

export const CitiesForm: FC= () => {
  const dispatch = useDispatch();
  const cities = useSelector<AppStoreType, CityType[]>(state => state.cities.cities);
  const {lat, lon} = useGeoLocation();

  const {setTime, sec, min, hour} = useTime();

  const getCity = useCallback((city: string) => {
    dispatch(GetCityTC(city, sec, min, hour))
 
  }, [dispatch]);

  const deleteExtraCity = useCallback((id: number) => {
    const newCities = cities.filter((city) => id !== city.id);
    localStorage.setItem('cities', JSON.stringify(newCities));
    dispatch(deleteCity(id));
  }, [dispatch, cities]);

  const updateCityData = useCallback((id: number) => {
    dispatch(GetCityIdTC(id, sec, min, hour,  ));
  }, [dispatch,  sec, min, hour, ]);

  const updateData = useCallback(() => {
    setTime(new Date())
    dispatch(UpdateCityTC(sec, min, hour));
  }, [dispatch]);

  const citiesMap = cities.map(({name, id, country, temp, hum, press, feel, 
    iconId, vertSpeed, deg, hour, min, sec}) => cities.length === 0
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

      sec={sec}
      min={min}
      hour={hour}

      iconId={iconId}
      vertSpeed={vertSpeed}
      deg={deg}
    />
  );

  useEffect(() => {
    dispatch(AddCurrentCityTC(lat, lon, sec, min, hour));
    const citiesFromLocalStorage = JSON.parse(localStorage.getItem('cities')!);
    setTime(new Date())
    if (citiesFromLocalStorage)
    {
      citiesFromLocalStorage.forEach((city: CityType) => dispatch(addCity(city)));
    }
    cities.length && localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities, lat, lon, dispatch, sec, min, hour, setTime]);

  console.log(cities)

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