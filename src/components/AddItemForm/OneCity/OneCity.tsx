import { FC, memo, useCallback } from 'react';
import s from './OneCity.module.css'

import {OneCityPropsType} from './types/OneCityPropsType';

export const OneCity: FC<OneCityPropsType> = memo(({
  name, country, feel,
  hum, id, press, temp,
  deletCity, updateCityData,
  hour, min, sec
}) => {
  const cappedCity = name.charAt(0).toUpperCase() + name.slice(1);

  const removeCity = useCallback(() => deletCity(id), [id, deletCity]);
  const updateCity = useCallback(() => updateCityData(id), [id, updateCityData]);
console.log('rendering')
  return (
    <div className={s.oneCityBLock}>
      <div
        className={s.cityCard}
        key={id}
      >
        <div className={s.buttonBlock}>
          <button
            className={s.update}
            onClick={updateCity}
          >O</button>
          <button
            className={s.remove}
            onClick={removeCity}
          >X</button>
        </div>
        <>
          <p className={s.cityName}>{cappedCity}, {country}</p>
          <p>Temperature:{Math.floor(temp - 273.15)}°C</p>
          <p>Humidity: {hum}%</p>
          <p>Pressure: {press} hpa</p>
          <p>Feels like: {Math.ceil(feel - 273.15)}°C</p>
          <p>Last updated:
            <span>{hour}</span>
            :
            <span>{min}</span>
            :
            <span>{sec}</span>
          </p>

        </>
        <div>WeatherIcon</div>
      </div>
    </div>
  )
});
