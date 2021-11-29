import { FC, memo, useCallback } from 'react';
import s from './OneCity.module.css';

import { OneCityPropsType } from './types/OneCityPropsType';
import { WeatherIcon } from './weatherIcon';

import arrow from '../../../assets/arrow1.svg';

export const OneCity: FC<OneCityPropsType> = memo(({
  name, country, feel,
  hum, id, press, temp,
  deletCity, updateCityData,
  hour, min, sec, iconId,
  vertSpeed, deg,
}) => {
  const cappedCity = name.charAt(0).toUpperCase() + name.slice(1);

  const removeCity = useCallback(() => deletCity(id), [id, deletCity]);
  const updateCity = useCallback(() => updateCityData(id), [id, updateCityData]);

  return (
    <div className={s.oneCityBLock}>
      <div key={id} >
        <div className={s.buttonBlock}>
          <span
            className={s.update}
            onClick={updateCity}
          ></span>
          <span
            className={s.remove}
            onClick={removeCity}
          ></span>
        </div>
        <>
          <div className={s.cityName}>
            <WeatherIcon iconId={iconId} />
            {cappedCity}, {country}
          </div>
          <p>Temperature:{Math.floor(temp - 273.15)}°C</p>
          <p>Humidity: {hum}%</p>
          <p>Pressure: {press} hpa</p>
          <p>Feels like: {Math.ceil(feel - 273.15)}°C</p>
          <div className={s.st}>
            <div>Vert speed: {vertSpeed} km/h - </div>
            <span style={{ transform: `rotate(${ deg }deg)`}}>
              <img className={s.arrow} src={arrow} alt=''/>
            </span>
          </div>
          <p>Last updated:
            <span>{hour}</span>
            :
            <span>{min}</span>
            :
            <span>{sec}</span>
          </p>
        </>
      </div>
    </div>
  )
});
