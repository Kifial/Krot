import fetch from 'unfetch';

export const getUserInfo = (dispatch) => {
  const login = localStorage.getItem('login');
  if (login) {
    fetch('/userInfo', {
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
          type: 'PROFILE_SET_HEADER_INFO',
          data
        });
      });
  }
};