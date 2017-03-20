import { browserHistory } from 'react-router';

export const logOut = (dispatch) => {
  localStorage.setItem('login', '');
  browserHistory.push('/welcome');
  dispatch({
    type: 'USER_LOG_OUT'
  });
};