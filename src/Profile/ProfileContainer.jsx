import React from 'react';
import { connect } from 'react-redux';
import { getInfo } from './actions/api';
import AvatarPopup from './components/SourceAvatarPopup/index.jsx';

if (typeof window !== 'undefined' && window.document) require('./profile.scss');

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getInfo();
  }
  render() {
    return (
      <div className="profile">
        {this.props.children}
        {this.props.avatarPopupHidden ?
        '' :
        <AvatarPopup
          image={this.props.avatarPopupImage}
          title={this.props.avatarPopupTitle}
          close={this.props.closeAvatarPopup}
        />}
      </div>
    )
  }
}

ProfileContainer.propTypes = {
  avatarPopupHidden: React.PropTypes.bool,
  avatarPopupImage: React.PropTypes.string,
  avatarPopupTitle: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    avatarPopupHidden: state.profile.avatarPopup.hidden,
    avatarPopupImage: state.profile.avatarPopup.image,
    avatarPopupTitle: state.profile.avatarPopup.title
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfo: () => {
      getInfo(dispatch);
    },
    closeAvatarPopup: () => {
      dispatch({
        type: 'HIDE_AVATAR_POPUP'
      });
      dispatch({
        type: 'CLEAR_AVATAR_POPUP'
      });
    }
  }
};

ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

export default ProfileContainer;