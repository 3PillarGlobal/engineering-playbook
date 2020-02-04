import { AuthenticationActions, ACTIONS_TYPES } from '../../actions/authentication';

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

export default (state: AuthenticationState = initialState, action: AuthenticationActions): AuthenticationState => {
  switch (action.type) {
    case ACTIONS_TYPES.LOGIN_PENDING:
      return {
        ...state,
        isLoginPending: true
      };
    case ACTIONS_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginPending: false,
        token: action.userData.token
      };
    case ACTIONS_TYPES.LOGOUT_REQUEST:
      return { ...initialState };
    default:
      return state;
  }
};
