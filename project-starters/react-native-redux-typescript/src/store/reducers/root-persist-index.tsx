import { combineReducers } from 'redux';
import authenticationReducer from './persisted/authentication';

export default combineReducers({
  authenticaton: authenticationReducer,
});
