import React from 'react';
import { Link } from 'react-router';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

const Logo = () => {
  return (
    <div className="header-logo">
      <Link to="/feed" className="header-logo__logo">krot</Link>
    </div>
  )
};

export default Logo;