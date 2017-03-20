import React from 'react';
import { connect } from 'react-redux';
import PostsList from '../../components/PostsList/index.jsx';
import { getItems } from '../../actions/api';
import { clearItems } from '../../actions/posts';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class MyPostsContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getItems(this.props.userLikes);
  }
  componentWillUnmount() {
    this.props.clearItems();
  }
  render() {
    return (
      <div className="my-posts">
        <PostsList
          items={this.props.items}
          userLikes={this.props.userLikes}
        />
      </div>
    )
  }
}

MyPostsContainer.propTypes = {
  items: React.PropTypes.array,
  userLikes: React.PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    items: state.feed.visibleItems,
    userLikes: state.profile.info.likes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: (userLikes) => {
      getItems(userLikes, dispatch);
    },
    clearItems: () => {
      clearItems(dispatch);
    }
  }
};

MyPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPostsContainer);

export default MyPostsContainer;