const registration = (
  state = {
    name: '',
    login: '',
    email: '',
    pass: '',
    confirmPass: '',
    requesting: false
  },
  action
) => {
  switch(action.type) {
    case 'HANDLE_REGISTER_INPUT':
      return Object.assign({}, state, { [action.name]: action.value });
    case 'HANDLE_REGISTER_REQUEST':
      return Object.assign({}, state, { requesting: true });
    case 'HANDLE_REGISTER_SUBMIT':
      return Object.assign({}, state, {
        name: '',
        login: '',
        email: '',
        pass: '',
        confirmPass: '',
        requesting: false
      });
    default:
      return state;
  }
};

export default registration;