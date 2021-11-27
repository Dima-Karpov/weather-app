import { ChangeEvent, FC, FormEvent, memo, useState, useCallback } from 'react';
import {useInterval} from '../../hooks/useInterval';

import {AddItemFormPropsType} from './types/AddItemFormPropsType';


export const AddItemForm: FC<AddItemFormPropsType> = memo(({getCity, updateData, }) => {
  const [city, setCity] = useState<string>('');
  const [off, setOff] = useState<boolean>(false);
  useInterval(updateData, 5000, off);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  }, [setCity]);
  const handleFromSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() === '')
    {
      return alert('hello!')
    }
    getCity(city);
    setCity('');
  }, [getCity, city]);

  const handlerChangeInputRadio = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOff(e.currentTarget.checked)
  }, [setOff]);

  return (
    <div>
      <div>
        <form onSubmit={handleFromSubmit}>
          <input
            placeholder="Enter city name"
            type="text"
            name="name"
            value={city}
            onChange={handleChange}
          />
          <button type='submit' >Add</button>
          <input
            type='checkbox'
            onChange={handlerChangeInputRadio}
            checked={off}
          />
        </form>
      </div>
    </div>
  );
});
