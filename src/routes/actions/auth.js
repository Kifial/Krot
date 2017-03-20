import fetch from 'unfetch';

export const checkAuth = (nextState, replace) => {
  let login = localStorage.getItem('login');
  if (login) {
    fetch('/authUser', {
      headers: {
        'Authorization': `Bearer ${login}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          replace('/login');
        }
      })
  } else {
    replace('/welcome');
  }
};