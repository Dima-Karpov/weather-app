import { FC } from 'react';
import s from './App.module.css';

import {CitiesForm} from './components/CitiesForm/CitiesForm';

export const App: FC = (): any => {
  return (
    <div className={s.App}>
      <CitiesForm/>
    </div>
  );
};
