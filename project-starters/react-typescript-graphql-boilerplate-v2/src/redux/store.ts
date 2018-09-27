import { createStore, compose } from 'redux';
import { enthusiasm } from '../reducers/index';
import { StoreState } from '../types/index';
import { EnthusiasmAction } from '../actions/index';

const windowIfDefined = typeof window === 'undefined' ? null : (window as any);
const composeEnhancers =
  windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState = {
  enthusiasmLevel: 1,
  languageName: 'TypeScript'
};

const store = createStore<StoreState, EnthusiasmAction, any, any>(
  enthusiasm,
  defaultState,
  composeEnhancers()
);

export default store;
