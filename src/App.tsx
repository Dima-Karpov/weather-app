import { FC } from 'react';
import s from './App.module.css';

import {CitiesForm} from './components/CitiesForm/CitiesForm';
import {useTime} from './hooks/useTime';

export const App: FC = (): any => {


  return (
    <div className={s.App}>
      <CitiesForm

      />
    </div>
  );
};
