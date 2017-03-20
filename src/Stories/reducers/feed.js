const feed = (
  state = {
    visibleItems: []
  },
  action
) => {
  let index = 0;
  switch(action.type) {
    case 'SET_FEED_ITEMS':
      return Object.assign({}, state, {
        visibleItems: action.data
      });
    case 'POST_LIKED':
      for (let i = 0; i < state.visibleItems.length; i += 1) {
        if (state.visibleItems[i]._id === action.data.postId) {
          index = i;
          break;
        }
      }
      return Object.assign({}, state, {
        visibleItems: [
          ...state.visibleItems.slice(0, index),
          Object.assign({}, state.visibleItems[index], {
            liked: !state.visibleItems[index].liked,
            likes: action.data.postLikes
          }),
          ...state.visibleItems.slice(index + 1)
        ]
      });
    case 'CLEAR_FEED_ITEMS':
      return Object.assign({}, state, { visibleItems: [] });
    default:
      return state;
  }
};

export default feed;