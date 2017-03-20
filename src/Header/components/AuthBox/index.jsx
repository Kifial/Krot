import React from 'react';
import { Link } from 'react-router';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

const AuthBox = (props) => {
  return (
    <div className="header-auth-box">
      <Link to="/login" className="header-auth-box__item">Sign in</Link>
      <div className="header-auth-box__divider">/</div>
      <Link to="/register" className="header-auth-box__item">Sign up</Link>
    </div>
  )
};

export default AuthBox;