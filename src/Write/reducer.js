const writeStory = (
  state = {
    title: '',
    text: 'Text...',
    requesting: false
  },
  action
) => {
  switch(action.type) {
    case 'WRITE_STORY_HANDLE_INPUT':
      return Object.assign({}, state, { [action.name]: action.value });
    case 'SUBMIT_WRITE_STORY':
      return Object.assign({}, state, {
        title: '',
        text: 'Text...',
        requesting: false
      });
    default:
      return state;
  }
};

export default writeStory;