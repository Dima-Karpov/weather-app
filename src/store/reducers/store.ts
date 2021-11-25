import {applyMiddleware, combineReducers, createStore} from 'redux';
import {CitiesReducers} from './cities-reducers';

import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {CityActionsType} from './actions/types/CityActionsType';

const rootReducer = combineReducers({
  cities: CitiesReducers,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionsType>

export type AppActionsType = CityActionsType

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;