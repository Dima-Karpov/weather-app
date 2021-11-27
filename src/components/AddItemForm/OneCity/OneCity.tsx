import {FC, memo, useEffect, useState} from 'react';
import s from './OneCity.module.css'

import {OneCityPropsType} from './types/OneCityPropsType';

export const OneCity: FC<OneCityPropsType> = memo(({
  name, country, feel,
  hum, id, press, temp,
  deletCity, updateCityData,
}) => {
  const cappedCity = name.charAt(0).toUpperCase() + name.slice(1);

  const getTwoDigitsString = (num: number) => num < 10 ? "0" + num : num
  
  const [state, setState] = useState(new Date())

  useEffect(() => {
    setState(new Date())
  }, [])

  const secondsString = getTwoDigitsString(state.getSeconds())
  const minutesString = getTwoDigitsString(state.getMinutes())
  const hoursString = getTwoDigitsString(state.getHours())


  const removeCity = () => deletCity(id);
  const updateCity = () => updateCityData(id);


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
            <span>{hoursString}</span>
            :
            <span>{minutesString}</span>
            :
            <span>{secondsString}</span>
          </p>

        </>
        <div>WeatherIcon</div>
      </div>
    </div>
  )
});
