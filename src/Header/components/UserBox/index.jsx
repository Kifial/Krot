import React from 'react';
import { Link } from 'react-router'

if (typeof window !== 'undefined' && window.document) require('./index.scss');

const UserBox = (props) => {
  return (
    <div className="header-user-box">
      <Link to="/write" className="header-user-box__write-box">
        <div className="header-user-box__write">Write a story</div>
      </Link>
      <div className="header-user-box__user-box" onClick={props.triggerPopup}>
        <div className="header-user-box__avatar-box">
          <div className="header-user-box__avatar">
            <img src={props.avatar} alt="avatar"/>
          </div>
        </div>
        <div className="header-user-box__user">{props.name}</div>
      </div>
      <div className={
        'header-user-box__popup ' + (props.hidden ? 'header-user-box__popup--hidden' : '')
      }>
        <div className="header-user-box__popup-layout" onClick={props.triggerPopup}></div>
        <div className={
          'header-user-box__popup-box ' + (props.hidden ? 'header-user-box__popup-box--hidden' : '')
        }>
          <Link
            to="/my"
            className="header-user-box__popup-item"
            onClick={props.triggerPopup}
          >
            My stories
          </Link>
          <Link
            to="/favourites"
            className="header-user-box__popup-item"
            onClick={props.triggerPopup}
          >
            Favourites
          </Link>
          <div className="header-user-box__popup-divider"></div>
          <Link
            to="/profile"
            className="header-user-box__popup-item"
            onClick={props.triggerPopup}
          >
            Profile
          </Link>
          <div className="header-user-box__popup-divider"></div>
          <div
            className="header-user-box__popup-item"
            onClick={() => {
              props.logOut();
              props.triggerPopup();
            }}
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  )
};

UserBox.propTypes = {
  triggerPopup: React.PropTypes.func,
  name: React.PropTypes.string,
  avatar: React.PropTypes.string,
  hidden: React.PropTypes.bool,
  logOut: React.PropTypes.func
};

export default UserBox;