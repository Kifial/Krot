const writeComment = (
  state = {
    input: '',
    inputHidden: true
  },
  action
) => {
  switch(action.type) {
    case 'WRITE_COMMENT_TRIGGER':
      return Object.assign({}, state, { inputHidden: !state.inputHidden });
    case 'WRITE_COMMENT_HANDLE_INPUT':
      return Object.assign({}, state, { input: action.value });
    case 'WRITE_COMMENT_CLEAR':
      return Object.assign({}, state, {
        input: '',
        inputHidden: true
      });
    default:
      return state;
  }
};

export default writeComment;