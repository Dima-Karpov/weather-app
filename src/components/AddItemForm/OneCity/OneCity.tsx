import {FC} from 'react';
import s from './OneCity.module.css'

import {useDispatch, useSelector} from 'react-redux';
import {CityType} from '../../../api/apiService';

import {deleteCity} from '../../../store/reducers/actions/cityAction';
import {AppStoreType} from '../../../store/reducers/store';


export const OneCity: FC = () => {
  const dispatch = useDispatch();

  const cities = useSelector<AppStoreType, CityType[]>(state => state.cities.cities);

  const deleteExtraCity = (id: number) => {
    dispatch(deleteCity(id))
  }
  return (
    <div className={s.oneCityBLock}>
      {
        cities.length === 0
          ? (<div className={s.message}>You have no saved cities</div>)
          : (cities.map((city) => {
            const cappedCity = city.name.charAt(0).toUpperCase() + city.name.slice(1)
            return (
              <div
                className={s.cityCard}
                key={city.id}
              >
                <button
                  className={s.remove}
                  onClick={() => {deleteExtraCity(city.id)}}
                >X</button>
                <>
                  <p className={s.cityName}>{cappedCity}, {city.country}</p>
                  <p>Temperature:{Math.floor(city.temp - 273.15)}°C</p>
                  <p>Humidity: {city.hum}%</p>
                  <p>Pressure: {city.press} hpa</p>
                  <p>Feels like: {Math.ceil(city.feel - 273.15)}°C</p>
                </>
                <div>WeatherIcon</div>

              </div>

            )
          }))
      }
    </div>
  )
}
