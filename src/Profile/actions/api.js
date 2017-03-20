import fetch from 'unfetch';
import { browserHistory } from 'react-router';

export const getInfo = (dispatch) => {
  const login = localStorage.getItem('login');
  fetch('/profileInfo', {
    headers: {
      'Authorization': `Bearer ${login}`
    }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      dispatch({
        type: 'PROFILE_SET_INFO',
        data
      });
    });
};

export const getEditInfo = (dispatch) => {
  const login = localStorage.getItem('login');
  fetch('/editProfileInfo', {
    headers: {
      'Authorization': `Bearer ${login}`
    }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      dispatch({
        type: 'EDIT_PROFILE_SET_DATA',
        data
      });
    });
};

export const handleEditSubmit = (data, dispatch) => {
  const login = localStorage.getItem('login');
  let fd = new FormData();
  for (let name in data) {
    if (data.hasOwnProperty(name)) {
      fd.append(name, data[name]);
    }
  }
  dispatch({
    type: 'SHOW_LOADER'
  });
  fetch('/editProfileSubmit', {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${login}`
    },
    body: fd
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      dispatch({
        type: 'PROFILE_EDIT_SUCCESS',
        data
      });
      dispatch({
        type: 'HIDE_LOADER'
      });
      browserHistory.push('/profile');
    });
};

export const getSourceAvatar = (dispatch) => {
  dispatch({
    type: 'SHOW_AVATAR_POPUP'
  });
  const login = localStorage.getItem('login');
  fetch('/sourceAvatar', {
    headers: {
      'Authorization': `Bearer ${login}`
    }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      dispatch({
        type: 'SET_AVATAR_POPUP_INFO',
        data
      });
    })
};