import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';

import persistedReducer from './reducers/root-persist-index';
import { AuthenticationState } from './reducers/persisted/authentication';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'persisted',
  storage: AsyncStorage,
  debug: typeof process.env.DEBUG_REDUX_PERSIST !== 'undefined'
};

const reducers = combineReducers({
  // memory: rootReducer,
  persisted: persistReducer(persistConfig, persistedReducer)
});

export interface AppState {
  persisted: {
    authentication: AuthenticationState;
  };
}

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
