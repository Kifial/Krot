import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/api';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    // need to do validation
    this.props.handleSubmit(
      this.props.login,
      this.props.pass
    );
  }
  render() {
    return (
      <div className="login">
        <div className="login__title">Sign in</div>
        <div className="login__input-box">
          <label htmlFor="login" className="login__label">Login</label>
          <input
            type="text"
            className="login__input"
            name="login"
            value={this.props.login}
            onChange={this.props.handleInput}
          />
        </div>
        <div className="login__input-box">
          <label htmlFor="pass" className="login__label">Password</label>
          <input
            type="password"
            className="login__input"
            name="pass"
            value={this.props.pass}
            onChange={this.props.handleInput}
          />
        </div>
        <div className="login__submit-box">
          {this.props.requesting ?
            <div className="login__loading">
              <img src="/assets/loading.gif" alt="loading"/>
            </div> :
            <div className="login__submit" onClick={this.handleSubmit}>Submit</div>
          }
        </div>
      </div>
    )
  }
}

LoginContainer.propTypes = {
  login: React.PropTypes.string,
  pass: React.PropTypes.string,
  requesting: React.PropTypes.bool
};

const mapStateToProps = (state) => {
  const form = state.forms.login;
  return {
    login: form.login,
    pass: form.pass,
    requesting: form.requesting
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInput: (e) => {
      dispatch({
        type: 'HANDLE_LOGIN_INPUT',
        name: e.target.name,
        value: e.target.value
      })
    },
    handleSubmit: (login, pass) => {
      dispatch({
        type: 'HANDLE_LOGIN_REQUEST'
      });
      loginUser(login, pass, dispatch);
    }
  }
};

LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

export default LoginContainer;