import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';

import { STATE_TYPE } from '../constants/store';
import persistedReducer from './reducers/root-persist-index';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: STATE_TYPE.persisted,
  storage: AsyncStorage,
  debug: typeof process.env.DEBUG_REDUX_PERSIST !== 'undefined'
};

const reducers = combineReducers({
  // [STATE_TYPE.simple]: rootReducer,
  [STATE_TYPE.persisted]: persistReducer(persistConfig, persistedReducer)
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
