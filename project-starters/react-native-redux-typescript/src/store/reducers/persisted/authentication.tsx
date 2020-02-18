import { AuthenticationActions, ACTIONS_TYPES, User } from '../../actions/authentication';

export type AuthenticationState = {
  readonly isLoginPending: boolean;
  readonly error: string;
  readonly user: User;
};

const initialState: AuthenticationState = {
  isLoginPending: false,
  error: '',
  user: {
    token: '',
    name: '',
    email: '',
    phone: '',
    username: '',
  }
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
        user: action.userData
      };
    case ACTIONS_TYPES.LOGOUT_REQUEST:
      return { ...initialState };
    case ACTIONS_TYPES.LOGIN_ERROR:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};
