import {ChangeEvent, FC, FormEvent, memo, useState} from 'react';
import {AddItemFormPropsType} from './types/AddItemFormPropsType';


export const AddItemForm: FC<AddItemFormPropsType> = memo(({getCity, }) => {
  const [city, setCity] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };
  const handleFromSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() === '') {
      return alert('hello Dima!')
    }
    getCity(city);
    setCity('');
  };

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
        </form>
      </div>
    </div>
  );
});
