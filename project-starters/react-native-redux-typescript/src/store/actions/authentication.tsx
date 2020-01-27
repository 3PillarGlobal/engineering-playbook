import { ACTIONS_TYPES } from '../../constants/store';

const loginRequest = (email, password) => Promise.resolve({ data: { token: 'batman' } });

export const login = (email: string, password: string) => (dispatch) => {
  dispatch({
    type: ACTIONS_TYPES.LOGIN_ACTION_REQUEST
  });

  return loginRequest(email, password).then((response) => {
    dispatch({
      type: ACTIONS_TYPES.LOGIN_ACTION_SUCCESS,
      userData: response.data
    });
  }, (error) => {
    dispatch({
      type: ACTIONS_TYPES.LOGIN_ACTION_ERROR,
      error
    });
  });
};
