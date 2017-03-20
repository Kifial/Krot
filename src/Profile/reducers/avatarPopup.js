const avatarPopup = (
  state = {
    hidden: true,
    image: '',
    title: ''
  },
  action
) => {
  switch(action.type) {
    case 'SHOW_AVATAR_POPUP':
      return Object.assign({}, state, { hidden: false });
    case 'HIDE_AVATAR_POPUP':
      return Object.assign({}, state, { hidden: true });
    case 'SET_AVATAR_POPUP_INFO':
      return Object.assign({}, state, {
        image: action.data.image,
        title: action.data.title
      });
    case 'CLEAR_AVATAR_POPUP':
      return Object.assign({}, state, {
        image: '',
        title: ''
      });
    default:
      return state;
  }
};

export default avatarPopup;