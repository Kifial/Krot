import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getSourceAvatar } from '../../actions/api';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class MainInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile-info">
        <div className="profile-info__head">
          <div className="profile-info__name-box">
            <div className="profile-info__name">{this.props.name}</div>
            <div className="profile-info__edit-box">
              <Link
                to="/profile/edit"
                className="profile-info__edit-button"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="profile-info__avatar-box">
            <div className="profile-info__avatar" onClick={this.props.openAvatarPopup}>
              <img src={this.props.bigAvatar} alt={this.props.name} />
            </div>
          </div>
        </div>
        <div className="profile-info__email">Email: {this.props.email}</div>
      </div>
    )
  }
}

MainInfo.propTypes = {
  name: React.PropTypes.string,
  avatar: React.PropTypes.string,
  email: React.PropTypes.string,
  bigAvatar: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    name: state.profile.info.name,
    email: state.profile.info.email,
    avatar: state.profile.info.avatar,
    bigAvatar: state.profile.info.bigAvatar
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openAvatarPopup: () => {
      getSourceAvatar(dispatch);
    }
  }
};

MainInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainInfo);

export default MainInfo;