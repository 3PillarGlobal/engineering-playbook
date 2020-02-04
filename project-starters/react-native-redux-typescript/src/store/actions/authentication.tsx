import { Dispatch } from 'react';

export type User = {
  id?: number;
  token: string;
  name: string;
  email: string;
  phone: string;
  username?: string;
};

export enum ACTIONS_TYPES {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST'
}

export interface LoginSuccess {
  type: typeof ACTIONS_TYPES.LOGIN_SUCCESS;
  userData: User & { token: string };
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


export const logout = (): LogoutRequest => {
  return {
    type: ACTIONS_TYPES.LOGOUT_REQUEST
  };
};

export function login(email: string, password: string) {
  return async (dispatch: Dispatch<AuthenticationActions>): Promise<User> => {
    dispatch({
      type: ACTIONS_TYPES.LOGIN_PENDING
    });

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await response.json();
    const user = users.find((u: User) => u.email === email && u.username === password);

    if (user) {
      dispatch({
        type: ACTIONS_TYPES.LOGIN_SUCCESS,
        userData: {
          ...user,
          token: user.id + user.username
        }
      });
      return user;
    }
    throw new Error('No user found');
  };
}

export const actions = {
  login,
  logout
};
