import React from 'react';
import { connect } from 'react-redux';
import PostsList from '../../components/PostsList/index.jsx';
import { clearItems } from '../../actions/posts';
import { getFavouriteItems } from '../../actions/api';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class FavouritesContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getItems();
  }
  componentWillUnmount() {
    this.props.clearItems();
  }
  render() {
    return (
      <div className="favourites">
        <PostsList
          items={this.props.items}
          userLikes={this.props.userLikes}
        />
      </div>
    )
  }
}

FavouritesContainer.propTypes = {
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
      getFavouriteItems(dispatch);
    },
    clearItems: () => {
      clearItems(dispatch);
    }
  }
};

FavouritesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouritesContainer);

export default FavouritesContainer;