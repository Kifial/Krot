const userBoxPopup = (
  state = {
    hidden: true
  },
  action
) => {
  switch(action.type) {
    case 'TRIGGER_USER_BOX_POPUP':
      return Object.assign({}, state, { hidden: !state.hidden });
    default:
      return state;
  }
};

export default userBoxPopup;