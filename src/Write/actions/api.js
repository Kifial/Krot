import fetch from 'unfetch';
import { browserHistory } from 'react-router';

export const submitStory = (title, text, date, dispatch) => {
  const login = localStorage.getItem('login');
  fetch('/submitStory', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${login}`
    },
    body: JSON.stringify({ title, text, date })
  })
    .then(response => {
      if (response.status === 201) {
        browserHistory.push('/my');
        dispatch({
          type: 'SUBMIT_WRITE_STORY'
        });
      }
    })
};