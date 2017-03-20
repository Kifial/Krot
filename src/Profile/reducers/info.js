const info = (
  state = {
    name: '',
    avatar: '',
    bigAvatar: '',
    email: '',
    likes: []
  },
  action
) => {
  let userLikesIndex = 0;
  switch(action.type) {
    case 'PROFILE_SET_HEADER_INFO':
      return Object.assign({}, state, {
        name: action.data.name,
        avatar: action.data.avatar,
        email: action.data.email,
        likes: action.data.likes
      });
    case 'PROFILE_SET_INFO':
      return Object.assign({}, state, {
        name: action.data.name,
        avatar: action.data.avatar,
        bigAvatar: action.data.bigAvatar,
        email: action.data.email
      });
    case 'PROFILE_EDIT_SUCCESS':
      if (action.data.avatar) {
        return Object.assign({}, state, {
          bigAvatar: action.data.bigAvatar,
          avatar: action.data.avatar,
          name: action.data.name,
          email: action.data.email
        });
      } else {
        return Object.assign({}, state, {
          name: action.data.name,
          email: action.data.email
        });
      }
    case 'USER_LOG_OUT':
      return Object.assign({}, state, {
        name: '',
        avatar: '',
        bigAvatar: '',
        email: '',
        likes: []
      });
    case 'POST_LIKED':
      return Object.assign({}, state, {
        likes: action.data.userLikes
      });
    case 'POST_PAGE_LIKED':
      if (action.data.value) {
        for (let i = 0; i < state.likes.length; i += 1) {
          if (state.likes[i] === action.data.postId) {
            userLikesIndex = i;
            break;
          }
        }
        return Object.assign({}, state, {
          likes: [
            ...state.likes.slice(0, userLikesIndex),
            ...state.likes.slice(userLikesIndex + 1)
          ]
        });
      } else {
        return Object.assign({}, state, {
          likes: [
            ...state.likes,
            action.data.postId
          ]
        });
      }
    default:
      return state;
  }
};

export default info;