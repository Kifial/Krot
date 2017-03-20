const loader = (
  state = {
    hidden: true
  },
  action
) => {
  switch(action.type) {
    case 'SHOW_LOADER':
      return Object.assign({}, state, { hidden: false });
    case 'HIDE_LOADER':
      return Object.assign({}, state, { hidden: true });
    default:
      return state;
  }
};

export default loader;