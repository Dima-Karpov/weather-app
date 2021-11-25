import { FC } from 'react';

import s from './App.module.css';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {OneCity} from './components/AddItemForm/OneCity/OneCity';


export const App: FC = (): any => {
  const add = true;
  return (
    <div className={s.App}>
      <div>world</div>
      {add}
      <AddItemForm />
      <OneCity/>
      Hello
    </div>
  );
};
