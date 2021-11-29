import {FC} from 'react';
import {useSelector} from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LinearProgress from '@mui/material/LinearProgress';
import {CitiesForm} from './components/CitiesForm/CitiesForm';

import {AppStoreType} from './store/store';

export const App: FC = () => {
  const status = useSelector<AppStoreType, string>(state => state.app.status);
  return (
    <>
      <AppBar position="static">
        <Toolbar style={{justifyContent: 'space-between'}}>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Weather
          </Typography>
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <CitiesForm />
      </Container>
    </>
  );
};
