import React from 'react';
import { connect } from 'react-redux';
import Logo from './components/Logo/index.jsx';
import AuthBox from './components/AuthBox/index.jsx';
import UserBox from './components/UserBox/index.jsx';
import { getUserInfo } from './actions/api';
import { logOut } from './actions/user';

if (typeof window !== 'undefined' && window.document) require('./header.scss');

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUserInfo();
  }
  render() {
    const authorized = () =>
      <UserBox
        name={this.props.name}
        hidden={this.props.userPopup.hidden}
        triggerPopup={this.props.triggerUserPopup}
        logOut={this.props.logOut}
        avatar={this.props.avatar}
      />;
    const notAuthorized = () => <AuthBox />;
    return (
      <header className="header">
        <div className="header__wrapper">
          <Logo />
          {this.props.name ? authorized() : notAuthorized()}
        </div>
      </header>
    )
  }
}

HeaderContainer.propTypes = {
  name: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    name: state.profile.info.name,
    avatar: state.profile.info.avatar,
    userPopup: {
      hidden: state.popups.userBoxPopup.hidden
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      getUserInfo(dispatch);
    },
    logOut: () => {
      logOut(dispatch);
    },
    triggerUserPopup: () => {
      dispatch({
        type: 'TRIGGER_USER_BOX_POPUP'
      });
    }
  }
};

HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);

export default HeaderContainer;