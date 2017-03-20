import React from 'react';
import { connect } from 'react-redux';
import PostItem from '../PostItem/index.jsx';
import { likePost } from '../../actions/api';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class FeedPostsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="feed-posts-list">
        <div className="feed-posts-list__list">
          {this.props.items.map(item =>
            <PostItem
              key={item._id}
              id={item._id}
              title={item.title}
              text={item.text}
              date={item.date}
              avatar={item.avatar}
              user={item.user}
              username={item.username}
              likesCount={item.likes.length}
              liked={item.liked}
              likePost={this.props.likePost}
            />
          )}
        </div>
      </div>
    )
  }
}

FeedPostsList.propTypes = {
  items: React.PropTypes.array,
  userLikes: React.PropTypes.array
};

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (id, value) => {
      likePost(id, value, dispatch);
    }
  }
};

FeedPostsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPostsList);

export default FeedPostsList;