import { ChangeEvent, FC, FormEvent, memo, useState, useCallback } from 'react';
import { AddItemFormPropsType } from './types/AddItemFormPropsType';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { EmtiString } from '../../constans';

export const AddItemForm: FC<AddItemFormPropsType> = memo(({getCity}) => {
  const [city, setCity] = useState<string>(EmtiString);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  }, [setCity]);

  const handleFromSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city.trim() === EmtiString) {
      return alert('Enter City name!');
    }
    getCity(city);
    setCity(EmtiString);

  }, [getCity, city]);

  return (
    <div>
      <div>
        <form onSubmit={handleFromSubmit}>
          <TextField
            value={city}
            onChange={handleChange}
            label="City name"
            variant={'outlined'}
          />
          <Button
            style={{marginLeft: "5px"}}
            color={'primary'}
            type='submit'
          >Add</Button>
        </form>
      </div>
    </div>
  );
});
