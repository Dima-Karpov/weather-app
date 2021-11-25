import {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';

import {AddItemFormPropsType} from './types/AddItemFormPropsType';
import {useDispatch} from 'react-redux';
import {GetCityTC} from '../../store/reducers/cities-reducers';
import {addCity} from '../../store/reducers/actions/cityAction';



export const AddItemForm: FC<AddItemFormPropsType> = () => {
  const [state, setState] = useState<any>({});
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({[e.target.name]: e.target.value});
    console.log(state);
  };

  const handleFromSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addCity)
    dispatch(GetCityTC({name: state.name}));
    setState({name: ''});
  };


  return (
    <div>
      <div>
        <form onSubmit={handleFromSubmit}>
          <input
            placeholder="Enter city name"
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          <button type='submit' >Add</button>
        </form>
      </div>
    </div>
  );
};
