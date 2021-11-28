import {FC} from 'react';
import s from './icon.module.css'

import Image0450 from '../../../assets/Weather/0450/0450.png';
import Image0203n from '../../../assets/Weather/0203n/0203n.png';

import Image01d from '../../../assets/Weather/01d/01d.png';
import Image01n from '../../../assets/Weather/01n/01n.png';

import Image09d from '../../../assets/Weather/09d/09d.png';
import Image09n from '../../../assets/Weather/09n/09n.png';

import Image10d from '../../../assets/Weather/10d/10d.png';
import Image10n from '../../../assets/Weather/10n/10n.png';

import Image11d from '../../../assets/Weather/11d/11d.png';
import Image11n from '../../../assets/Weather/11n/11n.png';

import Image13d from '../../../assets/Weather/13d/13d.png';
import Image13n from '../../../assets/Weather/13n/13n.png';

import Image0203d from '../../../assets/Weather/0203d/0203d.png';

type WeatherIconPropsType = {
  iconId: string
}

export const WeatherIcon: FC<WeatherIconPropsType> = ({iconId}) => {
  const weatherImage = (iconId: string) => {
    switch (iconId) {
      case '01d':
        return < img className={s.icon} src={Image01d} alt="weather icon" />
      case '01n':
        return < img className={s.icon} src={Image01n} alt="weather icon" />
      case '02d':
        return < img className={s.icon} src={Image0203d} alt="weather icon" />
      case '02n':
        return < img className={s.icon} src={Image0203n} alt="weather icon" />
      case '03d':
        return < img className={s.icon} src={Image0203d} alt="weather icon" />
      case '03n':
        return < img className={s.icon} src={Image0203n} alt="weather icon" />
      case '04d':
        return < img className={s.icon} src={Image0450} alt="weather icon" />
      case '04n':
        return < img className={s.icon} src={Image0450} alt="weather icon" />
      case '09d':
        return < img className={s.icon} src={Image09d} alt="weather icon" />
      case '09n':
        return < img className={s.icon} src={Image09n} alt="weather icon" />
      case '10d':
        return < img className={s.icon} src={Image10d} alt="weather icon" />
      case '10n':
        return < img className={s.icon} src={Image10n} alt="weather icon" />
      case '11d':
        return < img className={s.icon} src={Image11d} alt="weather icon" />
      case '11n':
        return < img className={s.icon} src={Image11n} alt="weather icon" />
      case '13d':
        return < img className={s.icon} src={Image13d} alt="weather icon" />
      case '13n':
        return < img className={s.icon} src={Image13n} alt="weather icon" />
      case '50d':
        return < img className={s.icon} src={Image0450} alt="weather icon" />
      case '50n':
        return < img className={s.icon} src={Image0450} alt="weather icon" />
      default:
        break
    };
  }
  return (
    <div>
      {weatherImage(iconId)}
    </div>
  )
};
