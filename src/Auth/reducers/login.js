const login = (
  state = {
    login: '',
    pass: '',
    requesting: false
  },
  action
) => {
  switch(action.type) {
    case 'HANDLE_LOGIN_INPUT':
      return Object.assign({}, state, { [action.name]: action.value });
    case 'HANDLE_LOGIN_REQUEST':
      return Object.assign({}, state, { requesting: true });
    case 'HANDLE_LOGIN_SUBMIT':
      return Object.assign({}, state, {
        login: '',
        pass: '',
        requesting: false
      });
    default:
      return state;
  }
};

export default login;