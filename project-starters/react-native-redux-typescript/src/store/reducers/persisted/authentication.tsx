import { ACTIONS_TYPES } from '../../../constants/store';

export type AuthenticationState = {
  readonly isLoginPending: boolean;
  readonly error: string;
  readonly token: string;
};

const initialState: AuthenticationState = {
  isLoginPending: false,
  error: '',
  token: ''
};


const loginRequest = (state: AuthenticationState): AuthenticationState => {
  return {
    ...state,
    isLoginPending: true
  };
};

const loginSuccess = (state: AuthenticationState, action): AuthenticationState => {
  return {
    ...state,
    isLoginPending: false,
    token: action.userData.token
  };
};

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case ACTIONS_TYPES.LOGIN_ACTION_REQUEST: return loginRequest(state);
    case ACTIONS_TYPES.LOGIN_ACTION_SUCCESS: return loginSuccess(state, action);
    default:
      return state;
  }
};
