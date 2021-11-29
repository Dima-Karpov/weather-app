import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import s from './CitiesFrom.module.css';

import {useDispatch, useSelector} from 'react-redux';
import {useGeoLocation} from '../../hooks/useGeoLocation';

import {addCity, deleteCity} from '../../store/reducers/actions/cityAction';
import {AddCurrentCityTC, GetCityIdTC, GetCityTC, UpdateCityTC} from '../../store/reducers/cities-reducers';

import {AddItemForm} from '../AddItemForm/AddItemForm';
import {OneCity} from './OneCity/OneCity';

import {CityType} from '../../api/types/CityType';
import {useTime} from '../../hooks/useTime';

import {useInterval} from '../../hooks/useInterval';
import {AppStoreType} from '../../store/store';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Checkbox from '@mui/material/Checkbox';
import {pink} from '@mui/material/colors';

import {intervalTime, localStorageCities} from '../../constans';

export const CitiesForm: FC = () => {
  const dispatch = useDispatch();
  const cities = useSelector<AppStoreType, CityType[]>(state => state.cities.cities);
  const [offChecked, setOffChecked] = useState<boolean>(false);

  const {lat, lon} = useGeoLocation();
  const {setTime, sec, min, hour} = useTime();

  const getCity = useCallback((city: string) => {
    dispatch(GetCityTC(city, sec, min, hour))
  }, [dispatch, sec, min, hour]);

  const deleteExtraCity = useCallback((id: number) => {
    const newCities = cities.filter((city) => id !== city.id);
    localStorage.setItem(localStorageCities, JSON.stringify(newCities));
    dispatch(deleteCity(id));
  }, [dispatch, cities]);

  const updateCityData = useCallback((id: number) => {
    dispatch(GetCityIdTC(id, sec, min, hour,));
  }, [dispatch, sec, min, hour,]);

  const updateData = () => {
    dispatch(UpdateCityTC(sec, min, hour));
  };

  const handlerChangeInputRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setOffChecked(e.currentTarget.checked)
  };

  const citiesMap = cities.map(({name, id, country, temp, hum, press, feel,
    iconId, vertSpeed, deg, hour, min, sec}) => cities.length === 0
      ? (<div className={s.message}>You have no saved cities</div>)
      :
      <Grid item key={id}>
        <Paper elevation={3} style={{padding: '10px'}}>
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
        </Paper>
      </Grid>
  );
  useInterval(updateData, intervalTime, offChecked);

  useEffect(() => {
    setTime(new Date());
    dispatch(AddCurrentCityTC(lat, lon, sec, min, hour));
    const citiesFromLocalStorage = JSON.parse(localStorage.getItem(localStorageCities)!);
    if (citiesFromLocalStorage) {
      citiesFromLocalStorage.forEach((city: CityType) => dispatch(addCity(city)));
    };
    cities.length && localStorage.setItem(localStorageCities, JSON.stringify(cities));

  }, [cities, lat, lon, dispatch, sec, min, hour, setTime]);

  return (
    <>
      <Grid container style={{padding: '10px 0px ', margin: '10px'}}>
        <AddItemForm
          getCity={getCity}
        />
        <div>
          <Checkbox
            checked={offChecked}
            onChange={handlerChangeInputRadio}
            sx={{
              color: pink[800],
              '&.Mui-checked': {
                color: pink[600],
              },
            }} />
          refresh every 5 seconds
        </div>
      </Grid>
      <Grid container spacing={7}>
        {citiesMap}
      </Grid>
    </>
  );
};