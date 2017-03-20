// looking if user liked this post
export const setPostLiked = (items, userLikes, dispatchPath, dispatch) => {
  for (let i = 0; i < userLikes.length; i += 1) {
    for (let j = 0; j < items.length; j += 1) {
      if (userLikes[i] === items[j]._id) {
        items[j].liked = true;
        break;
      }
    }
  }
  dispatch({
    type: dispatchPath,
    data: items
  });
};

export const clearItems = (dispatch) => {
  dispatch({
    type: 'CLEAR_FEED_ITEMS'
  });
};