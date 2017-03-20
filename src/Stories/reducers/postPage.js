const postPage = (
  state = {
    username: '',
    user: '',
    title: '',
    text: '',
    avatar: '',
    date: '',
    likes: [],
    liked: false,
    numericDate: 0,
    comments: []
  },
  action
) => {
  let postLikesIndex = 0,
    commentIndex = 0,
    commentLikesIndex = 0,
    i = 0;
  switch(action.type) {
    case 'SET_POST_PAGE_INFO':
      return Object.assign({}, state, { ...action.data });
    case 'POST_PAGE_LIKED':
      if (state.liked) {
        for (i = 0; i < state.likes.length; i += 1) {
          if (state.likes[i] === action.data.user) {
            postLikesIndex = i;
            break;
          }
        }
        return Object.assign({}, state, {
          liked: !state.liked,
          likes: [
            ...state.likes.slice(0, postLikesIndex),
            ...state.likes.slice(postLikesIndex + 1)
          ]
        });
      } else {
        return Object.assign({}, state, {
          liked: !state.liked,
          likes: [
            ...state.likes,
            action.data.user
          ]
        });
      }
    case 'COMMENT_CREATED':
      return Object.assign({}, state, {
        comments: [
          action.data,
          ...state.comments
        ]
      });
    case 'COMMENT_LIKED':
      for (i = 0; i < state.comments.length; i += 1) {
        if (state.comments[i] === action.data.commentId) {
          commentIndex = i;
          break;
        }
      }
      let currentComment = state.comments[commentIndex];
      if (currentComment.liked) {
        for (i = 0; i < currentComment.likes.length; i += 1) {
          if (currentComment.likes[i] === action.data.user) {
            commentLikesIndex = i;
            break;
          }
        }
        return Object.assign({}, state, {
          comments: [
            ...state.comments.slice(0, commentIndex),
            Object.assign({}, currentComment, {
              liked: !currentComment.liked,
              likes: [
                ...currentComment.likes.slice(0, commentLikesIndex),
                ...currentComment.likes.slice(commentLikesIndex + 1)
              ]
            }),
            ...state.comments.slice(commentIndex + 1)
          ]
        });
      } else {
        return Object.assign({}, state, {
          comments: [
            ...state.comments.slice(0, commentIndex),
            Object.assign({}, currentComment, {
              liked: !currentComment.liked,
              likes: [
                ...currentComment.likes,
                action.data.user
              ]
            }),
            ...state.comments.slice(commentIndex + 1)
          ]
        });
      }
    case 'CLEAR_POST_PAGE':
      return Object.assign({}, state, {
        username: '',
        user: '',
        title: '',
        text: '',
        avatar: '',
        date: '',
        likes: [],
        liked: false,
        numericDate: 0,
        comments: []
      });
    default:
      return state;
  }
};

export default postPage;