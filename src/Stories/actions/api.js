import fetch from 'unfetch';
import { setPostLiked } from './posts';

export const getItems = (userLikes, dispatch) => {
  const login = localStorage.getItem('login');
  fetch('/myPosts', {
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
      setPostLiked(data.items, data.userLikes, 'SET_FEED_ITEMS', dispatch);
    });
};

export const getFeedItems = (dispatch) => {
  const login = localStorage.getItem('login');
  fetch('/feedPosts', {
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
      setPostLiked(data.items, data.userLikes, 'SET_FEED_ITEMS', dispatch);
    });
};

export const getFavouriteItems = (dispatch) => {
  const login = localStorage.getItem('login');
  fetch('/favouritePosts', {
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
      setPostLiked(data.items, data.userLikes, 'SET_FEED_ITEMS', dispatch);
    })
};

export const likePost = (postId, value, dispatch) => {
  const login = localStorage.getItem('login');
  fetch('/likePost', {
    method: 'put',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${login}`
    },
    body: JSON.stringify({ postId, value })
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      dispatch({
        type: 'POST_LIKED',
        data: {
          postId,
          login: data.login,
          postLikes: data.postLikes,
          userLikes: data.userLikes
        }
      });
    });
};

export const likePostPage = (postId, value, user, dispatch) => {
  dispatch({
    type: 'POST_PAGE_LIKED',
    data: {
      postId,
      value,
      user
    }
  });
  const login = localStorage.getItem('login');
  fetch('/likePost', {
    method: 'put',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${login}`
    },
    body: JSON.stringify({ postId, value })
  })
    .then(response => {
      if (response.status !== 200) {
        console.error('post was not liked');
      }
    });
};

export const likeComment = (commentId, value, user, dispatch) => {
  dispatch({
    type: 'COMMENT_LIKED',
    data: {
      commentId,
      value,
      user
    }
  });
  const login = localStorage.getItem('login');
  fetch('/likeComment', {
    method: 'put',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${login}`
    },
    body: JSON.stringify({ commentId, value })
  })
    .then(response => {
      if (response.status !== 200) {
        console.log('comment was not liked');
      }
    });
};

export const getPostPage = (id, dispatch) => {
  const login = localStorage.getItem('login');
  fetch(`/getPost/${id}`, {
    headers: {
      'Authorization': `Bearer ${login}`
    }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.error('wtf');
      }
    })
    .then(data => {
      dispatch({
        type: 'SET_POST_PAGE_INFO',
        data
      });
    });
};

export const submitComment = (id, value, dispatch) => {
  dispatch({
    type: 'WRITE_COMMENT_CLEAR'
  });
  const login = localStorage.getItem('login');
  fetch('/submitComment', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${login}`
    },
    body: JSON.stringify({ id, value })
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      dispatch({
        type: 'COMMENT_CREATED',
        data: {
          _id: data.id,
          postId: data.postId,
          name: data.name,
          username: data.username,
          text: data.text,
          avatar: data.avatar,
          date: data.date,
          likes: data.likes,
          liked: false
        }
      })
    });
};