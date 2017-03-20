const edit = (
  state = {
    name: '',
    email: '',
    avatar: '',
    bigAvatar: '',
    avatarInput: '',
    requesting: false,
    avatarCreated: false,
    avatarFile: {}
  },
  action
) => {
  switch(action.type) {
    case 'EDIT_PROFILE_SET_DATA':
      return Object.assign({}, state, {
        name: action.data.name,
        email: action.data.email,
        avatar: action.data.avatar,
        bigAvatar: action.data.bigAvatar
      });
    case 'EDIT_PROFILE_HANDLE_INPUT':
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    case 'EDIT_PROFILE_AVATAR_INPUT':
      return Object.assign({}, state, {
        bigAvatar: action.bigAvatar,
        avatarFile: action.avatarFile,
        avatarCreated: true
      });
    case 'EDIT_PROFILE_CLEAR':
      return Object.assign({}, state, {
        name: '',
        email: '',
        avatar: '',
        bigAvatar: '',
        avatarInput: '',
        requesting: false,
        avatarCreated: false
      });
    default:
      return state;
  }
};

export default edit;