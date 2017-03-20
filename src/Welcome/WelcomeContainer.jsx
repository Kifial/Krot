import React from 'react';
import { Link } from 'react-router';

if (typeof window !== 'undefined' && window.document) require('./welcome.scss');

class WelcomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="welcome">
        <div className="welcome__title">Greetings, you need authorize to use app</div>
        <div className="welcome__sub-title">If you don't have an account, register now</div>
        <div className="welcome__button-box">
          <Link to="/register" className="welcome__button">Sign up</Link>
        </div>
      </div>
    )
  }
}

export default WelcomeContainer;