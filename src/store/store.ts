import {applyMiddleware, combineReducers, createStore} from 'redux';
import {citiesReducer} from './reducers/cities-reducers';

import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {CityActionsType} from './reducers/actions/types/CityActionsType';

import {ActionsTypeApp, appReducer} from './reducers/app-reducers';

const rootReducer = combineReducers({
  cities: citiesReducer,
  app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionsType>;

export type AppActionsType = CityActionsType | ActionsTypeApp;

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;