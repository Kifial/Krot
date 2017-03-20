import fetch from 'unfetch';
import { browserHistory } from 'react-router';

export const register = (name, email, login, password, dispatch) => {
  fetch('/register', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ name, email, login, password })
  })
    .then(response => {
      if (response.status === 201) {
        console.log(response.status);
        return response.json();
      }
    })
    .then(data => {
      localStorage.setItem('login', data.token);
      dispatch({
        type: 'HANDLE_REGISTER_SUBMIT'
      });
      dispatch({
        type: 'PROFILE_SET_HEADER_INFO',
        data: {
          name,
          avatar: '/assets/avatar-placeholder.png'
        }
      });
      browserHistory.push('/feed');
    });
};

export const loginUser = (login, password, dispatch) => {
  fetch('/login', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ login, password })
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      localStorage.setItem('login', data.token);
      dispatch({
        type: 'HANDLE_LOGIN_SUBMIT'
      });
      dispatch({
        type: 'PROFILE_SET_HEADER_INFO',
        data: {
          name: data.name,
          avatar: data.avatar,
          email: data.email
        }
      });
      browserHistory.push('/feed');
    });
};