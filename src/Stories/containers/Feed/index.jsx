import React from 'react';
import { connect } from 'react-redux';
import FeedPostsList from '../../components/PostsList/index.jsx';
import { getFeedItems } from '../../actions/api';
import { clearItems } from '../../actions/posts';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class FeedContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getItems()
  }
  componentWillUnmount() {
    this.props.clearItems();
  }
  render() {
    return (
      <div className="feed">
        <FeedPostsList
          items={this.props.items}
          userLikes={this.props.userLikes}
        />
      </div>
    )
  }
}

FeedContainer.propTypes = {
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
    getItems: () => {
      getFeedItems(dispatch);
    },
    clearItems: () => {
      clearItems(dispatch);
    }
  }
};

FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);

export default FeedContainer;