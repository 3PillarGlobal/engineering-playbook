import { Dispatch } from 'react';

export enum ACTIONS_TYPES {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST'
}

export interface LoginSuccess {
  type: typeof ACTIONS_TYPES.LOGIN_SUCCESS;
  userData: {
    token: string;
  };
}

export interface LoginError {
  type: typeof ACTIONS_TYPES.LOGIN_ERROR;
  error: string;
}

export interface LoginPending {
  type: typeof ACTIONS_TYPES.LOGIN_PENDING;
}

export interface LogoutRequest {
  type: typeof ACTIONS_TYPES.LOGOUT_REQUEST;
}

export type AuthenticationActions = LoginSuccess | LoginError | LoginPending | LogoutRequest;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginRequest = (email: string, password: string) => Promise.resolve({ data: { token: 'batman' } });

export const logout = (): LogoutRequest => {
  return {
    type: ACTIONS_TYPES.LOGOUT_REQUEST
  };
};

export function login(email: string, password: string) {
  return (dispatch: Dispatch<AuthenticationActions>) => {
    dispatch({
      type: ACTIONS_TYPES.LOGIN_PENDING
    });

    const promise = loginRequest(email, password);

    promise.then((response) => {
      dispatch({
        type: ACTIONS_TYPES.LOGIN_SUCCESS,
        userData: response.data
      });
    }).catch((error) => {
      dispatch({
        type: ACTIONS_TYPES.LOGIN_ERROR,
        error
      });
    });
  };
}

export const actions = {
  login,
  logout
};
